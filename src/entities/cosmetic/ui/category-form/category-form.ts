import {
  CATEGORIES_RESOURCE,
  CategoryService,
  getImageUrlById,
} from "@/entities/cosmetic";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiAutoFocus } from "@taiga-ui/cdk";
import {
  TuiButton,
  TuiDialogContext,
  TuiError,
  TuiInput,
  TuiLink,
  TuiNotificationService,
  TuiTextfield,
} from "@taiga-ui/core";
import {
  TuiAvatar,
  TuiButtonLoading,
  TuiFile,
  TuiFiles,
  TuiInputFiles,
} from "@taiga-ui/kit";
import { TuiForm } from "@taiga-ui/layout";
import { injectContext } from "@taiga-ui/polymorpheus";
import { lastValueFrom } from "rxjs";

interface CategoryFormData {
  id?: string;
  name: string;
  image_id?: string;
}

@Component({
  templateUrl: "./category-form.html",
  styleUrl: "./category-form.less",
  imports: [
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiAvatar,
    TuiButton,
    TuiButtonLoading,
    TuiError,
    TuiFile,
    TuiFiles,
    TuiInput,
    TuiInputFiles,
    TuiLink,
    TuiTextfield,
    TuiForm,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiNotificationService],
})
export class AppCosmeticCategoryFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly categoriesResource = inject(CATEGORIES_RESOURCE);
  private readonly notifications = inject(TuiNotificationService);
  protected readonly context =
    injectContext<TuiDialogContext<CategoryFormData, CategoryFormData>>();

  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly previewUrl = signal<string | null>(null);

  protected readonly isEdit = !!this.context.data?.id;

  protected readonly form = new FormGroup({
    name: new FormControl(this.context.data?.name ?? "", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    file: new FormControl<File | null>(null),
  });

  constructor() {
    if (this.isEdit && this.context.data?.image_id) {
      this.previewUrl.set(getImageUrlById(this.context.data.image_id));
    }

    this.form.controls.file.valueChanges.subscribe((files) => {
      const currentUrl = this.previewUrl();
      if (currentUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl);
      }

      if (files && files instanceof File) {
        if (files.type.startsWith("image/")) {
          const url = URL.createObjectURL(files);
          this.previewUrl.set(url);
        }
      } else {
        this.previewUrl.set(
          this.isEdit && this.context.data?.image_id
            ? getImageUrlById(this.context.data.image_id)
            : null,
        );
      }
    });
  }

  protected getFileFromUrl(url: string): File {
    const filename = url.split("/").pop() || "image";
    return new File([], filename, { type: "image/jpeg" });
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.isEdit && !this.form.value.file) {
      this.error.set("Выберите изображение");
      return;
    }

    this.error.set(null);
    this.isLoading.set(true);

    try {
      const name = this.form.getRawValue().name;
      let imageId = this.context.data?.image_id;

      if (this.form.value.file) {
        const uploadResponse = await lastValueFrom(
          this.categoryService.uploadImage(this.form.value.file),
        );
        imageId = uploadResponse.id;
      }

      if (this.isEdit && this.context.data?.id) {
        await lastValueFrom(
          this.categoryService.update(this.context.data.id, {
            name,
            image_id: imageId,
          }),
        );

        this.notifications
          .open("Категория изменена!", {
            appearance: "positive",
            block: "end",
            inline: "end",
          })
          .subscribe();
      } else {
        await lastValueFrom(
          this.categoryService.create({ name, image_id: imageId! }),
        );

        this.notifications
          .open("Категория создана!", {
            appearance: "positive",
            block: "end",
            inline: "end",
          })
          .subscribe();
      }

      this.categoriesResource.reload();
      this.context.completeWith({
        ...this.context.data,
        name,
        image_id: imageId,
      });
    } catch {
      this.error.set("Произошла ошибка, попробуйте ещё раз");
    } finally {
      this.isLoading.set(false);
    }
  }
}
