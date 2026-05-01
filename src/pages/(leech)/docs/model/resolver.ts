import {
  DEFAULT_LEECH_DOC_SLUG,
  type LeechDoc,
  LeechDocsService,
} from "@/entities/leech-docs";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

export const leechDocResolver: ResolveFn<LeechDoc | null> = (route) => {
  const slug = route.paramMap.get("slug") ?? DEFAULT_LEECH_DOC_SLUG;

  return inject(LeechDocsService).getDoc(slug);
};
