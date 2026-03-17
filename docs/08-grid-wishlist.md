# Grid Wishlist

This document captures the grid capabilities we want the library to support over time. It is intentionally broader than the features that are already implemented. The goal is to keep future grid work aligned to one product-level vision.

## Purpose

The grid should support:
- real implementation engines per variant (`CUSTOM`, `MATERIAL`, `CANVAS`, `PRIMENG`)
- a common shell experience around those engines
- local and remote data modes
- rich cell rendering and actions
- strong branding support
- future accessibility support

## Already In Progress

The following are already started or partially implemented:
- shared shell and per-variant engine split
- branding support across shell/engines
- native paginator path for `MATERIAL` and `PRIMENG`
- rich cell contract (`text`, `link`, `badge`, `icon`, `button`, `button-group`, `dropdown`, `dropdown-action`, `route-link`, `custom-template`)
- grid template override support (`brGridCell`)
- remote query/result contract scaffolding
- loading / empty / error state support
- sticky header support
- `maxHeight` support for constrained grid height with internal scrolling
- working frozen leading columns + horizontal scroll flow in local validation builds
- Columns panel pin/unpin support with `Frozen` state in shared shell
- header drag-resize behavior for column width adjustment in the live grid

## Core Wishlist

### 1. Fixed Header / Internal Scroll
The grid should support:
- sticky first row/header
- body scroll inside the grid instead of increasing total page height
- `maxHeight` and later `height`
- header must stay visually stable during loading and scrolling

### 2. Local and Remote Data Modes
The grid should support:
- `local` mode
- `remote` mode

In `remote` mode the grid should emit normalized query intent and let the consumer call the backend.

Remote query intent should cover:
- pagination
- page size changes
- sorting
- global search
- filtering
- later lazy loading / infinite loading

### 3. Remote Result States
The grid should support:
- loading state
- empty state
- error state
- optional retry path later

Loading should be presented as a proper skeleton table, not only a banner or spinner.

### 4. Rich Cell Types
The grid should support built-in rich cell rendering for:
- plain text
- link
- badge
- icon
- button
- button group
- dropdown
- dropdown with submit/update action
- route link
- custom template

Default behavior should remain simple:
- plain text columns should not require `type`
- rich config should only be needed for richer cells

### 5. Consumer Template Overrides
The grid should allow targeted consumer overrides at the cell level only.

Example:
- override one field like `hrStatus`
- do not allow full row override by default
- do not allow full shell override by default

This should remain the escape hatch, not the default path.

### 6. Row and Cell Feedback
The grid should support consumer-provided UI state for inline actions.

Examples:
- saving
- success
- error
- helper message per row/cell

This should be modeled through grid meta state, not mixed into the business row data.

### 7. Grid Actions Stay Consumer-Owned
All business actions should remain on the consumer side.

Examples:
- edit user
- reset password
- activate/deactivate selected rows
- update HR status
- routing from a clickable cell

The grid should emit normalized action events. The consumer should decide what logic to run and what result to push back into the grid.

### 8. Context Menu
The grid should support:
- row context menu on right click
- row menu button
- normalized context menu action events
- later native engine-specific menu integration where useful

### 9. Column Settings and Layout
The grid should support:
- show/hide columns
- reorder columns
- later persist column layout
- settings icon / personalization flow

Later wishlist:
- frozen columns
- column resize
- column reorder drag-drop if needed

### 10. Frozen Columns and Horizontal Scroll
This is now implemented in local validation mode and should remain a supported product rule.

Current delivered behavior:
- freezing some leading columns with `frozen: true`
- horizontal scrolling for the rest inside the grid body region
- pin/unpin support from the Columns panel
- header drag-resize support for column width adjustment
- correct validated behavior across `CUSTOM`, `MATERIAL`, `PRIMENG`, and `CANVAS`

Still worth future polish:
- right-side frozen columns if product needs them later
- persistence of frozen layout choices
- saved column width personalization if product wants persistence later
- tighter engine-native polish where an implementation can do even better
### 11. Sorting and Filtering
The grid should support:
- local sort/filter
- remote sort/filter
- clear distinction between shell-owned vs engine-owned behavior

Important rule:
- once pagination is remote, sort/search/filter will usually need to be remote too for consistency

### 12. Search
The grid should support:
- global search input in shell
- local search mode
- remote search mode
- query-change emission for remote mode

### 13. Inline Editing and Composite Actions
The grid should support:
- dropdown inside cell
- dropdown + button inside cell
- action icon cells
- status transition cells
- future richer inline editing patterns

### 14. Expandable / Hierarchical Rows
This is now implemented in local validation mode as a tree-structure grid flow.

Current delivered behavior:
- hierarchical rows configured through `config.tree`
- expand/collapse icons rendered in the configured tree column
- indentation per tree level
- shared wrapper/controller flow across `CUSTOM`, `MATERIAL`, `CANVAS`, and `PRIMENG`
- `row-expand` / `row-collapse` action events emitted from the grid

Still worth future polish:
- expand-all / collapse-all shell actions
- remote tree-data contract examples
- tree-aware filtering/sorting rules for deeper server-side scenarios

This should continue to be treated as a grid capability, not a separate control, unless the contract becomes fundamentally different later.

### 15. Accessibility
Future requirement across the entire library, including grids:
- keyboard navigation
- table semantics
- row/cell focus behavior
- context menu accessibility
- inline action accessibility
- loading / error / empty states that make sense for assistive technology

### 16. Branding and Light/Dark Mode
The grid should consistently respect:
- runtime branding
- light mode
- dark mode
- native engine styling mapped from library tokens

This includes:
- shell surfaces
- headers
- row states
- paginator area
- context menu surfaces
- loading skeletons

## Product-Level Rules

The following rules should stay true as the grid evolves:
- the public grid API should stay framework-neutral
- business logic should stay in the consumer
- engines should be real implementations, not only visual skins
- shell should provide a consistent product experience around all engines
- config should stay simple for plain text columns
- richer behavior should be opt-in

## Near-Term Priorities

Recommended next execution order:
1. server-side pagination, sorting, and search as one working vertical slice
2. row/cell meta-state feedback for inline actions
3. remote filtering
4. deeper native engine integration where needed
5. accessibility pass
6. later polish such as right-frozen columns and persisted layout state
## Notes

Not everything in this document is implemented today. This is the target wishlist and planning reference for future grid work.



