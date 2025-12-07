const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const College = sequelize.define("College", {
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = College;
