const User = require('../User');


module.exports = {
    createUser: async (data) =>
    {
        const user = await User.create(data);
        return user;
    }
}

