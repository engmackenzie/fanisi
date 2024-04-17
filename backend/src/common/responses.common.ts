import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from './pagination/pagination';

export class SingleObjectResponse {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty()
  data: any;

  constructor(data) {
    this.success = true;
    this.data = data;
  }
}

export class MultipleObjectsResponse {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty()
  data: any[];
  @ApiProperty()
  pagination: Pagination;

  constructor(data, pagination) {
    this.success = true;
    this.data = data;
    this.pagination = pagination;
  }
}

export class MsgResponse {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ example: 'Item created/updated/deleted successfully' })
  message: string;

  constructor(message) {
    this.success = true;
    this.message = message;
  }
}
