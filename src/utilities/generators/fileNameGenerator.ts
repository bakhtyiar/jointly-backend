import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const fileNameGenerator: MulterOptions['filename'] = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  // Generating random string
  const fileName: string = uuid();
  //Calling the callback passing the random name generated with the original extension name
  cb(null, `${fileName}${extname(file.originalname)}`);
};
