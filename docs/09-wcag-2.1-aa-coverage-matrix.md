# WCAG 2.1 A/AA Coverage Matrix

## Purpose

This document tracks WCAG 2.1 Level A and AA coverage for the BR UI library and consumer app.

It is intended to answer a practical question:

- what is owned by the component library
- what is owned by the consuming application
- what is implemented today
- what is only partially addressed
- what still needs verification or work

Status values used here:

- `Implemented`: intended support exists and is reasonably present in current code
- `Partial`: some support exists, but not enough to claim reliable coverage
- `Needs verification`: implementation may exist, but has not been validated well enough
- `Not started`: no meaningful support work identified yet
- `App-owned`: the criterion is primarily a consuming-app/content responsibility
- `N/A`: not applicable for the current library scope

## Scope

Library surfaces in scope:

- grid
- modal
- accordion
- button
- text / textarea
- date
- single-select / multi-select
- checkbox / radio
- autocomplete

Important note:

- This matrix is not a compliance certification.
- It is an engineering tracking document.
- Full WCAG conformance requires real app validation, content review, screen reader testing, keyboard testing, responsive testing, and color contrast verification.

## Summary

Current realistic position:

- The library has active accessibility work in progress.
- Grid, modal, button, and several control wrappers have meaningful accessibility support work already applied.
- We cannot currently claim full WCAG 2.1 A/AA compliance across all controls and all consuming screens.
- Several criteria are fundamentally app/content/process owned, not library owned.
- Date-picker support is currently mixed by variant:
  - `CUSTOM`: improved and locally workable
  - `MATERIAL`: improved and locally workable
  - `PRIMENG`: still not reliable enough for keyboard accessibility signoff

## Matrix

| SC | Success Criterion | Primary Ownership | Current Status | Notes |
| --- | --- | --- | --- | --- |
| 1.1.1 | Non-text Content | Shared | Partial | Library supports many ARIA labels and accessible names, but non-text alternatives for all icons, graphics, and consumer-provided custom templates are not fully verified. |
| 1.2.1 | Audio-only and Video-only (Prerecorded) | App-owned | App-owned | Not generally applicable to the current component library unless consumers embed media. |
| 1.2.2 | Captions (Prerecorded) | App-owned | App-owned | Consumer media/content responsibility. |
| 1.2.3 | Audio Description or Media Alternative | App-owned | App-owned | Consumer media/content responsibility. |
| 1.3.1 | Info and Relationships | Shared | Partial | Semantic structure improved in grid menus/dialogs and form labels, but full validation across all controls and custom templates is still pending. |
| 1.3.2 | Meaningful Sequence | Shared | Partial | Keyboard/focus order work exists in grid/modal flows, but full sequence validation across all screens is not complete. |
| 1.3.3 | Sensory Characteristics | App-owned | Needs verification | Mostly content/instruction wording responsibility in forms and app screens. |
| 1.4.1 | Use of Color | Shared | Needs verification | UI states should not rely on color only, but this has not been systematically audited across all variants/themes. |
| 1.4.2 | Audio Control | App-owned | App-owned | Only relevant if the consumer app includes auto-playing audio. |
| 2.1.1 | Keyboard | Shared | Partial | Major work started for grid menus/dialogs, modal focus behavior, and date-picker variants. Custom/material date are in a better state locally, but PrimeNG date keyboard navigation is still a known gap. |
| 2.1.2 | No Keyboard Trap | Shared | Partial | Focus trap behavior exists in dialogs/menus and parts of date behavior, but needs final end-to-end verification in real runtime paths. |
| 2.1.4 | Character Key Shortcuts | App-owned | Needs verification | No intentional character shortcuts are part of the library contract today; app-level review still needed. |
| 2.2.1 | Timing Adjustable | App-owned | App-owned | Timing/session behavior belongs to app workflows. |
| 2.2.2 | Pause, Stop, Hide | App-owned | App-owned | Depends on consumer content and motion/timer behavior. |
| 2.3.1 | Three Flashes or Below Threshold | Shared | Needs verification | No known flashing UI, but not formally audited. |
| 2.4.1 | Bypass Blocks | App-owned | Not started | Requires app-level skip links / page structure. |
| 2.4.2 | Page Titled | App-owned | Not started | App routing/page title responsibility. |
| 2.4.3 | Focus Order | Shared | Partial | Improved in grid/menu/modal areas and parts of date navigation, but still requires complete verification across controls and pages. PrimeNG date remains unstable here. |
| 2.4.4 | Link Purpose (In Context) | Shared | Needs verification | Applies where links are rendered by app content or custom templates; not fully audited. |
| 2.5.1 | Pointer Gestures | Shared | Needs verification | Library does not intentionally require complex gestures, but this is not formally verified across all variants. |
| 2.5.2 | Pointer Cancellation | Shared | Needs verification | Needs review for any pointer-down/pointer-up specific interactions; most controls are standard click/button today. |
| 2.5.3 | Label in Name | Shared | Partial | ARIA and visible label alignment improved, but not yet audited across every control type and custom template scenario. |
| 2.5.4 | Motion Actuation | App-owned | App-owned | Not a primary library pattern today; consumer app review still needed. |
| 3.1.1 | Language of Page | App-owned | Not started | App shell responsibility. |
| 3.2.1 | On Focus | Shared | Partial | Components should not trigger unexpected context changes on focus, but broad verification is still pending. |
| 3.2.2 | On Input | Shared | Partial | Form and filter/sort interactions need broader review to confirm predictable behavior across all wrappers. |
| 3.3.1 | Error Identification | Shared | Partial | Some form infrastructure exists, but consistent accessible error messaging is not fully standardized across all controls. |
| 3.3.2 | Labels or Instructions | Shared | Partial | Labels exist for many controls, but completeness and consistency across all wrappers still need audit. |
| 4.1.1 | Parsing | Shared | Needs verification | Modern Angular output is usually structurally safe, but full validation is not documented for every render path. |
| 4.1.2 | Name, Role, Value | Shared | Partial | Significant work exists for grid/menu/dialog/button semantics and ARIA threading, but this is not complete across every control and variant. Date behavior is still mixed by variant. |
| 1.2.4 | Captions (Live) | App-owned | App-owned | Consumer media/content responsibility. |
| 1.2.5 | Audio Description (Prerecorded) | App-owned | App-owned | Consumer media/content responsibility. |
| 1.4.3 | Contrast (Minimum) | Shared | Needs verification | Theme/token system exists, but contrast compliance has not been systematically measured across variants/states. |
| 1.4.4 | Resize Text | Shared | Needs verification | Some responsive/resizable behavior exists, but no documented validation pass yet. |
| 1.4.5 | Images of Text | Shared | Needs verification | No known intentional image-of-text dependence, but no formal audit yet. |
| 1.4.10 | Reflow | Shared | Partial | Some responsive behavior exists, but reflow validation at 320 CSS px is not fully documented. |
| 1.4.11 | Non-text Contrast | Shared | Needs verification | Focus indicators, borders, icons, and state affordances need contrast validation across themes. |
| 1.4.12 | Text Spacing | Shared | Needs verification | Not yet audited with text-spacing override scenarios. |
| 1.4.13 | Content on Hover or Focus | Shared | Partial | Menus/dialogs/tool surfaces need broader review for dismissibility and persistence behavior. |
| 2.4.5 | Multiple Ways | App-owned | Not started | App navigation and information architecture responsibility. |
| 2.4.6 | Headings and Labels | Shared | Partial | Many headings/labels exist, but consistency across all screens and generated examples needs review. |
| 2.4.7 | Focus Visible | Shared | Partial | Improved for grid popups, related controls, and some date popup states, but a full library-wide visible focus audit is still required. |
| 3.1.2 | Language of Parts | App-owned | Not started | Mostly consumer content responsibility. |
| 3.2.3 | Consistent Navigation | App-owned | Not started | App shell/navigation responsibility. |
| 3.2.4 | Consistent Identification | Shared | Partial | Naming and action patterns are improving, but consistency is not fully guaranteed across all variants. |
| 3.3.3 | Error Suggestion | Shared | Partial | Some form metadata patterns exist, but accessible and useful suggestion behavior is not complete across all controls. |
| 3.3.4 | Error Prevention (Legal/Financial/Data) | App-owned | App-owned | Depends on actual business workflows and consumer confirmation patterns. |

## By Component

### Grid

Current state:

- strongest active accessibility work so far
- keyboard/menu/dialog/focus work has been underway
- ARIA labels and trigger labels are being threaded through config
- still not ready to claim full WCAG 2.1 A/AA compliance without final verification

Main criteria most relevant to grid:

- `1.3.1`
- `1.3.2`
- `2.1.1`
- `2.1.2`
- `2.4.3`
- `2.4.7`
- `2.5.3`
- `4.1.2`
- `1.4.3`
- `1.4.11`
- `1.4.13`

Still required for grid signoff:

- complete keyboard verification across custom/material/canvas/primeng variants
- screen reader pass
- focus visibility pass
- contrast validation
- reflow/responsive validation
- regression test expansion

### Modal

Current state:

- dialog labeling and focus behavior work has started
- focus return and internal keyboard flow are partly addressed
- still needs full runtime verification in all variants

Main criteria:

- `1.3.1`
- `2.1.1`
- `2.1.2`
- `2.4.3`
- `2.4.7`
- `4.1.2`

### Form Controls

Included:

- text
- textarea
- date
- single-select
- multi-select
- checkbox
- radio
- autocomplete
- button

Current state:

- public accessibility contract is improving
- dynamic ARIA support exists in some areas and is being expanded
- consistent validation/error/help semantics are not yet fully standardized
- date support is not uniform by variant:
  - `CUSTOM`: improved popup focus and active-day behavior locally
  - `MATERIAL`: improved header/month sync locally
  - `PRIMENG`: still a known keyboard-navigation limitation and should not be treated as WCAG-ready yet

Main criteria:

- `1.3.1`
- `2.1.1`
- `2.4.6`
- `2.4.7`
- `3.3.1`
- `3.3.2`
- `3.3.3`
- `4.1.2`

### Accordion

Current state:

- accessibility improved
- still not fully exhausted or fully verified

Main criteria:

- `1.3.1`
- `2.1.1`
- `2.4.3`
- `2.4.7`
- `4.1.2`

## Recommended Next Steps

### 1. Split ownership clearly

For every criterion, decide:

- library-owned
- app-owned
- shared

This avoids over-claiming compliance from the library alone.

### 2. Create evidence columns

Add follow-up evidence per row:

- source file / implementation reference
- manual test evidence
- automated test evidence
- screen reader verification

### 3. Define component signoff checklists

For each component family:

- keyboard-only test
- focus visible test
- ARIA/name-role-value test
- contrast test
- resize/reflow test
- error/validation test where applicable

### 4. Move from “Partial” to “Verified”

Current bottleneck is not only implementation.
It is validation.

### 5. Prepare for WCAG 2.2 separately

Do not mix 2.1 and 2.2 status casually.
Finish a defensible 2.1 matrix first, then extend it with 2.2 deltas.

## Current Recommendation to Share

Recommended external statement right now:

- The library is being actively hardened toward WCAG 2.1 Level A/AA support.
- Several accessibility improvements are already in progress, especially for grid, dialog, labels, keyboard behavior, and ARIA semantics.
- Full coverage against all 47 WCAG 2.1 A/AA criteria is not yet verified across all library components and all consuming app screens.
- This matrix is the working baseline for completing that effort.
