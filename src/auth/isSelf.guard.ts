import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.id;
    const currentUser = request.user;
    return currentUser.userId === +userId;
  }
}