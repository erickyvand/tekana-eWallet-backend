const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Account Entry model class
   */
  class AccountEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Object} models
     * @returns {Promise} Promise
     */
    static associate(models) {
      // define association here
    }
  }
  AccountEntry.init(
    {
      customerId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(20, 5),
      createdById: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AccountEntry',
      schema: 'financial',
      tableName: 'accountentries',
    },
  );
  return AccountEntry;
};
