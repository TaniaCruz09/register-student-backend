import { v4 as uuid } from 'uuid';

export const fileName = (req, file: Express.Multer.File, callback) => {
  if (!file) return callback(new Error('Archivo vacio'), false);

  const fileExtension = file.mimetype.split('/')[1];
  //renombrando el archivo
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
