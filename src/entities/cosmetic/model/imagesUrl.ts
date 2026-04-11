const API_URL = "https://xn--80abcjepbp1bfe2q.xn--p1ai/api";

export function getImageUrlById(imageId: string) {
  return `${API_URL}/v1/image/${imageId}`;
}
