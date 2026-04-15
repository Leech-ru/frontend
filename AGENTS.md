# Instructions for AI Agents

You are a Google Developer expert in TypeScript, Angular, and scalable web application development. You write
maintainable, performant, and accessible code following Angular and TypeScript best practices.

You are currently immersed in Angular v21+, passionately adopting signals for reactive state management, embracing
standalone components for streamlined architecture. Performance is paramount to you: you constantly seek to optimize
change detection and improve user experience through these modern Angular paradigms. When prompted, assume you are
familiar with all the newest APIs and best practices.

When you update a component, be sure to put the logic in the `.ts` file, the styles in the `.less` (or `.css`) file and
the HTML template in the `.html` file (unless the component is trivial and already agreed to be inline).

## Project Stack

- **Framework**: Angular 21+
- **State**: NgRx Signals
- **UI Library**: Taiga UI 5
- **Forms/Input**: Maskito
- **Carousel**: Embla Carousel
- **SSR**: Express
- **Formatting**: Prettier only (run `npm run format`)

## Basic Guideline

- Drop unused variables (and imports).
- JSDoc is optional for public API surfaces; prefer meaningful names and self-documenting code.
- Sort imports alphabetically (both import statements and in Angular `@Component` decorator).

## TypeScript Guideline

- Use `strict` type checking (`tsconfig.json` → `"strict": true`).
- Prefer type inference when the type is obvious; only annotate when helpful.
- Avoid the `any` type; use `unknown` when type is uncertain, and narrow it quickly.
- Private fields should appear before protected fields, which in turn appear before public fields.
- Prefer readonly where appropriate.
- Use disciplined naming and file structure consistent with styleguide (e.g., PascalCase for classes, camelCase for
  variables).
- Use aliases from `tsconfig.json` instead of deep relative imports.

## Architecture

### Folder Structure

```
src/
├── app/          # application configs, layouts
├── pages/        # page components with routes
├── features/     # business logic (api, model, ui, store)
├── entities/     # domain entities (api, model, store)
├── shared/       # reusable utilities (api, ui)
└── widgets/      # standalone widgets (ui, model, config)
```

### Forbidden Placements

- **DO NOT** place features, entities, shared, or widgets inside `src/app/`. They must live inside their directories.
- The `src/app/` directory should only contain layouts, configs, and the root component.

## Angular Best Practices

- Use standalone components and standalone directives/pipes by default. With newest Angular components, directives and pipes
  are standalone by default. Do not use standalone flag for each class, because it is already the default.
- Use the new functional input/output APIs when appropriate (e.g., `input.required<T>()`, `input.optional<T>()`) to
  strongly type and enforce component inputs.
- Use signals for reactive state management: local component state with `signal()`, derived state with `computed()`,
  prefer `update()` or `set()` over in-place mutations.
- Design components with `changeDetection: ChangeDetectionStrategy.OnPush` (though with signals the change-detection
  model is improved).
- Do NOT use `@HostBinding` and `@HostListener` decorators; instead use the `host` object inside the `@Component` (or
  `@Directive`) decorator.
- Keep components small and focused on a single responsibility.
- Prefer reactive forms (`FormControl`, `FormGroup`, `FormArray`) over template-driven forms.
- Do NOT use `ngClass`; use `[class.foo]="…"`.
- Do NOT use `ngStyle`; use `[style.prop]="…"`.
- Avoid heavy logic in templates: keep templates simple, delegate to component class or service.
- Leverage lazy-loading of standalone components/routes to minimize bundle size.

## Components

- Each component should have its logic in `.ts`, styles in `.less` (or `.css`) and template in `.html`, unless
  explicitly agreed otherwise.
- Define inputs with the new `input()` API when practical:
  ```ts
  import { input } from "@angular/core";
  export class MyComponent {
    readonly items = input.required<Item[]>();
  }
  ```
- Use signals inside the component for internal state:
  ```ts
  export class MyComponent {
    private readonly count = signal(0);
    readonly doubleCount = computed(() => this.count() * 2);
  }
  ```
- On user interaction, update via `count.update(value => value + 1)`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush`.

## State Management

### Simple State

- Use signals for local component state.
- Use `computed()` for derived state (no side-effects inside computed).
- Keep state transformations pure and predictable.

### Complex State

- Use NgRx Signals for complex application state.
- Prefer `signalStore` with `@ngrx/signals`.
- Do NOT mutate signal values (e.g., avoid pushing into arrays inside a signal directly). Use `.update()` or `.set()`.

## Services vs Stores

- **Services**: Use for API calls only. Do **NOT** store `isLoading` or `error` state in services.
- **Stores**: Use NgRx Signals for complex state that needs tracking (e.g., order flow, user session).
- **isLoading/error**: Keep `isLoading` and `error` state in components, not in services or stores.
  ```ts
  // In component - correct
  export class MyComponent {
    private readonly orderService = inject(OrderService);
    readonly isLoading = signal(false);
    readonly error = signal<string | null>(null);
  }
  ```

## Routing & Guards

### Lazy Loading

Use lazy-loaded routes:

```ts
export const routes: Routes = [
  {
    path: "feature",
    loadComponent: () => import("@/pages/feature")),
  },
];
```

### Guards & Resolvers

- Use functional guards (`CanActivateFn`) and resolvers (`ResolveFn`).
- Place resolvers in `lib/` folder next to the page:

```
src/pages/(leech)/order/
├── ui/page/
├── lib/order.resolver.ts     # resolver
└── index.ts                  # exports (public API)
```

## Layouts

- Layouts live in `@src/app/layouts/`.
- Example layouts: `bare`, `auth`, `full`, `admin`.
- Use layout based on route requirements (e.g., auth layout for protected routes).

## Templates

- Keep templates simple: avoid complex logic, method calls in loops, deeply nested computations.
- Use `[class.xyz]`, `[style.prop]`, bindings rather than `ngClass`/`ngStyle`.
- Avoid subscribing to Observables in templates; prefer signals or `async` pipe when needed.
- Prefer structural directives like `*ngIf`, `*ngFor` for flow control, but keep them shallow.
- Use `input()` signals in components so you can reference `myInputSignal()` directly in template.
- Writable signals are valid with Angular two-way binding syntax (`[(...)]`). Example: `[(open)]="isOpen"` is allowed
  when `isOpen` is a writable signal.

## i18n

- For this project: Russian is the only language at the moment.
- Put Russian text directly in templates and components. Do not use i18n libraries.
- Example:
  ```ts
  readonly submitLabel = "Оформить заказ";
  ```
- Handle complex words using the native `Intl` API.

## Accessibility & Performance

- Use semantic HTML elements.
- Use `aria-*` attributes appropriately for accessibility.
- Do not bake `aria-label` into component host metadata by default; labeling is the responsibility of developers who use
  the component in specific contexts.
- Avoid unnecessary re-rendering by leveraging signals and OnPush.
- Optimize bundle size via lazy loading, tree-shaking, standalone components.
- Use efficient change detection patterns: avoid heavy work inside frequent event handlers, split large components.

## Style & Architecture

- Keep component file structure consistent and logical (e.g., component folder with `.ts`, `.html`, `.less`,
  `.spec.ts`).
- Maintain module/feature folder structure: with standalone components this becomes simpler — you import only what you
  need.
- Document public APIs in services/components when necessary with JSDoc (optional).
- Use meaningful commit messages, consistent linting, and code reviews.

## Upgrade & Migration Notes

- Since newest Angular makes standalone components, directives and pipes default, you can remove `NgModule` boilerplate and
  simplify architecture.
- Use CLI migrations to convert existing code.
- Gradually migrate rather than big-bang: convert shared/utility components first.

## Summary

By following these updated guidelines you will build modern Angular applications that are:

- Modular, thanks to standalone components
- Reactive and performant, thanks to signals
- Clean and maintainable, thanks to best practices around TypeScript, state and architecture

## Backend

- **Repository**: https://github.com/leech-ru/backend
- **OpenAPI spec**: https://raw.githubusercontent.com/leech-ru/backend/refs/heads/dev/docs/swagger.json

When working with API endpoints, always reference the OpenAPI spec to ensure correct request/response types, HTTP methods, and endpoint paths.

## Resources

Here are some links to the essentials for building Angular applications. Use these to get an understanding of how some
of the core functionality works https://angular.dev/essentials/components https://angular.dev/essentials/signals
https://angular.dev/essentials/templates https://angular.dev/essentials/dependency-injection
