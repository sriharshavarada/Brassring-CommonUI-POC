import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

export type CodeLanguage = 'typescript' | 'html' | 'scss';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements AfterViewInit {
  @Input() value = '';
  @Input() language: CodeLanguage = 'typescript';
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('inputArea') inputArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('highlightArea') highlightArea!: ElementRef<HTMLElement>;
  @ViewChild('lineArea') lineArea!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.syncScroll();
  }

  get lineNumbers(): number[] {
    const count = Math.max(1, this.value.split('\n').length);
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  get highlightedCode(): string {
    const escaped = this.escapeHtml(this.value || '');

    if (this.language === 'html') {
      return this.highlightHtml(escaped);
    }

    if (this.language === 'scss') {
      return this.highlightScss(escaped);
    }

    return this.highlightTs(escaped);
  }

  onInput(value: string): void {
    this.valueChange.emit(value);
  }

  onScroll(): void {
    this.syncScroll();
  }

  private syncScroll(): void {
    if (!this.inputArea || !this.highlightArea || !this.lineArea) return;
    const top = this.inputArea.nativeElement.scrollTop;
    const left = this.inputArea.nativeElement.scrollLeft;
    this.highlightArea.nativeElement.scrollTop = top;
    this.highlightArea.nativeElement.scrollLeft = left;
    this.lineArea.nativeElement.scrollTop = top;
  }

  private highlightTs(input: string): string {
    const bag: string[] = [];
    const stash = (value: string): string => {
      const id = bag.push(value) - 1;
      return `@@TOK_${id}@@`;
    };

    let out = input;
    out = out.replace(/(\/\/.*)$/gm, (m) => stash(`<span class="tok-comment">${m}</span>`));
    out = out.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, (m) => stash(`<span class="tok-string">${m}</span>`));
    out = out.replace(/\b(import|export|class|const|let|var|if|else|return|private|public|type|interface|new|from|extends|implements|readonly|as)\b/g, '<span class="tok-keyword">$1</span>');
    out = out.replace(/\b(true|false|null|undefined)\b/g, '<span class="tok-literal">$1</span>');
    out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');

    return out.replace(/@@TOK_(\d+)@@/g, (_m, idx) => bag[Number(idx)]);
  }

  private highlightHtml(input: string): string {
    // Highlight escaped HTML tags in one pass so we never tokenize
    // the injected <span class="tok-..."> markup itself.
    return input.replace(/&lt;(\/?)([a-zA-Z0-9-]+)([\s\S]*?)&gt;/g, (_match, slash, tag, rawAttrs) => {
      let attrs = String(rawAttrs || '');

      attrs = attrs.replace(
        /([:@\[\]\(\)a-zA-Z0-9-]+)(\s*=\s*)("[^"]*"|'[^']*')/g,
        '<span class="tok-attr">$1</span>$2<span class="tok-string">$3</span>'
      );

      return `&lt;${slash}<span class="tok-tag">${tag}</span>${attrs}&gt;`;
    });
  }

  private highlightScss(input: string): string {
    const bag: string[] = [];
    const stash = (value: string): string => {
      const id = bag.push(value) - 1;
      return `@@TOK_${id}@@`;
    };

    let out = input;
    out = out.replace(/(\/\/.*)$/gm, (m) => stash(`<span class="tok-comment">${m}</span>`));
    out = out.replace(/('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, (m) => stash(`<span class="tok-string">${m}</span>`));
    out = out.replace(/#(?:[0-9a-fA-F]{3,8})\b/g, (m) => stash(`<span class="tok-number">${m}</span>`));
    out = out.replace(/(^|[\s,{])([.#][a-zA-Z_][\w-]*)/gm, '$1<span class="tok-selector">$2</span>');
    out = out.replace(/\b(display|position|padding|margin|border|background|color|font-size|font-family|width|height|min-height|max-height|grid-template-columns|gap|align-items|justify-content|overflow|border-radius)\b/g, '<span class="tok-prop">$1</span>');
    out = out.replace(/\b(\d+(?:\.\d+)?(?:px|rem|em|%)?)\b/g, '<span class="tok-number">$1</span>');

    return out.replace(/@@TOK_(\d+)@@/g, (_m, idx) => bag[Number(idx)]);
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
