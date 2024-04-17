import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../constants/permissions.constants';

export const PERMISSION_KEY = 'permission';
export const Permission = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
