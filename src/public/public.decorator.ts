import { SetMetadata } from '@nestjs/common';
import { configKeys } from '@src/config/configuration';
import { ConfigService } from '@nestjs/config';

export const IS_PUBLIC_KEY = new ConfigService().get(configKeys.IS_PUBLIC_KEY);
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
