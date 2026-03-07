# Brassring-CommonUI-POC

This repo is now the demo/docs/consumer app for the published package:

- `@sriharshavarada/br-ui-wrapper`

## Documentation

- Project handoff (start here):
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/00-project-handoff-so-far.md`
- High-level architecture:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/01-high-level-architecture.md`
- Runtime flow (browser URL to rendered controls):
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/02-runtime-flow-browser-to-control.md`
- Consumer integration guide:
  - `/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/docs/03-consumer-integration-guide.md`

## Package install

Consumer apps should install the library package, not copy source files:

```ini
# .npmrc
@sriharshavarada:registry=https://npm.pkg.github.com
```

```bash
npm login --registry=https://npm.pkg.github.com
npm install @sriharshavarada/br-ui-wrapper
```

## Local development workflow

Use these scripts when developing the library and demo app together on the same machine:

```bash
# first-time attach local yalc package
npm run dev:use-local-lib

# refresh local package after library changes
npm run dev:refresh-local-lib

# remove local yalc override and go back to published package
npm run dev:use-published-lib
```

Equivalent shell wrappers:

```bash
./scripts/use-local-lib.sh
./scripts/refresh-local-lib.sh
./scripts/use-published-lib.sh
./scripts/run-app.sh
./scripts/restart-app-clean.sh
```

Regular app commands:

```bash
npm start
npm run build
npm test
```

## What the package provides

- `BrGridComponent`
- `BrModalComponent`
- `BrTextComponent`
- `BrDateComponent`
- `BrSingleSelectComponent`
- `BrMultiSelectComponent`
- `BrCheckboxComponent`
- `BrRadioComponent`
- `BrAutocompleteComponent`
- related config and event types
- `RuntimeUiConfigService`
- `ControlRegistryService`

## In-App Guides

- Developer playground: `http://localhost:4200/playground`
  - Change control modes (`grid`, `date`, `modal`) at runtime.
  - Edit JSON configs for `br-grid`, `br-date`, `br-modal` and apply live.
  - Inspect emitted action events.
- Docs page: `http://localhost:4200/docs`
  - Quick consumption instructions and event wiring examples.
