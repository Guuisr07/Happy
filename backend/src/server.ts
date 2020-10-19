import express, { response } from 'express';
import path from 'path'; //Para lidarmos com caminhos
import cors from 'cors';

import 'express-async-errors';
//importando a conexao com o banco para funcionar
import './database/connection';


import routes from './routes';
import errorHandler from './errors/handler'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//Usando o express para criar a rota que seja possivel a visualizacao da imagens na pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);



app.listen(3333);











