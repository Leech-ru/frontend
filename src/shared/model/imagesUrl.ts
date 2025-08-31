const IMAGE_API_URL = "/api/v1/image";

export function getImageUrlById(imageId: string) {
  return `${IMAGE_API_URL}/${imageId}`;
}
