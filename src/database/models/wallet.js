const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Wallet model class
   */
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Object} models
     * @returns {Promise} Promise
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer',
      });
    }
  }
  Wallet.init(
    {
      customerId: DataTypes.INTEGER,
      balance: DataTypes.DECIMAL(20, 5),
    },
    {
      sequelize,
      modelName: 'Wallet',
      schema: 'financial',
      tableName: 'wallets',
    },
  );
  return Wallet;
};
