import { request } from 'express';
import multer from 'multer';
import path from 'path';

//Exportando um objeto com varias configuracoes
export default {
  //Criando a configuracao para que as imagens sejam salvas no diretorio uploads 
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..','uploads'),
    filename: (request, file, cb) => {
      //Sera feita essa configuracao para quando duas pessoas fizerem o upload da mesma foto nao sobressaia o nome uma na outra
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  })

}