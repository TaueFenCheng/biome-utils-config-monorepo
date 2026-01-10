# Agent Guidelines for biome-utils-config-monorepo

## Project Overview

This is a **pnpm monorepo** containing:
- `packages/biome-config-utils` - Base Biome configuration package
- `packages/utils` - React utilities and hooks (React 18)
- `projects/rspack_loader` - Rspack loader
- `projects/rspack_plugins` - Rspack plugins

## Build/Lint/Test Commands

### Package Manager
```bash
pnpm install          # Install all dependencies
```

### Per-Package Commands

**`packages/biome-config-utils`**:
```bash
pnpm build            # Build with rslib (ESM format)
pnpm dev              # Watch mode build
```

**`packages/utils`**:
```bash
pnpm build            # Build with rslib (ESM + CJS formats)
pnpm dev              # Watch mode build
pnpm check            # Run biome check --write
pnpm format           # Run biome format --write
pnpm lint             # Run biome format on src
pnpm test             # Run vitest
pnpm test -- <test-name>  # Run single vitest (e.g., pnpm test -- index.test.ts)
```

**`projects/rspack_loader` and `projects/rspack_plugins`**:
```bash
pnpm test             # No tests configured (placeholder)
```

## Code Style Guidelines

### Formatter (Biome)
- **Indent style**: spaces (2 spaces)
- **Line width**: 80 characters
- **Line ending**: LF (Unix)
- **Format with errors**: enabled

### JavaScript/TypeScript Style
- **Quotes**: single quotes (`'`)
- **Trailing commas**: all (in multi-line objects/arrays)
- **Semicolons**: as needed (Biome default)

### TypeScript Conventions
- **Strict mode**: enabled
- **Target**: ES5 (packages/utils), ES2021 (packages/biome-config-utils)
- **Module**: ESNext
- **Module resolution**: `bundler`
- **JSX**: `react-jsx` (for React packages)
- **noImplicitAny**: false (utils package allows implicit any)

### Naming Conventions
- **Functions**: camelCase (`isArray`, `isObject`)
- **Classes**: PascalCase (`ReactDOMRender`)
- **Constants**: camelCase or SCREAMING_SCASE based on scope
- **Interfaces**: PascalCase (`RootType`, `RootTypeReact`)
- **Type aliases**: PascalCase

### Imports
- Use named exports where possible: `export function name() {}`
- Group imports logically
- Organize imports with Biome: enabled (`"source.organizeImports": "on"`)

### Error Handling
- Avoid `console.log` in production code (linter allows `noConsole: "off"`)
- Use `try/catch` for fallbacks (see `ReactDomRender.ts:50-54`)
- Type guards using `obj is Type` pattern preferred

### React Patterns
- Use FunctionComponent for typed components
- Support both React 17 and 18 rendering (see `ReactDomRender.ts`)
- Use class properties syntax for methods (`render = () => {}`)

### Linting Rules
- **Recommended**: enabled
- **Complexity**: `useLiteralKeys: "off"` allowed
- **Correctness**: unused variables/labels are warnings, not errors
- **Suspicious**: `noExplicitAny`, `noConsole`, `noConfusingVoidType` all off
- **Style**: strict rules enabled (`useAsConstAssertion`, `useDefaultParameterLast`, etc.)

### File Structure
- Source files in `src/` directory
- Tests in `tests/` directory (for utils package)
- Configuration files at package root (`biome.json`, `tsconfig.json`, `rslib.config.ts`)
- Dist output in `dist/` directory (auto-generated)

### Comments
- Use JSDoc for public APIs (`@description` tags)
- Comment complex logic or workarounds
- Reference external sources when using internals (see ReactDOMRender comments)

### Testing (Vitest)
- Use `test()` function with descriptive names
- Place test files in `tests/` directory
- Import from `vitest` package

### Publishing
- Use `rsbuild-plugin-publint` for package validation
- Public packages with `publishConfig.access: "public"`
