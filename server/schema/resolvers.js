const { AuthenticationError } = require("apollo-server-errors");
const { ValidationError, Op } = require("sequelize");
const { signToken } = require("../utils/auth");
const { User, Message } = require("./../models/index");
const { PubSub, withFilter } = require("graphql-subscriptions");
const { DateTime } = require("luxon");

const pubsub = new PubSub();

const MESSAGE_CREATED = "MESSAGE_CREATED";
const resolvers = {
    Query: {
        users: async () => {
            try {
                return await User.findAll();
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
                const currentUserMessages = await Message.findAll({
                    where: {
                        userId,
                        targetId,
                    },
                });

                const recipientUserMessages = await Message.findAll({
                    where: { userId: targetId, targetId: userId },
                });
                // order by date

                return [...currentUserMessages, ...recipientUserMessages].sort(
                    ({ sentAt: aSentAt }, { sentAt: bSentAt }) =>
                        aSentAt.getTime() - bSentAt.getTime()
                );
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
            console.log(pubsub.asyncIterator);
            try {
                const sentAt = DateTime.now().setZone("GMT");
                const payload = { userId, targetId, messageContents, sentAt };
                const message = await Message.create(payload);
                const { dataValues } = message;
                await pubsub.publish(MESSAGE_CREATED, {
                    newMessage: dataValues,
                });

                return dataValues;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => {
                    return pubsub.asyncIterator([MESSAGE_CREATED]);
                },
                (payload, args) => {
                    return (
                        (payload.newMessage.targetId === args.recipientId &&
                            payload.newMessage.userId === args.senderId) ||
                        (payload.newMessage.targetId == args.senderId &&
                            payload.newMessage.userId === args.recipientId)
                    );
                }
            ),
        },
        getTargetMessages: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]),
        },
    },
};

module.exports = resolvers;
