import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TuiBreakpointService } from "@taiga-ui/core";
import { TuiCarousel, TuiPagination } from "@taiga-ui/kit";

import {
  AppGalleryCarouselItem,
  AppGalleryCarouselLargePhoto,
  AppGalleryCarouselPhotoGroup,
} from "../model/types";

@Component({
  selector: "app-gallery",
  templateUrl: "gallery.component.html",
  styleUrl: "gallery.component.less",
  exportAs: "appGallery",
  imports: [TuiPagination, TuiCarousel],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "app-gallery",
  },
})
export class AppGalleryComponent {
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService), {
    requireSync: true,
  });

  public readonly items = input<AppGalleryCarouselItem[]>([]);
  public readonly visiblePhotosCount = input<number>(1);

  public readonly index = signal<number>(0);

  public readonly responsiveVisiblePhotosCount = computed(() =>
    this.breakpoint() === "mobile" ? 1 : this.visiblePhotosCount(),
  );

  public readonly smallPhotoSize = 1;
  public readonly largePhotoSize = computed(() =>
    this.breakpoint() === "mobile" ? 1 : 2,
  );

  public readonly paginatorLength = computed(
    () =>
      this.items().reduce((total, item) => total + this.getItemSize(item), 0) -
      this.responsiveVisiblePhotosCount() +
      1,
  );

  public constructor() {
    effect(() => {
      if (this.index() > this.paginatorLength() - 1) {
        this.index.set(this.paginatorLength() - 1);
      }
    });
  }

  protected getItemSize(item: AppGalleryCarouselItem): number {
    return this.isLargePhoto(item)
      ? this.largePhotoSize()
      : this.smallPhotoSize;
  }

  protected isLargePhoto(
    item: AppGalleryCarouselItem,
  ): item is AppGalleryCarouselLargePhoto {
    return "large" in item;
  }

  protected isPhotosGroup(
    item: AppGalleryCarouselItem,
  ): item is AppGalleryCarouselPhotoGroup {
    return Array.isArray(item);
  }
}
