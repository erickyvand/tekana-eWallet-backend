import { Router } from 'express';
import FinancialController from '../controllers/financial.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import FinancialValidation from '../validations/financial.validation';
import CustomerMiddleware from '../middlewares/customer.middlware';
import FinancialMiddleware from '../middlewares/financial.middleware';
import CustomerValidation from '../validations/customer.validation';

const router = Router();

router.post(
  '/transactions',
  authorizationMiddleware,
  validationMiddleware(FinancialValidation.validateTransaction),
  CustomerMiddleware.checkCustomerExistById,
  CustomerMiddleware.checkSameCustomer,
  FinancialMiddleware.checkBalance,
  FinancialController.transaction,
);

router.post(
  '/entries',
  authorizationMiddleware,
  validationMiddleware(FinancialValidation.validateEntry),
  CustomerMiddleware.checkCustomerExistById,
  CustomerMiddleware.checkSameCustomer,
  FinancialController.entry,
);

router.get(
  '/aggregations',
  authorizationMiddleware,
  FinancialController.accountEntryAggregations,
);

router.get(
  '/aggregations/receiver',
  authorizationMiddleware,
  FinancialController.receiverAggregations,
);

router.get(
  '/aggregations/sender',
  authorizationMiddleware,
  FinancialController.senderAggregations,
);

router.post(
  '/wallets',
  authorizationMiddleware,
  validationMiddleware(FinancialValidation.validateWalletFilters),
  FinancialController.getWallets,
);

router.post(
  '/find/transactions',
  authorizationMiddleware,
  validationMiddleware(CustomerValidation.validateCustomersFilters),
  FinancialController.getTransactions,
);

export default router;
