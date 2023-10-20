import { Router } from 'express';
import CustomerController from '../controllers/customers.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import CustomerValidation from '../validations/customer.validation';

const router = Router();

router.post(
  '/',
  authorizationMiddleware,
  validationMiddleware(CustomerValidation.validateCustomersFilters),
  CustomerController.getCustomers,
);

export default router;
