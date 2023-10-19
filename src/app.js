import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import routes from './routes';
import configureSwagger from './swagger';

config();

const app = express();

app.use(cors());
configureSwagger(app);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

export default app;
