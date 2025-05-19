import { RoutePath } from "@/app/@x/route";

export interface HomePageCard {
  thumbnail: string;
  heading: string;
  description: string;
  action: string;
  link: RoutePath;
  fluid?: boolean | null | undefined;
}
