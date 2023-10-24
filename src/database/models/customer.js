const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Customer model class
   */
  class Customer extends Model {
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
  Customer.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer',
      schema: 'authentication',
      tableName: 'customers',
    },
  );
  return Customer;
};
