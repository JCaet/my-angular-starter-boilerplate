/** Wraps a single-item API response. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Wraps a paginated list API response. */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
