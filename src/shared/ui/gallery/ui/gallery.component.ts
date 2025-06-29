import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { TuiCarousel, TuiPagination } from "@taiga-ui/kit";

import {
  AppGalleryCarouselItem,
  AppGalleryCarouselLargePhoto,
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
  public readonly items = input<AppGalleryCarouselItem[]>([]);
  public readonly visiblePhotosCount = input<number>(1);

  public readonly index = signal<number>(0);

  public readonly paginatorLength = computed(
    () =>
      this.items().reduce(
        (total, item) => total + (this.isLargePhoto(item) ? 2 : 1),
        0,
      ) -
      this.visiblePhotosCount() +
      1,
  );

  protected isLargePhoto(
    item: AppGalleryCarouselItem,
  ): item is AppGalleryCarouselLargePhoto {
    return "large" in item;
  }

  protected isPhotosGroup(item: AppGalleryCarouselItem) {
    return Array.isArray(item);
  }
}
