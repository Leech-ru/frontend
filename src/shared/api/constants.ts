import { Pagination } from "./types";

export const EMPTY_PAGINATION: Pagination = {
  current_page: 0,
  has_next: false,
  has_previous: false,
  total_items: 0,
  total_pages: 0,
};
