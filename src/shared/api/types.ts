export interface Pagination {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  total_items: number;
  total_pages: number;
}
