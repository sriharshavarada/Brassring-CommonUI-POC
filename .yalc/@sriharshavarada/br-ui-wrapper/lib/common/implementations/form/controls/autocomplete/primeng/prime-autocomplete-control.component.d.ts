import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PrimeAutocompleteInput } from '../../../../../adapters/autocomplete.adapter';
import { BrOption } from '../../../../../models/controls-config.model';
import * as i0 from "@angular/core";
export declare class PrimeAutocompleteControlComponent implements OnChanges {
    config: PrimeAutocompleteInput;
    valueChange: EventEmitter<any>;
    filteredOptions: BrOption[];
    selectedItem: any;
    ngOnChanges(changes: SimpleChanges): void;
    filter(event: any): void;
    onModelChange(event: any): void;
    onClear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeAutocompleteControlComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimeAutocompleteControlComponent, "br-prime-autocomplete-control", never, { "config": { "alias": "config"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
