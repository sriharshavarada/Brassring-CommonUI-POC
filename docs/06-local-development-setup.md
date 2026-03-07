# Local Development Setup Guide

This guide explains how to set up your local environment for developing the **UI Library** and running the **Angular Application** (MVC app) simultaneously.

## 1. Identified Projects
- **Library (`br-ui-wrapper`):** Located at `e:\CommonUI\br-ui-wrapper`. Produces the `@sriharshavarada/br-ui-wrapper` package.
- **Application (`Brassring-CommonUI-POC`):** Located at `e:\CommonUI\Brassring-CommonUI-POC`. Consumes the library.

---

## 2. Tooling: `yalc`
The setup uses **`yalc`**, a tool that acts as a local npm registry. This allows the application to consume the library from your local disk without needing to publish to a remote registry like GitHub or NPM.

### Installation
It is recommended to install `yalc` globally:
```bash
npm install -g yalc
```

---

## 3. Setup Steps

### A. Library Side (`br-ui-wrapper`)
1. Open terminal in `e:\CommonUI\br-ui-wrapper`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build and "publish" locally:
   ```bash
   npm run dev:yalc
   ```
   *This builds the package and stores it in a hidden `~/.yalc` folder.*

### B. Application Side (`Brassring-CommonUI-POC`)
1. Open terminal in `e:\CommonUI\Brassring-CommonUI-POC`.
2. Link the local package:
   ```bash
   npm run dev:use-local-lib
   ```
   *This adds the local package and runs `npm install`.*
3. Start the application:
   ```bash
   npm start
   ```

---

## 4. Development Workflow

Once set up, follow this cycle to iterate quickly:

1. **Modify code** in the library (`br-ui-wrapper/projects/br-ui-wrapper`).
2. **Push changes** to the app:
   ```bash
   # In the library directory
   npm run dev:yalc:push
   ```
   *This rebuilds the library and pushes the updated code directly into the app's `node_modules`.*
3. The app's `ng serve` (if running) will see the update and refresh automatically.

---

## 5. Troubleshooting & Maintenance

- **Refresh Link:** If changes aren't reflecting, run `npm run dev:refresh-local-lib` in the app directory.
- **Go Back to Published Version:** To stop using the local version and use the real released package, run:
  ```bash
  npm run dev:use-published-lib
  ```
- **Shell Scripts:** You can also use the convenience scripts in the `scripts/` folder:
  - `./scripts/use-local-lib.sh`
  - `./scripts/run-app.sh`
