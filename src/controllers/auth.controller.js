import { CREATED } from 'http-status';
import _ from 'lodash';
import ResponseService from '../services/response.service';
import BcryprService from '../services/bcrypt.service';
import CustomerService from '../services/customer.service';
import TokenService from '../services/token.service';
import logger from '../utils/logger';

const authLogger = logger('auth');

/**
 * Auth controller class
 */
class AuthController {
  /**
   * * Registration
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async register(req, res, next) {
    try {
      const { body } = req;
      const { firstName, lastName, password } = body;

      const customerBody = _.omit(
        {
          ...body,
          username: `${firstName}.${lastName}`.toLowerCase(),
          password: BcryprService.hashPassword(password),
        },
        'confirmPassword',
      );

      const results = await CustomerService.create(customerBody);

      const finalResults = _.omit(results.dataValues, 'password');
      authLogger.info(finalResults);
      return ResponseService.handleSuccessResponse(
        CREATED,
        'Customer created',
        finalResults,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * * Login
   * @param  {object} req
   * @param  {object} res
   * @param  {object} next
   * @returns {object} object
   */
  static async login(req, res, next) {
    try {
      const { customer } = req;
      const customerToken = TokenService.generateToken(customer);
      authLogger.info(customerToken);
      return ResponseService.handleSuccessResponse(
        CREATED,
        'Successfully loggedin',
        customerToken,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
