import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Headers,
  Patch,
  Param,
  ParseUUIDPipe,
  //SetMetadata,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto, LoginUserDto, ChangeRolesAndStatusDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders } from '../common/decorators/raw-headers.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import {
  Auth,
  RoleProctected,
  ApiLoginResponse,
  ApiRegisterResponse,
  ApiCheckStatusResponse,
  ApiChangeRolesAndStatusResponse,
} from './decorators';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegisterResponse()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Get('login')
  @ApiLoginResponse()
  loginUser(@Query() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiCheckStatusResponse()
  checkStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
  }

  @Patch('change-roles-and-status/:userId')
  @Auth(ValidRoles.admin)
  @ApiChangeRolesAndStatusResponse()
  changeRolesAndStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() changeRolesAndStatusDto: ChangeRolesAndStatusDto,
  ) {
    return this.authService.changeRolesAndStatus(
      userId,
      changeRolesAndStatusDto,
    );
  }

  //! The following endpoints are examples.

  @ApiExcludeEndpoint()
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') user2: User,
    @RawHeaders() rawHeaders: string[], // Similar to the @Headers decorator but without formatting as an object or Json
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return { user, user2, rawHeaders, headers };
  }

  @ApiExcludeEndpoint()
  @Get('private2')
  //@SetMetadata('roles', ['admin', 'super-user'])
  @RoleProctected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: User) {
    return { user };
  }

  @ApiExcludeEndpoint()
  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  testingPrivateRoute3(@GetUser() user: User) {
    return { user };
  }
}
