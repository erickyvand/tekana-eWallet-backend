import { INTERNAL_SERVER_ERROR } from 'http-status';
import logger from '../utils/logger';
import ResponseService from '../services/response.service';

const errorLogger = logger('catch');

export default (error, req, res, next) => {
  const status = error.response ? error.response.status : INTERNAL_SERVER_ERROR;
  const message = error.response ? error.response.data : error.message;
  if (status === 500) {
    console.log(error);
    errorLogger.error(message);
    return ResponseService.handleErrorResponse(status, message, res);
  }
  console.log(error);
  errorLogger.error(message);
  return res.status(status).send(message);
};
