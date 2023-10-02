import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileFilterCallback } from 'multer';
import mime from 'mime';

export const fileFilter: MulterOptions['fileFilter'] = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (mime.lookup(file.mimetype)) {
    // Accept recognised file types
    cb(null, true);
  } else {
    // Else decline
    cb(null, false);
  }
};
