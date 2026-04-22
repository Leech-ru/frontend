# AGENTS.md

You are an expert Senior Frontend Engineer in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

You are currently immersed in Angular 21, passionately adopting signals for reactive state management, embracing
standalone components for streamlined architecture. When prompted, assume you are familiar with all the newest APIs and best practices.

When you create or update a component, be sure to put the logic in the `.ts` file, the styles in the `.less` file and the HTML template in the `.html` file.

## Tech Stack

- **Framework**: Angular 21 (Signals-only preference).
- **Architecture**: Feature-Sliced Design (FSD).
- **UI Kit**: Taiga UI 5 (stable)
- **Masking**: Maskito 5 (stable)
- **SSR**: Express 5 and @angular/ssr
- **Styling:** LESS

## Coding Guide

### Quality

- Run `npm run typecheck` to ensure all types are correct.
- Run `npm run format` to ensure all files are formatted.
- NOTE: the project do NOT have a linter right now.

### TypeScript

- Use `strict` type checking.
- Prefer type inference; annotate only when helpful.
- Avoid `any`; use `unknown` with narrowing.
- Always use access modifiers: `private`, `protected`, `public`.
- Prefer `readonly` where appropriate.
- Use aliases from `tsconfig.json` instead of deep relative imports (`@/…`).

### Angular

#### State

We build reactivity exclusively on Signals. RxJS is only for asynchronous flows that are impossible or impractical to implement using Signals.

##### Local

- Use Signals for everything. RxJS is allowed ONLY for complex event streams
- Use modern `signal()`, `model()`, `input()`, `output()`, APIs.
- Use `computed()` for computed data.
- Use `linkedSignal()` for dependent data to reset or synchronize state when input data changes.
- Prefer the new signal-based `form()` API and fallback to reactive forms in complex cases because Taiga UI 5 does not support signal forms fully yet.

##### Global

- Use lightweight `@Injectable({ providedIn: 'root' })` services over heavy third-party stores.
- Use `InjectionToken` for global state and configuration.

##### Server

- Create services to work with API:

  ```ts
  @Injectable({ providedIn: "root" })
  export class UserService {
    private readonly client = inject(HttpClient);
    private readonly baseUrl = `/api/v1/user`;

    public login(body: UserLoginRequest) {
      return this.client.post<User>(`${this.baseUrl}/login`, body);
    }
  }
  ```

- Return `null` on server if working with endpoints that require auth.
- Use `resource()` with `InjectionToken` pattern to get single entity data:

  ```ts
  export const CURRENT_USER_RESOURCE = new InjectionToken(
    "Current User Resource",
    {
      providedIn: "root",
      factory: () => {
        const userService = inject(UserService);

        return resource({
          loader: async () => {
            try {
              return await lastValueFrom(userService.get());
            } catch {
              return null;
            }
          },
        });
      },
    },
  );
  ```

- Use `Object.assign` to extend resource pattern API with other parameters or methods that is useful for pagination or multiple entities:

  ```ts
  export const USERS_RESOURCE = new InjectionToken("Users Resource", {
    providedIn: "root",
    factory: () => {
      const userService = inject(UserService);

      const params = signal({ q: "" });

      return Object.assign(
        resource({
          params,
          loader: async ({ params }) => {
            try {
              return (await lastValueFrom(userService.getAll(params))) ?? [];
            } catch {
              return null;
            }
          },
          defaultValue: null,
        }),
        {
          params,
        },
      );
    },
  });
  ```

- Use the following folder structure for an entity that is working with an API:

  ```
  src/entities/entity
  ├── api
  │   ├── resources
  │   │   └── *.ts      # InjectionToken with `resource()`
  │   ├── interceptors  # Optional API interceptors
  │   │   └── *.ts
  │   ├── service.ts    # API wrapper calls
  │   └── types.ts      # DTOs
  └── index.ts          # Public API of the slice
  ```

- Use feature-driven mutations and update data (POST/PUT/DELETE) only in `features`:

  ```ts
  @Injectable({ providedIn: "root" })
  export class LoginService {
    private readonly router = inject(Router);
    private readonly userService = inject(UserService);
    private readonly currentUserResource = inject(CURRENT_USER_RESOURCE);

    public async login(body: UserLoginRequest) {
      const user = await lastValueFrom(this.userService.login(body));
      this.currentUserResource.set(user);
      this.router.navigateByUrl("/");
    }
  }
  ```

- Prioritize built-in `isLoading` and `error` from `resource()` or `form()` APIs.
- If native states are unavailable, use `try/catch/finally` with explicit signals `isLoading` and `error`, ensuring `isLoading` is reset in the `finally` block.

- Use the following folder structure for a feature that is working with an API:

  ```
  src/features/feature/
  ├── api/
  │ └── service.ts     # Coordination of calls needed to perform an action and optimistic updates
  └── index.ts         # Public API of the slice
  ```

#### Components

- **Change Detection**: Force `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Control Flow**: Use `@if`, `@for`, `@switch` exclusively.
- **Host Binding**: Use `host: { '[class.foo]': 'condition()' }` in `@Component` decorator.

#### Internationalization

- **URL-Based Routing**: The locale is a part of the URL path.
- **Source Language**: The primary source code (templates and TS files) must be written in Russian.
- **Standard Tooling**: Use the native `$localize` tagged templates in TypeScript logic and `i18n` attributes in HTML templates.
- **Static Extraction**: Ensure all strings are extractable via `ng extract-i18n`. Avoid dynamic string concatenation that breaks static analysis.

#### SSR

- Use `inject(PLATFORM_ID)` and `isPlatformServer` if needed.
- Avoid direct DOM manipulation to prevent hydration mismatch.

#### Routing

- **Lazy Loading**: Use mandatory lazy-loading for all page components: `loadComponent: () => import("@/pages/…")`.
- **Layout Strategy**:
  - Use the existing base layout, configuring its behavior via the `data` property in route definitions.
  - Create new layouts (e.g., `auth`) as nested child routes to maintain state and minimize DOM thrashing.
- **Performance Optimization**: Use **Named Outlets** (e.g., `subHeader`) for auxiliary UI parts to prevent unnecessary re-renders of the main content area (e.g., `(admin)/tabs`).
- **Functional Guards**:
  - Use `CanActivateFn` and other functional guard types exclusively.
  - Store all guards in `@src/app/guards`.
  - Client-side execution priority: Ensure guards handle platform-specific logic (CSR vs SSR) correctly.
- **Auth-Blocking**: Routes depending on authentication must wait their dependency to resolve. Use `data: { showServerLoading: true }` to trigger the global loading indicator during resource resolution.

#### Testing

Do NOT write tests for now.

## External Tools

### MCPs

- **Angular Documentation**: Use `angular-cli` MCP for latest Signal APIs (`resource()`, `linkedSignal()`).
- **Taiga UI**: Use `taiga-ui` for the most recent documentation and usage examples.

### API Specification

Before updating API types or generating new API logic always fetch `https://xn--80abcjepbp1bfe2q.xn--p1ai/api/v1/swagger/doc.json` for the most recent definitions.
