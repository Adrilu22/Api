import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { estudiantesRouter } from './routers/estudianteRouter';
import { asignaturaRouter } from './routers/asignaturaRouter';
import { profesorRouter } from './routers/profesorRouter';
import { imparteRouter } from './routers/imparteRouter'; 
import { inscribeRouter } from './routers/inscribeRouter'; 
import { db } from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200).send('Hola a todos esta es mi api');
});

app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/asignaturas', asignaturaRouter);
app.use('/api/profesores', profesorRouter);
app.use('/api/imparte', imparteRouter);
app.use('/api/inscribe', inscribeRouter); 

app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'Not found', message: 'URL not found' });
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error');
  } else {
    console.log('Database connected');
  }
});

app.listen(process.env.PORT, () => {
  console.log('Node server started running');
  console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});



