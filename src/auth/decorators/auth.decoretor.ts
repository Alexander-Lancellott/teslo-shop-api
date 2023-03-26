import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ValidRoles } from '../interfaces';
import { RoleProctected } from './role-proctected.decorator';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    RoleProctected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
