import {
  LEECH_LARGE_PRICE,
  LEECH_MEDIUM_PRICE,
  LEECH_SMALL_PRICE,
} from "@/entities/leech";
import { isPlatformBrowser } from "@angular/common";
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from "@angular/core";
import {
  email,
  form,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
} from "@angular/forms/signals";
import {
  LEECH_ORDER_COMMENT_MAX_LENGTH,
  LEECH_ORDER_MIN_COUNT,
} from "../config";

const STORAGE_KEY = "leech_order_progress";

@Injectable()
export class LeechOrderForm {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly model = signal(this.loadProgress());

  public readonly form = form(
    this.model,
    (schema) => {
      required(schema.package);
      required(schema.contact.name, {
        message: $localize`Пожалуйста, укажите ФИО (например, Иванов Иван Иванович)`,
      });
      pattern(
        schema.contact.name,
        /^[a-zA-Zа-яА-ЯёЁ]+\s+[a-zA-Zа-яА-ЯёЁ]+(\s+[a-zA-Zа-яА-ЯёЁ]+)?$/,
        {
          message: $localize`Пожалуйста, укажите корректное ФИО (2-3 слова)`,
        },
      );
      required(schema.contact.phone, {
        message: $localize`Пожалуйста, укажите номер телефона`,
      });
      minLength(schema.contact.phone, 12, {
        message: $localize`Пожалуйста, укажите корректный номер телефона`,
      });
      required(schema.contact.address, {
        message: $localize`Пожалуйста, укажите адрес`,
      });
      required(schema.contact.email, {
        message: $localize`Пожалуйста, укажите электронную почту`,
      });
      email(schema.contact.email, {
        message: $localize`Пожалуйста, укажите корректную электронную почту`,
      });
      maxLength(schema.contact.comment, LEECH_ORDER_COMMENT_MAX_LENGTH, {
        message: $localize`Максимальная длина комментария — ${LEECH_ORDER_COMMENT_MAX_LENGTH} символов`,
      });
      required(schema.contact.agreement, {
        message: $localize`Необходимо дать согласие`,
      });
      validate(schema.leech, (leech) => {
        const value = leech.value();
        const count = value.small + value.medium + value.large;
        if (count < LEECH_ORDER_MIN_COUNT) {
          return { kind: "count" };
        }
        return undefined;
      });
    },
    {
      submission: {
        action: async (form) => {
          console.log(form().value());
          this.clearProgress();
          this.form().reset();
        },
      },
    },
  );

  public readonly price = computed(
    () =>
      this.form.leech.small().value() * LEECH_SMALL_PRICE +
      this.form.leech.medium().value() * LEECH_MEDIUM_PRICE +
      this.form.leech.large().value() * LEECH_LARGE_PRICE,
  );

  public readonly count = computed(
    () =>
      this.form.leech.small().value() +
      this.form.leech.medium().value() +
      this.form.leech.large().value(),
  );

  public readonly remains = computed(() =>
    Math.max(0, LEECH_ORDER_MIN_COUNT - this.count()),
  );

  constructor() {
    effect(() => {
      const state = this.model();
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    });
  }

  private loadProgress() {
    const defaultValue = {
      leech: { small: 0, medium: 0, large: 0 },
      package: "",
      contact: {
        name: "",
        address: "",
        comment: "",
        email: "",
        phone: "",
        agreement: false,
      },
    };

    if (!this.isBrowser) {
      return defaultValue;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as typeof defaultValue) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private clearProgress() {
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
