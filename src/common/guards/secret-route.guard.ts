import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SecretRoute implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.Query);
    return true;
  }
}
