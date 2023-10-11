// src/database/database.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigType } from '@nestjs/config';
import appConfig from '../config/app.config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(
    @Inject(appConfig.KEY) private configService: ConfigType<typeof appConfig>,
  ) {
    this.pool = new Pool(this.configService.database);
  }

  query(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params);
  }
}
