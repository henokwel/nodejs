const jwt = require("jsonwebtoken")
const User = require("../Model/user")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decode = jwt.verify(token, "testtoken")
        const user = await User.findOne({ "_id": decode._id, "tokens.token": token })

        if (!user) {
            throw new Error()
        }

        req.user = user
    } catch (error) {
        res.status(401).send({ "error": "Please Authenticate" })
    }
    next()
}

module.exports = auth