import { CREATED, OK } from 'http-status';
import ResponseService from '../services/response.service';
import FinancialService from '../services/financial.service';
import logger from '../utils/logger';

const financialLogger = logger('financials');

const calculateBalance = async (customerId) => {
  const entryAggr = await FinancialService.findAccountEntryAggregation({
    customerId,
  });

  const receiver = await FinancialService.receiverAggregation({
    receiverId: customerId,
  });

  const sender = await FinancialService.senderAggregation({
    senderId: customerId,
  });
  const accountEntry = entryAggr?.totalAmount || 0;
  const transReceiver = receiver?.totalAmount || 0;
  const transSender = sender?.totalAmount || 0;

  const actualBalance = accountEntry - transSender + transReceiver;
  return actualBalance;
};

/**
 * Financial controller class
 */
class FinancialController {
  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async transaction(req, res, next) {
    try {
      const { body, userData } = req;
      const senderId = userData.id;
      const transaction = { ...body, senderId };

      const results = await FinancialService.createTransaction(transaction);

      const actualBalance = await calculateBalance(userData.id);

      await FinancialService.updateWallet(
        { customerId: senderId },
        {
          balance: actualBalance,
        },
      );
      financialLogger.info(results);
      return ResponseService.handleSuccessResponse(
        CREATED,
        'Transaction created',
        results,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async entry(req, res, next) {
    try {
      const { body, userData } = req;
      const { customerId } = body;
      const entry = { ...body, createdById: userData.id };

      const results = await FinancialService.createEntry(entry);

      const actualBalance = await calculateBalance(customerId);

      await FinancialService.updateWallet(
        { customerId },
        {
          balance: actualBalance,
        },
      );

      financialLogger.info(results);
      return ResponseService.handleSuccessResponse(
        CREATED,
        'Account entry created',
        results,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async accountEntryAggregations(req, res, next) {
    try {
      const aggregations =
        await FinancialService.findAccountEntryAggregations();

      financialLogger.info(aggregations);
      return ResponseService.handleSuccessResponse(
        OK,
        'Account entry aggregations',
        aggregations,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async receiverAggregations(req, res, next) {
    try {
      const aggregations = await FinancialService.receiverAggregations();

      financialLogger.info(aggregations);
      return ResponseService.handleSuccessResponse(
        OK,
        'Receiver aggregations',
        aggregations,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async senderAggregations(req, res, next) {
    try {
      const aggregations = await FinancialService.senderAggregations();

      financialLogger.info(aggregations);
      return ResponseService.handleSuccessResponse(
        OK,
        'Sender aggregations',
        aggregations,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async accountEntryAggregation(req, res, next) {
    try {
      const { userData } = req;

      const aggregation = await FinancialService.findAccountEntryAggregations({
        customerId: userData.id,
      });

      financialLogger.info(aggregation);
      return ResponseService.handleSuccessResponse(
        OK,
        'Account entry aggregation',
        aggregation,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async getWallets(req, res, next) {
    try {
      const { body } = req;

      const wallets = await FinancialService.findWallets(body);

      financialLogger.info(wallets);
      return ResponseService.handleSuccessResponse(OK, 'Wallets', wallets, res);
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async getTransactions(req, res, next) {
    try {
      const { body } = req;

      const transactions = await FinancialService.findTransactions(body);

      financialLogger.info(transactions);
      return ResponseService.handleSuccessResponse(
        OK,
        'Transactions',
        transactions,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}

export default FinancialController;
