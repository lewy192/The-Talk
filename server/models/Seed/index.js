const User = require("../User");
const Message = require("../Message");

const messages = [
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 1,
        userId: 2,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
    {
        targetId: 2,
        userId: 1,
        messageContents:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consectetur doloribus repellendus officiis, nisi, iure enim, labore doloremque vel quo perferendis assumenda velit debitis corporis autem. Explicabo neque saepe similique.",
    },
];

const users = [
    { username: "lewy192", password: "test" },
    { username: "lewy100", password: "test" },
];

(async () => {
    // await User.bulkCreate(users);
    await Message.bulkCreate(messages);
})();
