const User = require('../User');

module.exports = {
    findUserById: async (_id) =>
    {
        const user = await User.findById(_id);
        return user;
    },
    findUserByEmail: async (email) =>
    {
        const user = await User.findOne({
            email
        });
        return user;
    },
    findAllUser: async () =>
    {
        const users = await User.find({});
        return users;
    }
}