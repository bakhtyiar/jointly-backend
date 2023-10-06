import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Defining status code, message, name of error
    const status = Number(exception.code);
    const message = exception.cause.message;
    const name = exception.cause.name;
    console.log('==============ОШИБКА CРАБОТАЛА');

    // Sending error
    response.status(status).json({
      statusCode: status,
      message: message,
      error: name,
    });
  }
}
