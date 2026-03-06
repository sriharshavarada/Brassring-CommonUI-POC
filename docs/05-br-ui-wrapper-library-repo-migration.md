# `@sriharshavarada/br-ui-wrapper` Library Repo Migration Map

## Goal
Create a separate private repo that contains only the Angular library source and the minimal workspace files required to build/publish it.

This is the lowest-risk first move:
- keep the current library folder structure
- remove the demo app from the new repo
- publish from the new repo
- later let the current public repo consume the published package

## Recommended First-Cut Repo Shape
Do **not** flatten the library on day 1. Keep the current Angular workspace shape so the publish path stays close to what is already working.

New repo target shape:

```text
br-ui-wrapper/
  angular.json
  package.json
  package-lock.json
  tsconfig.json
  README.md
  .gitignore
  projects/
    br-ui-wrapper/
      README.md
      ng-package.json
      package.json
      tsconfig.lib.json
      tsconfig.lib.prod.json
      tsconfig.spec.json
      src/
        public-api.ts
        lib/
          common/
            adapters/
            components/
            config/
            forms/
            implementations/
            models/
            services/
```

## Copy These From Current Repo

### Root files
Copy these workspace-level files into the new private repo:

- [/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/angular.json](/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/angular.json)
- [/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package.json](/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package.json)
- [/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package-lock.json](/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/package-lock.json)
- [/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/tsconfig.json](/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/tsconfig.json)
- root `.gitignore`

### Library source
Copy this entire directory exactly:

- `projects/br-ui-wrapper/`

That includes:
- library wrapper components
- grid/modal/form/date implementations
- adapters
- models
- services
- `public-api.ts`

## Do Not Copy To The New Repo
Leave these behind in the current public demo/docs repo:

- `src/`
- `public/`
- `docs/`
- `run-app.sh`
- `dist/`
- `out-tsc/`
- any GitHub Pages workflow that exists only for the demo app

## Required Edits In The New Library Repo

### 1. `angular.json`
Keep only the `br-ui-wrapper` project entry. Remove the application project (`br-ui-framework`).

What should remain:
- library project definition
- library build target
- library test target if you want to keep it

What should be removed:
- app build/serve configuration
- `sourceRoot: "src"` app references
- app assets/styles/scripts sections

### 2. Root `package.json`
Convert it into a library-workspace package manager file.

Keep:
- Angular build/dev dependencies needed for `ng build br-ui-wrapper`
- `ng-packagr`
- TypeScript

Recommended scripts:

```json
{
  "scripts": {
    "ng": "ng",
    "build": "ng build br-ui-wrapper",
    "build:lib": "ng build br-ui-wrapper",
    "watch": "ng build br-ui-wrapper --watch --configuration development",
    "test": "ng test br-ui-wrapper"
  }
}
```

### 3. Root `tsconfig.json`
Remove demo-app-specific path aliasing.

Specifically remove:

```json
"paths": {
  "br-ui-wrapper": [
    "./projects/br-ui-wrapper/src/public-api.ts"
  ]
}
```

Reason:
- in the library repo, there is no separate consumer app that needs a local import alias
- the package name will be resolved after publish/install, not inside this workspace

### 4. Library package metadata
Edit:

- [/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/package.json](/Users/sriharshavinfinite.com/Desktop/CommonUIForBRPOC/projects/br-ui-wrapper/package.json)

Current prototype package metadata:

```json
{
  "name": "@sriharshavarada/br-ui-wrapper",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/animations": "^19.0.0",
    "@angular/cdk": "^19.0.0",
    "@angular/common": "^19.0.0",
    "@angular/core": "^19.0.0",
    "@angular/forms": "^19.0.0",
    "@angular/material": "^19.0.0",
    "@angular/platform-browser": "^19.0.0",
    "@angular/router": "^19.0.0",
    "rxjs": "^7.8.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "sideEffects": false
}
```

This is not the final publish config step yet. This is only the package identity/dependency shape.

### 5. Library README
Update:

- `projects/br-ui-wrapper/README.md`

This README should explain:
- what the package is
- install command
- standalone component import examples
- supported wrappers (`br-grid`, `br-modal`, `br-date`, `br-text`, etc.)

## Files That Are The Real Library Payload
These are the most important folders in the new repo:

- `projects/br-ui-wrapper/src/public-api.ts`
- `projects/br-ui-wrapper/src/lib/common/components/`
- `projects/br-ui-wrapper/src/lib/common/implementations/`
- `projects/br-ui-wrapper/src/lib/common/adapters/`
- `projects/br-ui-wrapper/src/lib/common/models/`
- `projects/br-ui-wrapper/src/lib/common/services/`
- `projects/br-ui-wrapper/src/lib/common/forms/`
- `projects/br-ui-wrapper/src/lib/common/config/`

## New Repo Build Validation
After copying and trimming the repo, this should work from the new repo root:

```bash
npm install
npm run build
```

Expected result:
- Angular builds only the library
- output is produced under `dist/br-ui-wrapper`

## What Stays In The Current Public Repo
The current repo becomes the demo/docs/consumer app:

- Playground
- Docs page
- Add User / Add Order / Grid / Modal demo screens
- GitHub Pages workflow

Later, that repo will:
- remove local `projects/br-ui-wrapper`
- install `@sriharshavarada/br-ui-wrapper`
- import from the package name only

## Suggested Migration Order
1. Copy the files listed above into the new private repo.
2. Trim `angular.json`.
3. Trim root `package.json`.
4. Remove root `tsconfig.json` path alias.
5. Keep the prototype package name as `@sriharshavarada/br-ui-wrapper` until company scope is available.
6. Run `npm install`.
7. Run `npm run build`.
8. Only after that, move to publish setup.

## Deliberate Non-Goal For Step 1
Do **not** try to:
- publish package
- switch the current demo repo to package consumption
- flatten the library to repo root

Those are later steps. Step 1 is only: create a clean standalone library repo that builds successfully.
