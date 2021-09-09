const jwt = require('jsonwebtoken');

exports.signJWT = async (payload) =>
{
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        algorithm: "HS256",
        expiresIn: '5d',
    });
    return access_token
}

exports.verifyJWT = async (token) =>
{

    try {
        if (token) {
            // console.log(jwt.verify(token, process.env.ACCESS_TOKEN_KEY));
            return jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        }
        return null
    } catch (error) {
        return null
    }

}