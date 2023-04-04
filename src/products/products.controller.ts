import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import {
  ApiProductResponse,
  ApiFindAllResponse,
  ApiDeleteUpdateResponse,
  ApiFindOneResponse,
} from './decorators/product-response.decorator';

@ApiTags('Products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiProductResponse()
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiFindAllResponse()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiFindOneResponse()
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  @Auth()
  @ApiDeleteUpdateResponse('updated')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update({ id, user, updateProductDto });
  }

  @Delete(':id')
  @Auth()
  @ApiDeleteUpdateResponse('deleted')
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.productsService.remove(id, user);
  }
}
