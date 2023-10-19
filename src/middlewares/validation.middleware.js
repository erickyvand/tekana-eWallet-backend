import { UNPROCESSABLE_ENTITY } from 'http-status';
import ResponseService from '../services/response.service';

/**
 * creates errors that will be added to the request response
 * @param {Object} joiError  joi error object
 * @param {Boolean} withFields   wether errors should be mapped with fields in output
 * @returns {Object} middleware response body
 */
function errorMessages(joiError, withFields) {
  if (withFields) {
    const errors = {};
    // build errors object keys
    joiError.details.forEach((error) => {
      if (!errors[error.context.key]) {
        errors[error.context.key] = [];
      }
    });
    //  add errors to object keys
    joiError.details.forEach((error) => {
      errors[error.context.key].push(error.message);
    });
    return errors;
  }
  return joiError.details.map((e) => e.message);
}

export default (validator, withFields = false) => {
  return async (req, res, next) => {
    try {
      const validate = await validator(req.body);
      if (validate.error) {
        return ResponseService.handleErrorResponse(
          UNPROCESSABLE_ENTITY,
          errorMessages(validate.error, withFields),
          res,
        );
      } else {
        req.body = validate.value;
        next();
      }
    } catch (err) {
      next(err);
    }
  };
};
