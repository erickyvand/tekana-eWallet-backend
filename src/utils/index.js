import _ from 'lodash';

/**
 *  Utility
 */
class Utils {
  /**
   * joi default options
   * @return {Object} default joi options
   */
  static joiDefaultOptions() {
    return {
      abortEarly: false,
      errors: {
        wrap: {
          label: '',
        },
      },
    };
  }

  /**
   * Pagination
   * @returns {String} string
   */
  static paginate({ count, rows, limit, offset }) {
    return {
      totalPages: Math.ceil(count / limit),
      totalOnPage: rows.length,
      currentPage: Math.floor(offset / limit),
      totalCount: count,
    };
  }

  /**
   * Initial page
   * @param {Object} body
   * @returns {String} string
   */
  static startPage(body) {
    return _.get(body, 'page', 0);
  }

  /**
   * Limit per page
   * @param {Object} body
   * @returns {String} string
   */
  static limit(body) {
    return _.get(body, 'limit', 10);
  }

  /**
   * Order by
   * @param {Object} body
   * @returns {String} string
   */
  static order(body) {
    const orderBy = _.get(body, 'orderBy', 'id');
    const orderType = _.get(body, 'orderType', 'ASC');

    return [[orderBy, orderType]];
  }
}

export default Utils;
