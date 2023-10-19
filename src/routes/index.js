import express from 'express';
import AppController from '../controllers/app.controller';
import authRoute from './auth.route';

const app = express();

app.use('/api/auth', authRoute);

app.get('/', AppController.landRoute);
app.use('/', AppController.notFoundRoute);

export default app;
