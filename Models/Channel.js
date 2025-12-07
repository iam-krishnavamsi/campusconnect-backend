const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Channel = sequelize.define("Channel", {
  name: { type: DataTypes.STRING, allowNull: false },
  isAnnouncement: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Channel;
