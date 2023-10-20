const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Receiver Aggregation
   */
  class ReceiverAggregation extends Model {
    /**
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      // define association here
    }
  }
  ReceiverAggregation.init(
    {
      receiverId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      totalAmount: DataTypes.DECIMAL,
    },

    {
      sequelize,
      schema: 'financial',
      tableName: 'receiveraggregations',
      modelName: 'ReceiverAggregation',
      timestamps: false,
    },
  );

  ReceiverAggregation.removeAttribute('id');
  return ReceiverAggregation;
};
