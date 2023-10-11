import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    await next();

    const duration = Date.now() - startTime;

    setImmediate(() => {
      const logData = {
        request: {
          body: req.body,
          query: req.query,
          params: req.params,
          route: req.route.path,
        },
        response: {
          statusCode: res.statusCode,
        },
        duration,
      };
      console.log('log', logData);
      axios
        .post('http://localhost:8765/logging', logData)
        .catch((err) => console.error('Logging service error:'));
    });
  }
}
