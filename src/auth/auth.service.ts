import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto, ChangeRolesAndStatusDto } from './dto';
import { User } from './entities/user.entity';
import { Helper } from '../common/helper/helper';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ValidRoles } from './interfaces';

@Injectable()
export class AuthService {
  private helper = new Helper('AuthService');
  private secret: string;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow('SECRET');
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      if (createUserDto.secret === this.secret) user.roles = [ValidRoles.admin];

      await this.userRepository.save(user);
      delete user.password;
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.helper.handleDBExceptions(error);
    }
  }

  async changeRolesAndStatus(
    userId: string,
    changeRolesAndStatusDto: ChangeRolesAndStatusDto,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user)
      throw new BadRequestException(`User with id '${userId}' not found`);

    const updateUser = this.userRepository.create({
      ...user,
      ...changeRolesAndStatusDto,
    });

    return await this.userRepository.save(updateUser);
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['email', 'password', 'id', 'isActive'],
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return {
      id: user.id,
      email: user.email,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}
