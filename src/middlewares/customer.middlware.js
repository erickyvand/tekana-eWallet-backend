import { CONFLICT, FORBIDDEN, NOT_FOUND } from 'http-status';
import _ from 'lodash';
import CustomerService from '../services/customer.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';

/**
 * Customer Middleware class
 */
class CustomerMiddleware {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} One record from customer table if found, null if not found
   */
  static async checkCustomerExist(req, res, next) {
    try {
      const { body } = req;
      const { firstName, lastName } = body;
      const username = `${firstName}.${lastName}`.toLowerCase();

      const customer = await CustomerService.findOneByAttribute({ username });

      if (customer) {
        return ResponseService.handleErrorResponse(
          CONFLICT,
          `Username (${username}) already taken`,
          res,
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} One record from customer table if found, null if not found
   */
  static async checkCustomerCredentials(req, res, next) {
    try {
      const { body } = req;
      const { username, password } = body;

      const customer = await CustomerService.findOneByAttribute({ username });

      if (
        !customer ||
        !BcryptService.comparePassword(password, customer.password)
      ) {
        return ResponseService.handleErrorResponse(
          FORBIDDEN,
          'Invalid credentials',
          res,
        );
      }
      const customerData = _.omit(customer.dataValues, 'password');
      req.customer = customerData;
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} One record from customer table if found, null if not found
   */
  static async checkCustomerExistById(req, res, next) {
    try {
      const { body } = req;
      const { receiverId, customerId } = body;

      const id = receiverId || customerId;

      const customer = await CustomerService.findOneById(id);

      if (!customer) {
        return ResponseService.handleErrorResponse(
          NOT_FOUND,
          `Custom with ID (${id}) not found`,
          res,
        );
      }
      req.customer = customer;
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} Check if sender is same as receiver
   */
  static async checkSameCustomer(req, res, next) {
    try {
      const { body, userData } = req;
      const { receiverId, customerId } = body;
      const { id: senderId } = userData;

      const id = receiverId || customerId;

      if (senderId === id) {
        return ResponseService.handleErrorResponse(
          FORBIDDEN,
          `Sender with ID (${senderId}) is the same as Receiver with ID (${id})`,
          res,
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerMiddleware;
