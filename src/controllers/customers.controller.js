import { OK } from 'http-status';
import ResponseService from '../services/response.service';
import CustomerService from '../services/customer.service';
import logger from '../utils/logger';

const customerLogger = logger('customers');

/**
 * Customer controller class
 */
class CustomerController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} get customers
   */
  static async getCustomers(req, res, next) {
    try {
      const { body } = req;
      const customers = await CustomerService.findCustomers(body);
      customerLogger.info(customers);
      return ResponseService.handleSuccessResponse(
        OK,
        'Customers',
        customers,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerController;
