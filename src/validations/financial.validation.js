import Joi from 'joi';
import Utils from '../utils';

/**
 * Financial validation class
 */
class FinancialValidation {
  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateTransaction(body) {
    const schema = Joi.object({
      receiverId: Joi.number().integer().required(),
      amount: Joi.number().greater(0).required(),
      reason: Joi.string().trim().optional(),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }

  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateEntry(body) {
    const schema = Joi.object({
      customerId: Joi.number().integer().required(),
      amount: Joi.number().greater(0).required(),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }

  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateWalletFilters(body) {
    const schema = Joi.object({
      names: Joi.string().trim().optional(),
      username: Joi.string().trim().optional(),
      page: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional(),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
}

export default FinancialValidation;
