const User = require("./User");
const College = require("./College");
const Channel = require("./Channel");
const Message = require("./Message");

// Relations
College.hasMany(User);
User.belongsTo(College);

College.hasMany(Channel);
Channel.belongsTo(College);

User.hasMany(Message);
Message.belongsTo(User);

Channel.hasMany(Message);
Message.belongsTo(Channel);

module.exports = { User, College, Channel, Message };
