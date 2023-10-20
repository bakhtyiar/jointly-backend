import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private app: INestApplication;

  constructor() {}

  setAppInstance(app: INestApplication) {
    this.app = app;
  }

  getHello(): string {
    return 'Hello World!';
  }

  getControllers() {
    const server = this.app.getHttpServer();
    return server._events.request._router;
  }
}
