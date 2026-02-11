import type { H3Event } from "h3";

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Extract pagination parameters from query string
 */
export function getPaginationParams(event: H3Event): PaginationParams {
  const query = getQuery(event);

  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;
  const search = query.search as string | undefined;
  const status = query.status as string | undefined;

  return { page, limit, skip, search, status };
}

/**
 * Create a paginated response object
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
