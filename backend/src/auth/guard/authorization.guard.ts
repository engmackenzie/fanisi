import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/common/decorators/permission.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  // eslint-disable-next-line no-unused-vars
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get the necessary permission
    const requiredPermission = this.reflector.getAllAndOverride<Permissions>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    // allow access to non-protected endpoints
    if (!requiredPermission) return true;
    console.log(requiredPermission)

    const { user } = context.switchToHttp().getRequest();
    // check if required permission is present in user permissions
    // allow admin to access all
    if (user.is_admin) return true;
    if (!user.permissions || !user.permissions.includes(requiredPermission[0])) return false;
    return true;
  }
}
