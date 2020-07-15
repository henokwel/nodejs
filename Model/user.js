const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

mongoose.connect("mongodb://127.0.0.1:27017/team", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password can't be password")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ "_id": user._id.toString() }, "testtoken")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}


userSchema.statics.findUserByCredentials = async (username, password) => {

    const user = await User.findOne({ username })

    if (!user) {
        throw new Error("Unable to login")
    }


    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
    }
    return user;
}

userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model("user", userSchema)


module.exports = User