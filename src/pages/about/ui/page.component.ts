import { Component } from "@angular/core";
import { TuiLink } from "@taiga-ui/core";

import { DOCUMENT_FOOTER, DOCUMENTS } from "@/pages/about/config";
import { AppCalloutComponent } from "@/shared/ui/callout";
import {
  AppGalleryCarouselItem,
  AppGalleryComponent,
} from "@/shared/ui/gallery";

@Component({
  selector: "app-about-page",
  imports: [AppCalloutComponent, AppGalleryComponent, TuiLink],
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
})
export class AppAboutPageComponent {
  protected readonly documents = DOCUMENTS;
  protected readonly document_footer = DOCUMENT_FOOTER;

  protected readonly gallery: AppGalleryCarouselItem[] = [
    [
      {
        src: "/assets/about-our-center.jpg",
      },
      {
        src: "/assets/cosmetics-catalog.jpg",
      },
    ],
    {
      src: "/assets/medical-leech-wholesale.jpg",
      large: true,
    },
    {
      src: "/assets/about-our-center.jpg",
    },
    [
      {
        src: "/assets/cosmetics-catalog.jpg",
      },
      {
        src: "/assets/medical-leech-wholesale.jpg",
      },
    ],
    {
      src: "/assets/about-our-center.jpg",
      large: true,
    },
  ];
}
