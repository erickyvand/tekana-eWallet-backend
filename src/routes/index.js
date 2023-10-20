import express from 'express';
import AppController from '../controllers/app.controller';
import authRoute from './auth.route';
import financialRoute from './financial.route';
import customerRoute from './cuctomer.route';

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/financials', financialRoute);
app.use('/api/customers', customerRoute);

app.get('/', AppController.landRoute);
app.use('/', AppController.notFoundRoute);

export default app;
