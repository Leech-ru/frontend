import { CosmeticCategory, CosmeticItem } from "../../../../entities/cosmetic";

export const TEST_DATA: Record<CosmeticCategory, CosmeticItem[]> = {
  [CosmeticCategory.Hair]: [
    {
      name: "Гель Гирудо с экстрактом пиявки",
      description:
        "Эффективен при воспалениях, ускоряет заживления ран и ожогов, рассасывает гематомы, уменьшает отечность, чувство тяжести и распирания ног, боли при ушибах, растяжениях связок, укусах насекомых; снижает усталость мышц и общее утомление, активно препятствует развитию варикозного расширения вен и тромбообразованию.Гель Гирудо - натуральное средство лечебно-профилактического действия, содержит комплекс биологически активных веществ, продуцируемых медицинскими пиявками HM1, который благодаря природной липосоме, свободно проникает в глубокие слои кожи и нормализует ее функции; содержит микроэлементы, аминокислоты и уникальные, синтезируемые только медицинской пиявкой высокоэффективные полипептидыГель препятствует тромбированию сосудов; усиливает лимфодренаж, способствует выведению токсинов и продуктов жизнедеятельности клеток,нормализует метаболические процессы в коже.Гель эффекитивен в комплексной терапии при лечении псориаза, варикозного разширения вен, тромбофлебита, геморроя.",
      guide:
        "Наносите утром и вечером на очищенную кожу лица легкими массирующими движениями.",
      features: {
        category: CosmeticCategory.Face,
        size: "50 г",
      },
      buy_links: {
        wildberries: [
          "https://www.wildberries.ru/catalog/63900041/detail.aspx",
        ],
        ozon: [
          "https://www.ozon.ru/product/gel-girudo-100-ml-s-bioaktivnym-kompleksom-meditsinskoy-piyavki-nm1-1962068882",
        ],
      },
      image_link:
        "https://basket-04.wbbasket.ru/vol639/part63900/63900041/images/big/1.webp",
    },
    {
      name: "Питательный шампунь с кератином",
      description:
        "Шампунь для восстановления структуры волос с кератином и маслом арганы.",
      guide:
        "Нанесите на влажные волосы, вспеньте и смойте теплой водой. При необходимости повторите.",
      features: {
        category: CosmeticCategory.Hair,
        size: "250ml",
      },
      buy_links: {
        wildberries: ["https://www.wildberries.ru/catalog/hair-shampoo"],
      },
      image_link: "https://example.com/images/hair-shampoo.jpg",
    },
  ],
  [CosmeticCategory.Body]: [],
  [CosmeticCategory.Clean]: [],
  [CosmeticCategory.Exclusive]: [],
  [CosmeticCategory.Face]: [],
  [CosmeticCategory.Intensive]: [],
  [CosmeticCategory.Leech]: [],
  [CosmeticCategory.Lux]: [],
  [CosmeticCategory.Man]: [],
};
