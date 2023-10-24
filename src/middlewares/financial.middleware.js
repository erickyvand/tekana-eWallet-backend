import { FORBIDDEN } from 'http-status';
import FinancialService from '../services/financial.service';
import ResponseService from '../services/response.service';

/**
 * Financial Middleware class
 */
class FinancialMiddleware {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} Check sender balance
   */
  static async checkBalance(req, res, next) {
    try {
      const { userData, body } = req;
      const { amount } = body;

      const wallet = await FinancialService.findWallet({
        customerId: userData.id,
      });

      const balance = wallet?.balance || 0;

      if (amount > balance) {
        return ResponseService.handleErrorResponse(
          FORBIDDEN,
          `Insuficient amount. Balance (${balance}), Amount to send (${amount})`,
          res,
        );
      }
      req.balance = balance;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default FinancialMiddleware;
