import _ from 'lodash';
import { Op, Sequelize } from 'sequelize';
import models from '../database/models';
import Utils from '../utils';

const {
  Transaction,
  AccountEntry,
  AccountEntriesAggregation,
  ReceiverAggregation,
  Wallet,
  Customer,
  SenderAggregation,
} = models;

/**
 * Financial service class
 */
class FinancialService {
  /**
   * @param {Object} data
   * @returns {Object} create record in transaction table
   */
  static createTransaction(data) {
    return Transaction.create(data);
  }

  /**
   * @param {Object} data
   * @returns {Object} create record in acount entry table
   */
  static createEntry(data) {
    return AccountEntry.create(data);
  }

  /**
   * @returns {Object} find records in account aggregation view
   */
  static findAccountEntryAggregations() {
    return AccountEntriesAggregation.findAll();
  }

  /**
   * @returns {Object} find record in account aggregation view
   */
  static receiverAggregations() {
    return ReceiverAggregation.findAll();
  }

  /**
   * @returns {Object} find record in account aggregation view
   */
  static senderAggregations() {
    return SenderAggregation.findAll();
  }

  /**
   * @param {integer} attribute
   * @returns {Object} find record in account aggregation view
   */
  static findAccountEntryAggregation(attribute) {
    return AccountEntriesAggregation.findOne({ where: attribute });
  }

  /**
   * @param {integer} attribute
   * @returns {Object} find record in account aggregation view
   */
  static receiverAggregation(attribute) {
    return ReceiverAggregation.findOne({ where: attribute });
  }

  /**
   * @param {integer} attribute
   * @returns {Object} find record in account aggregation view
   */
  static senderAggregation(attribute) {
    return SenderAggregation.findOne({ where: attribute });
  }

  /**
   * @param {Object} condition
   * @param {Object} attribute
   * @returns {Object} update record in wallet table
   */
  static updateWallet(condition, attribute) {
    return Wallet.update(attribute, { where: condition, returning: true });
  }

  /**
   * @param {Object} body
   * @param {Object} attribute
   * @returns {Object} find records in wallet table
   */
  static async findWallets(body) {
    const page = Utils.startPage(body);
    const limit = Utils.limit(body);
    const offset = page * limit;

    const names = _.get(body, 'names', null);
    const username = _.get(body, 'username', null);

    const queryConditions = {
      limit,
      offset,
      order: Utils.order(body),
      include: {
        model: Customer,
        as: 'customer',
        attributes: ['id', 'firstName', 'lastName', 'username'],
      },
    };

    if (names != null) {
      queryConditions.where = {
        ...queryConditions.where,
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('customer.firstName'),
              ' ',
              Sequelize.col('customer.lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('customer.firstName'),
              ' ',
              Sequelize.col('customer.lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
        ],
      };
    }

    if (username != null) {
      queryConditions.where = {
        ...queryConditions.where,
        '$customer.username$': {
          [Op.iLike]: `${username}%`,
        },
      };
    }

    const results = await Wallet.findAndCountAll(queryConditions);
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

  /**
   * @param {Object} attribute
   * @returns {Object} find records in wallet table
   */
  static findWallet(attribute) {
    return Wallet.findOne({ where: attribute });
  }

  /**
   * @param {Object} body
   * @param {Object} attribute
   * @returns {Object} find records in transaction table
   */
  static async findTransactions(body) {
    const page = Utils.startPage(body);
    const limit = Utils.limit(body);
    const offset = page * limit;

    const attributes = ['id', 'firstName', 'lastName', 'username'];

    const names = _.get(body, 'names', null);
    const username = _.get(body, 'username', null);

    const queryConditions = {
      limit,
      offset,
      order: Utils.order(body),
      include: [
        {
          model: Customer,
          as: 'sender',
          attributes,
        },
        {
          model: Customer,
          as: 'receiver',
          attributes,
        },
      ],
    };

    if (names != null) {
      queryConditions.where = {
        ...queryConditions.where,
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('sender.firstName'),
              ' ',
              Sequelize.col('sender.lastName'),
            ),
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('receiver.firstName'),
              ' ',
              Sequelize.col('receiver.lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
          Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('sender.firstName'),
              ' ',
              Sequelize.col('sender.lastName'),
            ),
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('receiver.firstName'),
              ' ',
              Sequelize.col('receiver.lastName'),
            ),
            { [Op.iLike]: `%${names}%` },
          ),
        ],
      };
    }

    if (username != null) {
      queryConditions.where = {
        ...queryConditions.where,
        '$sender.username$': {
          [Op.iLike]: `${username}%`,
        },
      };
    }

    const results = await Transaction.findAndCountAll(queryConditions);
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

export default FinancialService;
