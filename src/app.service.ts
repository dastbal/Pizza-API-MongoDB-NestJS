import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
  // constructor(private configService: ConfigService) { }
  // getHello(): string {
  //   return `${this.configService.get<string>('DATABASE_NAME')}`;
  // };
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    return `Hello -> ${this.configService.database.name}`;
  }
  getTasks() {
    const taskcollection = this.database.collection('tasks');
    return taskcollection.find().toArray();
  }
}
