import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import CustomerValidation from '../validations/customer.validation';
import CustomerMiddleware from '../middlewares/customer.middlware';

const router = Router();

router.post(
  '/register',
  validationMiddleware(CustomerValidation.validateCustomerRegistration),
  CustomerMiddleware.checkCustomerExist,
  AuthController.register,
);
router.post(
  '/login',
  validationMiddleware(CustomerValidation.validateCustomerLogin),
  CustomerMiddleware.checkCustomerCredentials,
  AuthController.login,
);

export default router;
