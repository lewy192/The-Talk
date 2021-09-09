const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcryptjs");

class User extends Model {
    checkPassword = (password) => {
        return bcrypt.compareSync(password, this.password);
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(26),
            allowNull: false,
            unique: true,
        },
        password: { type: DataTypes.STRING(66), allowNull: false },
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                const { password, username } = newUser;
                var salt = bcrypt.genSaltSync(10);
                newUser.password = bcrypt.hashSync(password, salt);
                newUser.username = await username.toLowerCase();
                return newUser;
            },
        },
        sequelize,
        modelName: "user",
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = User;
