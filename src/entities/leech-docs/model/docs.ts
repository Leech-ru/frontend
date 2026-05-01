export interface LeechDocMeta {
  readonly slug: string;
  readonly title: string;
  readonly navTitle: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly icon: string;
}

export const LEECH_DOCS = [
  {
    slug: "index",
    title: $localize`О медицинской пиявке`,
    navTitle: $localize`О пиявке`,
    description: $localize`История гирудотерапии, основные механизмы действия медицинской пиявки и практические советы по безопасному выбору.`,
    image: "https://leech.ru/userfiles/O_piyavke_1%281%29.jpg",
    imageAlt: $localize`Медицинские пиявки в чистой производственной среде`,
    icon: "@tui.book-open",
  },
  {
    slug: "wild",
    title: $localize`Осторожно: дикая пиявка`,
    navTitle: $localize`Дикая пиявка`,
    description: $localize`Как отличить контролируемую медицинскую пиявку от сомнительного материала и почему документы важнее субъективной активности.`,
    image: "https://leech.ru/userfiles/O_piyavke_2B%281%29.jpg",
    imageAlt: $localize`Медицинские пиявки на губчатом материале для сравнения происхождения и качества`,
    icon: "@tui.triangle-alert",
  },
  {
    slug: "biochemistry",
    title: $localize`Биохимия пиявки`,
    navTitle: $localize`Биохимия`,
    description: $localize`Биологически активные вещества секрета слюнных желез и их роль в комплексном действии медицинской пиявки.`,
    image: "https://leech.ru/userfiles/O_piyavke_3B%281%29.jpg",
    imageAlt: $localize`Крупный план медицинской пиявки в лабораторной чашке`,
    icon: "@tui.flask-conical",
  },
  {
    slug: "references",
    title: $localize`Литература`,
    navTitle: $localize`Литература`,
    description: $localize`Подборка научных публикаций и материалов о гирудотерапии, гемостазе и биохимии медицинских пиявок.`,
    image: "https://leech.ru/userfiles/O_piyavke_4B%281%29.jpg",
    imageAlt: $localize`Медицинские пиявки как объект научных публикаций`,
    icon: "@tui.library",
  },
  {
    slug: "collection",
    title: $localize`В сборник`,
    navTitle: $localize`В сборник`,
    description: $localize`Правила подготовки статей для сборника «Гирудотерапия и гирудофармакотерапия»: структура, требования и контакты.`,
    image: "https://leech.ru/userfiles/O-centre78-b.jpg",
    imageAlt: $localize`Международный центр медицинской пиявки`,
    icon: "@tui.file-text",
  },
] as const satisfies readonly LeechDocMeta[];

export type LeechDocSlug = (typeof LEECH_DOCS)[number]["slug"];

export const DEFAULT_LEECH_DOC_SLUG: LeechDocSlug = "index";

export function isLeechDocSlug(slug: string): slug is LeechDocSlug {
  return LEECH_DOCS.some((doc) => doc.slug === slug);
}

export function getLeechDocMeta(slug: string): LeechDocMeta | null {
  return LEECH_DOCS.find((doc) => doc.slug === slug) ?? null;
}
