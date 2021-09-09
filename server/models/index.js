const User = require("./User");
const Message = require("./Message");

User.hasMany(Message);

module.exports = {
    User,
    Message,
};
