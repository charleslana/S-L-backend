import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import routes from './routes';
import { database } from './database/database';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  })
);

app.use(routes);

app.use(errors());

app.use(errorMiddleware);

app.use((_request: Request, response: Response) => {
  return response.status(404).json({
    message: 'Rota não encontrada',
  });
});

app.listen(3000, async () => {
  await database.sync();
  console.log('App running on 3000!');
});
