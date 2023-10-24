const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Sender Aggregation
   */
  class SenderAggregation extends Model {
    /**
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      // define association here
    }
  }
  SenderAggregation.init(
    {
      senderId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      totalAmount: DataTypes.DECIMAL,
    },

    {
      sequelize,
      schema: 'financial',
      tableName: 'senderaggregations',
      modelName: 'SenderAggregation',
      timestamps: false,
    },
  );

  SenderAggregation.removeAttribute('id');
  return SenderAggregation;
};
