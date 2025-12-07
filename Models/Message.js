const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define("Message", {
  text: { type: DataTypes.STRING },
});

module.exports = Message;
