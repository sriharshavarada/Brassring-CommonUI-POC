# Grid Architecture Plan

This document defines the target design for `br-grid`.

The current grid implementation is not yet aligned with the intended architecture:
- `CUSTOM` and `CANVAS` rely heavily on a shared shell experience.
- `MATERIAL` is currently closer to a Material-styled shell variant than a true Angular Material grid engine.
- `PRIMENG` is currently closer to a real PrimeNG table engine, but it does not yet have shell-level feature parity.

The target is different:
- one stable wrapper contract
- one shared grid shell experience
- real implementation engines underneath
- branding and light/dark mode applied consistently across all implementations

## Current Phase 1 Progress

Draft contract scaffolding has now been added in the library model file:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/grid-config.model.ts`

The following draft types now exist and are intended as the starting point for the redesign:
- `BrGridCellType`
- `BrGridCellConfig`
- `BrGridCellActionConfig`
- `BrGridCellOption`
- `BrGridQueryState`
- `BrGridDataResult`
- `BrGridColumnLayoutState`
- expanded `BrGridColumn`
- expanded `BrGridActionEvent`
- expanded `BrGridConfig`

These additions are backward-compatible scaffolding only. They are not yet fully implemented across engines.

## Goals

The grid must support:
- real implementation engines:
  - custom
  - canvas
  - material
  - primeng
- one consistent wrapper contract for consumers
- one consistent shell experience:
  - header
  - toolbar
  - search
  - primary actions
  - settings icon / column chooser
  - pagination framing
  - context menu orchestration
- branding support
- light/dark mode support
- future remote-data support
- future rich cell action/render support
- future frozen columns and horizontal scroll

## Design Principles

### 1. Wrapper contract stays stable

Consumers should continue to use:
- `BrGridConfig`
- `BrGridActionEvent`
- `br-grid`

Consumers should not need to know whether the implementation is Material, PrimeNG, custom, or canvas.

### 2. Shell and engine are different things

This is the main correction to the current design.

- `Grid Shell`
  - owns the product-level experience
  - implementation-independent
- `Grid Engine`
  - owns the actual grid library rendering and mechanics
  - implementation-specific

The shell is not the engine.
The engine is hosted inside the shell.

### 3. Branding and color mode are runtime-level inputs

Grid must consume the same runtime branding system already used by controls:
- normalized branding config
- `BrandingRuntimeService`
- `light` / `dark` mode

The shell should consume shared branding tokens directly.
The engine should derive any implementation-specific hover/selected/filter/menu states from those tokens.

Do not add implementation-specific branding keys unless existing tokens are truly insufficient.

### 4. Prefer derived implementation mapping over growing public config

If PrimeNG or Material needs an extra visual state:
- derive it from existing branding tokens first
- only add a new public branding token if there is no clean mapping

Examples:
- row hover color can be derived from `focusColor` + `sectionBackgroundColor`
- selected row color can be derived from `accentColor` + `sectionBackgroundColor`
- context menu hover can be derived from `focusColor` + `backgroundColor`

### 5. Remote data stays consumer-owned

The grid should not call APIs directly.

Grid should:
- emit normalized query changes
- accept loading/data/total state

Consumer should:
- call API
- map server result back into grid inputs

## Target Architecture

```text
br-grid wrapper
  -> runtime mode decides engine
  -> render shared grid shell
  -> shell hosts chosen engine
  -> engine emits normalized grid events
  -> wrapper emits BrGridActionEvent
```

### Recommended structure

```text
common/implementations/grid/
  shell/
    grid-shell.component.*
  engines/
    material/
      material-grid-engine.component.*
    primeng/
      primeng-grid-engine.component.*
    custom/
      custom-grid-engine.component.*
    canvas/
      canvas-grid-engine.component.*
  material/
    material-grid.component.*
  primeng/
    primeng-grid.component.*
  custom/
    custom-grid.component.*
  canvas/
    canvas-grid.component.*
```

The `*-grid.component.*` files compose:
- the shell
- the chosen engine

The engine files are where the real grid-library implementation lives.

## Responsibilities

## Shell responsibilities

The shell should own:
- title
- subtitle / badge
- top toolbar
- search input
- left action cluster
- right action cluster
- primary action button / dropdown
- settings icon
- column chooser / reorder trigger
- context menu orchestration trigger points
- pagination framing and summary placement
- empty state framing
- shell-level branding
- shell-level light/dark response

The shell should not own:
- library-specific row rendering internals
- library-specific sort directives
- library-specific filter directives

## Engine responsibilities

Each engine should own:
- row rendering
- cell rendering
- sort mechanics
- filter mechanics
- selection mechanics
- frozen columns
- horizontal scroll
- virtualization/lazy rendering if supported
- library-native context menu rendering if needed
- overlay details owned by the underlying implementation

## Public contract areas to define

## 1. Grid config

`BrGridConfig` should eventually cover:
- identity / title / subtitle
- columns
- rows
- toolbar options
- actions
- pagination options
- selection options
- context menu options
- settings icon / column layout options
- local vs remote data mode
- loading / empty / error state

## 2. Column config

`BrGridColumnConfig` should support:
- `field`
- `header`
- `type`
- `sortable`
- `filterable`
- `width`
- `align`
- `hidden`
- `frozen`
- formatting metadata
- action metadata
- route metadata
- inline editor metadata

### Likely cell types

- `text`
- `link`
- `icon`
- `button`
- `button-group`
- `dropdown`
- `dropdown-action`
- `badge`
- `route-link`
- `custom-template`

## 3. Query state

Define a normalized query model for future remote mode.

Recommended concept:
- `BrGridQueryState`

Should include:
- page index
- page size
- sort field
- sort direction
- filters
- search text

## 4. Data result

Recommended concept:
- `BrGridDataResult`

Should include:
- rows
- total count
- loading
- optional error / empty-state information

## 5. Action event model

`BrGridActionEvent` should be expanded or normalized to support:
- toolbar action
- row action
- cell action
- context menu action
- navigation intent
- inline editor change
- inline submit
- query changed
- column layout changed

## Rich cell behavior model

The grid must support actionable cells, not only plain text.

Examples required by product direction:
- dropdown inside cell
- dropdown + update button in same cell
- delete icon
- pushpin icon
- hyperlink cell
- count link that navigates to another routed view
- route-link style cells

These must be modeled in config and emitted as normalized events.

They should not be implemented as arbitrary inline HTML strings.

## Column settings / settings icon

The settings icon belongs to shell behavior.

It should support:
- show/hide columns
- reorder columns
- reset to default layout
- optionally persist layout later

This requires layout state in the grid system.

Recommended concept:
- `BrGridColumnLayoutState`

Should track:
- visible columns
- ordered columns
- frozen columns
- later: widths if resizing is added

## Frozen columns and horizontal scroll

These are expected future features and must be considered now.

Frozen columns affect:
- engine implementation choice
- column layout state
- horizontal scroll strategy
- header/body sync

This should be supported by design even if implementation comes later.

## Branding and light/dark mode

Grid must respond to:
- runtime branding
- runtime light/dark mode

### Shell-owned surfaces

The shell should consume tokens such as:
- `backgroundColor`
- `sectionBackgroundColor`
- `sectionBorderColor`
- `baseFontColor`
- `labelFontColor`
- `badgeBackgroundColor`
- `badgeTextColor`
- `primaryButtonColor`
- `secondaryButtonColor`
- `overlayColor`
- `shadowColor`

### Engine-owned surfaces

The engine should derive surfaces such as:
- row hover
- selected row
- focused row/cell
- menu hover
- paginator active state
- filter popup states

from existing normalized branding tokens where possible.

## Local mode vs remote mode

The target design must support both.

### Local mode

Grid receives:
- all rows
- optional local sorting/filtering/paging handled by engine

### Remote mode

Grid emits:
- query changes

Consumer performs:
- API call

Grid receives back:
- rows
- total count
- loading state

This keeps business/data logic outside the library.

## Implementation phases

## Phase 1. Contract design

Produce and review:
- `BrGridConfig` target shape
- `BrGridColumnConfig`
- `BrGridQueryState`
- `BrGridDataResult`
- `BrGridActionEvent` target shape
- `BrGridColumnLayoutState`

No major UI rewrite should happen before this is stable.

## Phase 2. Shell/engine split

Refactor current grid internals so:
- shell is explicit
- engines are explicit
- current custom/canvas/material/primeng paths all compose shell + engine cleanly

## Phase 3. Feature-parity minimum

Bring all engines to a minimum shared feature set:
- sorting
- filtering
- pagination
- row selection
- search
- toolbar
- settings icon
- context menu
- frozen columns
- horizontal scroll

## Phase 4. Rich cell renderers

Add:
- link cells
- icon action cells
- button cells
- dropdown cells
- dropdown + button composite cells
- route-link cells

## Phase 5. Remote-data mode

Add:
- server-side paging
- server-side sorting
- server-side filtering
- loading state
- lazy loading hooks

## Phase 6. Advanced polish

Potential later features:
- row grouping
- expandable rows
- virtualization
- column resize
- column persistence
- drag reorder UI

## Recommended implementation order

1. design contract doc updates
2. shell vs engine split
3. PrimeNG engine proof
4. Material engine proof
5. custom/canvas alignment
6. rich cell renderers
7. remote mode
8. frozen columns and advanced layout polish

## Why PrimeNG and Material first

They are the clearest proof that the wrapper is truly abstracting real implementation engines.

If those two work with:
- shell parity
- branding
- light/dark mode
- normalized events

then the architecture is sound.

## Current truth

As of now:
- custom/canvas are closer to shell-rich behavior
- material grid is not yet a true Angular Material engine
- primeng grid is closer to a real engine but still lacks full shell parity

That is why the next grid work should be architectural, not just cosmetic.


## Formalized Contract Additions

The library model now formalizes the next contract layer in:
- `/Users/sriharshavinfinite.com/Desktop/br-ui-wrapper/projects/br-ui-wrapper/src/lib/common/models/grid-config.model.ts`

### Cell rendering contract

Cell rendering remains column-driven through:
- `BrGridCellType`
- `BrGridCellConfig`
- `BrGridCellActionConfig`
- `BrGridCellOption`

Current cell types are:
- `text`
- `link`
- `badge`
- `icon`
- `button`
- `button-group`
- `dropdown`
- `dropdown-action`
- `route-link`
- `custom-template`

`BrGridCellConfig` is where inline-editor and inline-action metadata belongs, including:
- route metadata
- option lists
- action lists
- submit action id
- display/value field mapping
- template id hooks

### Query contract

Remote/local query state is formalized through:
- `BrGridQueryState`
- `BrGridDataResult`

`BrGridQueryState` owns:
- `pageIndex`
- `pageSize`
- `sort`
- `filters`
- `searchText`

`BrGridDataResult` owns:
- `rows`
- `totalCount`
- `loading`
- `errorMessage`
- optional `query`

### Column layout contract

User-managed column layout is formalized through:
- `BrGridColumnLayoutState`

It currently owns:
- `orderedFields`
- `visibleFields`
- `frozenFields`
- `widths`

This is the correct place for settings-icon driven column layout persistence.

### Action event contract

The grid emits one normalized action contract:
- `BrGridActionEvent`

The important design rule is:
- config declares action ids and metadata
- consumer owns business logic
- grid emits intent only

Notable payload areas now include:
- `source`
- `actionId`
- `row`
- `rowId`
- `field`
- `value`
- `previousValue`
- `selectedRows`
- `selectedRowIds`
- `query`
- `columnLayout`
- `meta`

This supports:
- context menu actions
- selection actions
- inline cell actions
- page/sort/filter/query changes
- future row expand/collapse events

### Meta-state contract

Inline feedback and consumer-driven UI state are formalized through:
- `BrGridCellMeta`
- `BrGridRowMeta`
- `BrGridRowMetaMap`

This is the contract that allows the consumer to communicate UI feedback back into the grid after async work such as:
- inline status update
- save success
- save failure
- row/cell disabling
- transient success/error message state

Current supported meta fields include:
- `state`
- `message`
- `icon`
- `tone`
- `disabled`
- `readonly`

Important rule:
- meta state is not arbitrary consumer JSON if the library must interpret it
- it must remain a formal contract so engines can render consistent visual feedback

### Recommended consumer pattern

Consumer should continue to use one grid event handler boundary, for example:
- `onGridAction(event: BrGridActionEvent)`

The consumer should:
1. inspect `event.actionId` and `event.source`
2. call API/service/router logic
3. update grid data and/or row meta
4. let the grid re-render from updated inputs

The grid should not own business logic and should not require function references inside JSON config.
