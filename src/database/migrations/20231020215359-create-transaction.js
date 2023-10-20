const transactionsTable = {
  schema: 'financial',
  tableName: 'transactions',
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(transactionsTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            schema: 'authentication',
            tableName: 'customers',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            schema: 'authentication',
            tableName: 'customers',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      reason: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable(transactionsTable);
  },
};
