const query = `
  SELECT  "customerId", "firstName", "lastName", SUM(amount) "totalAmount"
  from financial.accountentries a
  JOIN authentication.customers c
  ON c.id = a."customerId"
  GROUP BY "customerId", "firstName", "lastName"	
`;

const view = 'financial.accountentriesaggregations';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${view} AS ${query};`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${view}`);
  },
};
