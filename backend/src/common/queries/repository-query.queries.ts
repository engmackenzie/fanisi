import { FindManyOptions, LessThan, MoreThanOrEqual } from 'typeorm';
import { HttpException } from '@nestjs/common';

export class RepositoryQuery {
  public static createRepoQuery(query): FindManyOptions {
    try {
      const { start_date, end_date, page, limit, order, order_by, ...where } =
        query;

      const options: FindManyOptions = {};

      // main where options
      if (where) options.where = where;

      // dates change to isoString and add start of day to start_date
      if (start_date)
        options.where = {
          ...options.where,
          created_at: MoreThanOrEqual(
            new Date(new Date(start_date).setHours(0, 0, 0, 0)).toISOString(),
          ),
        };

      if (end_date)
        options.where = {
          ...options.where,
          created_at: LessThan(
            new Date(
              new Date(end_date).setHours(23, 59, 59, 9999),
            ).toISOString(),
          ),
        };

      // pagination options
      options.skip = page ? Math.abs(Number(page) - 1) * (limit || 50) : 0;
      options.take = limit ? Math.abs(Number(limit)) : 50;

      // Ensure order is either 'ASC' or 'DESC'
      options.order = {
        [order_by ? order_by : 'created_at']: this.validateOrder(order),
      };

      return options;
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating the query',
        500,
      );
    }
  }

  private static validateOrder(order: string): 'ASC' | 'DESC' {
    if (order === 'ASC' || order === 'DESC') {
      return order as 'ASC' | 'DESC';
    }
    // If order is not 'ASC' or 'DESC', default to 'DESC'
    return 'DESC' as 'ASC' | 'DESC';
  }
}
