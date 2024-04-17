export class PaginationQuery {
  page: number;
  limit: number;
  order: 'ASC' | 'DESC';
  orderBy: string;
}
