const entriesTable = {
  schema: 'financial',
  tableName: 'accountentries',
};

const customersTable = {
  schema: 'authentication',
  tableName: 'customers',
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(entriesTable, {
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
          model: customersTable,
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      createdById: {
        type: Sequelize.INTEGER,
        references: {
          model: customersTable,
          key: 'id',
        },
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable(entriesTable);
  },
};
