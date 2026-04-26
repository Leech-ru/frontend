import { CategoryService, getImageUrlById } from "@/entities/cosmetic";
import { CosmeticCreateCategoryService } from "@/features/(cosmetic)/create-category";
import { CosmeticUpdateCategoryService } from "@/features/(cosmetic)/update-category";
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
  private readonly createService = inject(CosmeticCreateCategoryService);
  private readonly updateService = inject(CosmeticUpdateCategoryService);
  protected readonly context =
    injectContext<TuiDialogContext<CategoryFormData, CategoryFormData>>();

  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly previewUrl = signal<string | null>(null);

  protected readonly isEdit = !!this.context.data?.id;

  protected readonly saveLabel = $localize`Сохранить`;
  protected readonly createLabel = $localize`Создать`;

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
      if (files && files instanceof File) {
        if (files.type.startsWith("image/")) {
          const url = URL.createObjectURL(files);
          this.previewUrl.set(url);
        }
      }
    });
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.isEdit && !this.form.value.file) {
      this.error.set($localize`Выберите изображение`);
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
        const updateData: { name: string; image_id?: string } = { name };

        if (this.form.value.file) {
          updateData.image_id = imageId;
        }

        await this.updateService.update(this.context.data.id, updateData);
      } else {
        await this.createService.create({ name, image_id: imageId });
      }

      this.context.completeWith({
        ...this.context.data,
        name,
        image_id: imageId,
      });
    } catch {
      this.error.set($localize`Произошла ошибка, попробуйте ещё раз`);
    } finally {
      this.isLoading.set(false);
    }
  }
}
