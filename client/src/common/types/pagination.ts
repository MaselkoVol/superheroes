export type PaginationControl = {
  page: number;
  limit: number;
  total: number;
  onPageChanged: (page: number) => void;
};
