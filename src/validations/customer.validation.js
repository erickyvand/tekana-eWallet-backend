import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import Utils from '../utils';

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};
/**
 * Customer validation class
 */
class CustomerValidation {
  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateCustomerRegistration(body) {
    const schema = Joi.object({
      firstName: Joi.string().trim().min(2).required(),
      lastName: Joi.string().trim().min(2).required(),
      password: passwordComplexity(complexityOptions, 'Password')
        .trim()
        .replace(/\s+/g, '')
        .required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }

  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateCustomerLogin(body) {
    const schema = Joi.object({
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }

  /**
   * @param {Object} body
   * @returns {Object} Object
   */
  static validateCustomersFilters(body) {
    const schema = Joi.object({
      names: Joi.string().trim().optional(),
      username: Joi.string().trim().optional(),
      page: Joi.number().integer().optional(),
      limit: Joi.number().integer().optional(),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
}

export default CustomerValidation;
