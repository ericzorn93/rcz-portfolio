import { ApiProperty } from '@nestjs/swagger';

export class UpdatedStockResponse {
  @ApiProperty()
  symbol: string;

  @ApiProperty()
  isUpdated: boolean;

  @ApiProperty()
  updatedTimestamp: string;
}
