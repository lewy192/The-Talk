const { AuthenticationError } = require("apollo-server-errors");
const { ValidationError, Op } = require("sequelize");
const { signToken } = require("../utils/auth");
const { User, Message } = require("./../models/index");

const { DateTime } = require("luxon");
const resolvers = {
    Query: {
        users: async () => {
            try {
                await User.findAll();
            } catch (e) {
                console.log(e);
            }
        },
        chats: async (_, { userId }) => {
            try {
                return await User.findAll({
                    where: { id: { [Op.not]: userId } },
                });
            } catch (e) {
                console.log(e);
            }
        },
        getTargetMessages: async (_, { userId, targetId }) => {
            try {
                const messages = Message.findAll({
                    where: { targetId, userId },
                });
                return messages;
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({
                where: { username: username },
            });
            if (!user)
                throw new AuthenticationError("Incorrect Username/Password");

            if (!user.checkPassword(password))
                throw new AuthenticationError("Incorrect Username/Password");
            user["password"] = null;
            delete user.password;
            const token = signToken(user);
            return { token, user };
        },
        signup: async (_, { username, password }) => {
            try {
                const newUser = await User.create({ username, password });
                newUser["password"] = null;
                delete newUser.password;

                const token = signToken(newUser);
                console.log(newUser);

                return { token, user: newUser.dataValues };
            } catch (err) {
                switch (err.message) {
                    case "Validation error":
                        const { errors } = err;
                        const { path, value } = errors[0];
                        const duplicateField = path.split(".")[1];
                        throw new ValidationError(
                            `The ${duplicateField} ${value} is already in use, please try another`
                        );
                    default:
                        console.log(err);
                        break;
                }
            }
        },
        sendMessage: async (_, { userId, targetId, messageContents }) => {
            try {
                const message = await Message.create({
                    userId,
                    targetId,
                    messageContents,
                    sentAt: DateTime.now().setZone("GMT"),
                });
            } catch (err) {
                console.log(err);
            }
        },
    },
    Subscription: {
        messages: {
            subscribe: (_, args, { pubsub }) => {
                return {
                    targetId: 1,
                    userId: 2,
                    messageContents:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
                };
            },
        },
    },
};

module.exports = resolvers;
