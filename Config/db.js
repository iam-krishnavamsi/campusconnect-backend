const { Sequelize } = require("sequelize");
const fs = require("fs");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true
      }
    },
    logging: false,
  }
);

module.exports = sequelize;
