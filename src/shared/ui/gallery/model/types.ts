export type AppGalleryCarouselDefaultPhoto = {
  src: string;
};

export type AppGalleryCarouselLargePhoto = AppGalleryCarouselDefaultPhoto & {
  large: true;
};

export type AppGalleryCarouselPhoto =
  | AppGalleryCarouselDefaultPhoto
  | AppGalleryCarouselLargePhoto;

export type AppGalleryCarouselPhotoGroup = [
  AppGalleryCarouselDefaultPhoto,
  AppGalleryCarouselDefaultPhoto,
];

export type AppGalleryCarouselItem =
  | AppGalleryCarouselPhoto
  | AppGalleryCarouselPhotoGroup;
