import { routes } from "../app.routes";

type CollectPaths<T> = T extends readonly unknown[]
  ? {
      [K in keyof T]:
        | ExtractPath<T[K]> // Путь текущего элемента
        | ExtractNestedPaths<T[K]>; // Пути из вложенных children
    }[number]
  : never;

// Вытаскиваем path из элемента, если он есть
type ExtractPath<T> = T extends { path: infer P } ? P : never;

// Рекурсивно обрабатываем вложенные children
type ExtractNestedPaths<T> = T extends { children: infer C }
  ? CollectPaths<C>
  : never;

/**
 * Тип, который представляет все возможные маршруты приложения.
 *
 * Этот тип динамически извлекает значения свойств `path` из массива маршрутов,
 * определённого в `routes`. Он позволяет избежать хард-кодинга строковых литералов
 * и обеспечивает типобезопасность при работе с маршрутами в приложении.
 *
 * Этот тип можно импортировать в других нижележащих слоях приложения,
 * так как он объявлён в слайсе для кросс-импортов (`@x`).
 *
 * @see https://github.com/feature-sliced/documentation/discussions/390
 */
export type RoutePath = CollectPaths<typeof routes>;
