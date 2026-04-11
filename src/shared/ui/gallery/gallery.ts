import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { TUI_BREAKPOINT, TuiButton } from "@taiga-ui/core";
import { EmblaCarouselDirective } from "embla-carousel-angular";
import {
  AppGalleryCarouselItem,
  AppGalleryCarouselLargePhoto,
  AppGalleryCarouselPhotoGroup,
} from "./types";
import { TuiPager } from "@taiga-ui/kit";

@Component({
  selector: "app-gallery",
  templateUrl: "gallery.html",
  styleUrl: "gallery.less",
  imports: [EmblaCarouselDirective, TuiButton, TuiPager],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGalleryComponent {
  public readonly items = input.required<AppGalleryCarouselItem[]>();

  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly emblaRef = viewChild(EmblaCarouselDirective);
  protected readonly carouselScrollSnapLength = signal(0);
  protected readonly carouselSelectedScrollSnap = signal(0);

  protected handleEmblaChange() {
    const api = this.emblaRef()?.emblaApi;
    if (!api) return;
    this.carouselScrollSnapLength.set(api.scrollSnapList().length);
    this.carouselSelectedScrollSnap.set(api.selectedScrollSnap());
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
