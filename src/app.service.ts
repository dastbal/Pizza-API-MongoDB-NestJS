import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  // constructor(private configService: ConfigService) { }
  // getHello(): string {
  //   return `${this.configService.get<string>('DATABASE_NAME')}`;
  // };
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) { }
  getHello(): string {
    return `${process.env.API_KEY || this.configService.apiKey} name ${process.env.DATABASE_NAME || this.configService.database.name}`;
  }
}
