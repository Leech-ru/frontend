import {
  AppGalleryCarouselItem,
  AppGalleryComponent,
  AppHeroComponent,
} from "@/shared/ui";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiAppearance, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { DOCUMENT_FOOTER, DOCUMENTS } from "../config";

@Component({
  selector: "app-about-page",
  imports: [
    AppGalleryComponent,
    AppHeroComponent,
    TuiCardLarge,
    TuiTitle,
    TuiHeader,
    TuiAvatar,
    TuiAppearance,
  ],
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAboutPageComponent {
  protected readonly documents = DOCUMENTS;
  protected readonly documentFooter = DOCUMENT_FOOTER;

  protected readonly gallery: AppGalleryCarouselItem[] = [
    [
      {
        src: "https://leech.ru/userfiles/O-centre78-b.jpg",
      },
      {
        src: "https://leech.ru/upload/news/en/0_72767700_1267998281.jpg",
      },
    ],
    {
      src: "https://leech.ru/upload/news/en/0_46061100_1267816724.jpg",
      large: true,
    },
    {
      src: "https://leech.ru/userfiles/O-centre78-b.jpg",
    },
    [
      {
        src: "https://leech.ru/upload/news/en/0_72767700_1267998281.jpg",
      },
      {
        src: "https://leech.ru/upload/news/en/0_46061100_1267816724.jpg",
      },
    ],
    {
      src: "https://leech.ru/userfiles/O-centre78-b.jpg",
      large: true,
    },
  ];
}
