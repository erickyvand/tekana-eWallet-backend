const walletsTable = {
  schema: 'financial',
  tableName: 'wallets',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(walletsTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'authentication',
            tableName: 'customers',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      balance: {
        type: Sequelize.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(walletsTable);
  },
};
