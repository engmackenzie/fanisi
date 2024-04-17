import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const AllowAnon = () => SetMetadata(IS_PUBLIC_KEY, true);
export const DisableAnon = () => SetMetadata(IS_PUBLIC_KEY, false);
