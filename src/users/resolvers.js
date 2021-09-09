const bcrypt = require('bcrypt');
const JWT = require('../../utils/jwt');
const { createUser, findUserByEmail, findUserById } = require('./repository');
const { findAllUser } = require('./repository/find-user');

const resolvers = {
    Query: {
        async profile(_, args, user)
        {
            try {
                if (!user.email) throw new Error('You are not authenticated');
                return await findUserById(user.id);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        async user(_, { id }, user)
        {
            try {
                if (!user.email) throw new Error('You are not authenticated');
                return await findUserById(id);
            } catch (err) {
                throw new Error(err.message);
            }
        },
        async users(_, args, user)
        {
            try {
                if (!user.email) throw new Error('You are not authenticated');
                return await findAllUser();
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },

    Mutation: {
        async login(_, user)
        {
            try {
                // Check if user registered
                const userExist = await findUserByEmail(user.email);
                if (!userExist) throw new Error('Invalid email or password');

                // Check password
                const isValid = await bcrypt.compare(user.password, userExist.password);
                if (!isValid) throw new Error('Invalid email or password');

                const token = JWT.signJWT({ email: userExist.email, id: userExist._id })
                return { token, user: userExist };
            } catch (err) {
                throw new Error(err.message);
            }
        },
        async register(_, user)
        {
            try {
                // Check if user already exist
                const userExist = await findUserByEmail(user.email);
                if (userExist) throw new Error('User with this email already exist');

                // Hash password
                user.password = await bcrypt.hash(user.password, 10);

                //create User
                const regsteredUser = await createUser(user);
                const token = JWT.signJWT({ email: regsteredUser.email, id: regsteredUser._id })
                return { token, user: regsteredUser };
            } catch (err) {
                throw new Error(err.message);
            }

        },
    }
}

module.exports = resolvers;