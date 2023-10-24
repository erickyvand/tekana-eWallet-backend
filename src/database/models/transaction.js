const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Customer model class
   */
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Object} models
     * @returns {Promise} Promise
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      Transaction.belongsTo(models.Customer, {
        foreignKey: 'receiverId',
        as: 'receiver',
      });
    }
  }
  Transaction.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(20, 5),
      reason: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transaction',
      schema: 'financial',
      tableName: 'transactions',
    },
  );
  return Transaction;
};
