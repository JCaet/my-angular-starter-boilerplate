# My Angular Starter Boilerplate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready Enterprise Angular 21+ boilerplate utilizing an advanced toolchain, state-of-the-art testing, and strict UI paradigms.

## Project Description

This boilerplate provides a modern, high-performance foundation for Angular applications. It's built for developers who want a robust, pre-configured environment that includes:

*   **Angular 21+** with a focus on **Zoneless** reactivity and **Signals**.
*   **Vitest** and **Playwright** for comprehensive testing.
*   **Tailwind CSS 4.0** for modern, utility-first styling.
*   Automated releases and CI/CD integration.
*   Docker support for development and production.

## Tooling Stack

| Tool | Purpose / Workflow Impact |
| --- | --- |
| **Angular 21+** | Core Framework. **Zoneless** by default, strict **Signals** & **Standalone Components**. |
| **ESBuild / Application Builder** | Fast, default compilation replacing standard Webpack builds entirely. |
| **Tailwind CSS 4.0** | Next-gen atomic styling explicitly configured via a purely CSS-first setup. |
| **Yarn** | Deterministic package management with node-modules linker. |
| **Vitest 4** | Native Angular CLI unit test runner (`@angular/build:unit-test`) superseding Karma/Jasmine. |
| **Playwright** | Advanced E2E layout, functional, and snapshot testing. |
| **ESLint + Prettier** | Flat configuration linting standard & code formatting rules enforced on save. |
| **Stylelint** | Specialized validation focused tightly on CSS strictness. |
| **Husky + commitlint** | Strict commit enforcement via local Git Hooks to meet Conventional Commit criteria. |
| **Compodoc** | Codebase documentation generated from TypeScript sources. |
| **Source Map Explorer** | Bundle sizes and tree-shaking depth inspection for final optimization analysis. |
| **Release Please** | PR-based semantic versioning and automated CHANGELOG generation via GitHub Actions. |

## Getting Started
Ensure you have Node.js 24+ and Yarn configured in your system.

```bash
# 1. Install Dependencies
yarn install

# 2. Run the Development Server (Available at http://localhost:4200)
yarn start

# 3. Format & Lint
yarn lint
yarn format

# 4. Execute Unit Tests (native Angular CLI Vitest)
yarn test

# 5. Execute End-to-End Tests
yarn e2e
```

## Creating & Bumping Versions

Commits should follow structured specifications (e.g. `feat: added auth widget`). Releases are fully automated via [Release Please](https://github.com/googleapis/release-please):

1. Merge one or more Conventional Commits into `main`.
2. Release Please opens a Release PR that bumps the version in `package.json` and updates `CHANGELOG.md`.
3. Merging that PR creates the GitHub Release and git tag automatically.

## Containerization & Deployment

To launch a standard dev environment using Hot Module Replacement (HMR) within Docker:
```bash
docker build -f Dockerfile.dev -t modular-angular-dev .
docker run -p 4200:4200 -v $(pwd):/app -v /app/node_modules modular-angular-dev
```

To build and run an NGINX orchestrated staging/production standalone image:
```bash
docker build -t modular-angular-prod .
docker run -p 8080:80 modular-angular-prod
```
The application will be compiled statically and served from `http://localhost:8080`.

## Developer Recommendations

### 1. Reactivity Strategy (Signals vs RxJS)
This boilerplate is **Zoneless** by default. To maintain optimal performance:
- Use **Signals** for all component state and local reactivity.
- Avoid RxJS `BehaviorSubject` or `Observable` patterns in components unless interfacing with legacy libraries.
- For `HttpClient` or other Observable-based services, use `rxResource` (Angular 19+) or `toSignal` to bridge into the Signal-based UI layer.

### 2. Component Architecture
- **Signal Inputs/Outputs:** Always use the new signal-based `input()`, `output()`, and `model()` functions.
- **OnPush Change Detection:** While zoneless renders this technically redundant, keeping `changeDetection: ChangeDetectionStrategy.OnPush` is recommended for architectural clarity and future-proofing.
- **Standalone by Default:** All components, directives, and pipes must be standalone.

### 3. Tailwind CSS 4.0 & Theme Management
The current boilerplate uses the next-generation `@theme` engine. To keep the project maintainable:
- Avoid large configuration files (e.g. `tailwind.config.js`). Use the CSS-first approach in `src/styles/styles.css`.
- Group custom design tokens under the `@theme` block.
- For specific global styles, use the `@layer base` or `@layer components` blocks to maintain correct cascade priority.

### 4. Testing & Coverage Thresholds
This project enforces a **60% coverage threshold** via `vitest.config.ts`.
- Ensure new features include unit tests to maintain or improve this score.
- Run `yarn test:coverage` to verify the impact of your changes.

### 5. Module Resolution & Imports
The project is configured with `moduleResolution: "bundler"` for maximum performance.
- Always use explicit imports and avoid wildcard exports where possible to allow the ESBuild engine to perform optimal tree-shaking.
- Avoid deep imports into library internals (e.g., `rxjs/internal/...`).

## SSR Adoption (Server-Side Rendering)
While this boilerplate is configured for Client-Side Rendering (CSR), you can transition to SSR if SEO or initial load performance becomes a priority:
1. Run `ng add @angular/ssr`.
2. Update `angular.json` to configure the SSR builder.
3. Note that SSR requires careful handling of browser-only globals (`window`, `document`)—use `isPlatformBrowser` or the new `afterRender`/`afterNextRender` hooks.
4. **Dockerfile Adaptation:** SSR requires a Node.js-based runtime for the server phase. You'll need to update your `Dockerfile` to use a Node.js base image for final execution (replacing the NGINX-only static serving) to run the `server.mjs` entry point.

## Configuration Notes

### Dev Server — Allowed Hosts

`angular.json` sets `security.allowedHosts` to `[]`, which restricts the dev server to `localhost` only. If you run `ng serve` inside a VM, container, or remote dev environment and see an **"Invalid Host header"** error, add your hostname explicitly:

```json
"security": {
  "allowedHosts": ["my-dev-host.internal"]
}
```

### Zoneless & Empty Polyfills

`angular.json` sets `"polyfills": []` — this is **intentional and must not be changed**. This project uses `provideZonelessChangeDetection()`, which eliminates the dependency on `zone.js` entirely. Adding `zone.js` to polyfills would re-introduce the Zone monkey-patching overhead that zoneless change detection is specifically designed to avoid, and would cause unpredictable behaviour with the Signals-based reactivity model.

If you are migrating an existing Zone-based app into this boilerplate, remove `zone.js` from polyfills and replace `provideZoneChangeDetection()` with `provideZonelessChangeDetection()` in `app.config.ts`.

> **Note on JSON comments in `angular.json`:** A previous version of this file contained a `"// polyfills"` key as a workaround to document the empty polyfills array inline. Angular's schema validator treats every key as a real property and rejects unknown ones, causing `ng build` and `yarn test` to fail with a schema validation error. Plain JSON does not support comments — use this README or the `CLAUDE.md` file for configuration notes instead.

### Testing Environment — jsdom

`vitest.config.ts` sets `environment: 'jsdom'`, which runs unit tests in a simulated browser DOM. **jsdom is not bundled with vitest 4+** — it must be installed as an explicit dev dependency:

```bash
yarn add -D jsdom
```

jsdom has no direct `import` statements anywhere in the source, so automated dependency scanners (e.g. `depcheck`) will flag it as unused. **Do not remove it.** It is a required peer dependency consumed at runtime by vitest when it bootstraps the jsdom environment for each test file. Removing it causes all unit tests to fail with `Cannot find package 'jsdom'`.

### Internationalisation (i18n)

This boilerplate does not include `@angular/localize`. If your application needs localisation, add it **before** building any features — retrofitting it later requires changes across the build pipeline (tsconfig, polyfills, and any SSR server if added):

```bash
ng add @angular/localize
```
