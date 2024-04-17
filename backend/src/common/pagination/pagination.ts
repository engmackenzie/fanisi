export class Pagination {
  private page: number;
  private limit: number;
  private count: number;
  private total_count: number;
  private order: string;
  private order_by: string;
  constructor(query, count, total_count) {
    this.page = query.page ? Math.abs(Number(query.page)) : 1;
    this.limit = query.limit ? Math.abs(Number(query.limit)) : 50;
    this.count = count;
    this.total_count = total_count;
    this.order = query.order ? query.order : 'DESC';
    this.order_by = query.order_by ? query.order_by : 'created_at';
  }

  public getTotalCount(): number {
    return this.total_count;
  }
}
