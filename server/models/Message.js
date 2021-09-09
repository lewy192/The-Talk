const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../config/connection");

const User = require("./User");

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        targetId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        messageContents: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sentAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "message",
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Message;
