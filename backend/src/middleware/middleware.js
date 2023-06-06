require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: "Tidak Ada Token"
        })
    }

    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.id = decode._id
    next()
}