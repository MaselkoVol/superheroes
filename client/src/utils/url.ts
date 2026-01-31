import { appConfig } from "../config";

export function getImageUrl(path: string) {
  return `${appConfig.baseUrl}/${path}`;
}
