import _ from 'lodash';
import { Op, Sequelize } from 'sequelize';
import models from '../database/models';
import Utils from '../utils';

const { Customer, Wallet } = models;

/**
 * Customer service class
 */
class CustomerService {
  /**
   * @param {Object} attribute
   * @returns {Object} One record from customer table
   */
  static findOneByAttribute(attribute) {
    return Customer.findOne({ where: attribute });
  }

  /**
   * @param {Object} data
   * @returns {Object} create record in customer table
   */
  static create(data) {
    return models.sequelize.transaction(async (transaction) => {
      const customer = await Customer.create(data, { transaction });

      await Wallet.create({ customerId: customer.id }, { transaction });
      return customer;
    });
  }

  /**
   * @param {Object} id
   * @returns {Object} One record from customer table
   */
  static findOneById(id) {
    return Customer.findByPk(id);
  }

  /**
   * @param {Object} body
   * @param {Object} attribute
   * @returns {Object} find records in wallet table
   */
  static async findCustomers(body) {
    const page = Utils.startPage(body);
    const limit = Utils.limit(body);
    const offset = page * limit;

    const names = _.get(body, 'names', null);
    const username = _.get(body, 'username', null);

    const queryConditions = {
      limit,
      offset,
      order: Utils.order(body),
      attributes: ['id', 'firstName', 'lastName', 'username'],
    };

    if (names != null) {
      queryConditions.where = {
        ...queryConditions.where,
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('firstName'),
              ' ',
              Sequelize.col('lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('firstName'),
              ' ',
              Sequelize.col('lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
        ],
      };
    }

    if (username != null) {
      queryConditions.where = {
        ...queryConditions.where,
        username: {
          [Op.iLike]: `${username}%`,
        },
      };
    }

    const results = await Customer.findAndCountAll(queryConditions);
    return {
      pageMeta: Utils.paginate({
        count: results.count,
        rows: results.rows,
        limit,
        offset,
      }),
      rows: results.rows,
    };
  }
}

export default CustomerService;
