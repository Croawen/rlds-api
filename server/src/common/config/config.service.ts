import { Injectable } from '@nestjs/common';
import { Config } from './config.enum';

@Injectable()
export class ConfigService {
  private environmentHosting: string = process.env.NODE_ENV || 'development';

  get(name: Config): string {
    return process.env[name];
  }

  getNumber(name: Config): number {
    return Number.parseInt(process.env[name]);
  }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }
}
