const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Account Entries Aggregation
   */
  class AccountEntriesAggregation extends Model {
    /**
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      // define association here
    }
  }
  AccountEntriesAggregation.init(
    {
      customerId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      totalAmount: DataTypes.DECIMAL,
    },

    {
      sequelize,
      schema: 'financial',
      tableName: 'accountentriesaggregations',
      modelName: 'AccountEntriesAggregation',
      timestamps: false,
    },
  );

  AccountEntriesAggregation.removeAttribute('id');
  return AccountEntriesAggregation;
};
