const Sequelize = require('sequelize');


module.exports = new Sequelize('codegig', 'postgres', 'sql', {
    host: 'localhost',
    dialect:  'postgres'
  });
