import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';
import { SeedDto } from './dto/seed.dto';
import { ApiSeedResponse } from './decorators/seed-response';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiSeedResponse()
  executedSeed(@Query() seedDto: SeedDto) {
    return this.seedService.runSeed(seedDto);
  }
}
