const express = require("express")
const router = new express.Router()
const User = require("../Model/user")
const auth = require("../middleware/auth")


router.get("/user/me", auth, async (req, res) => {
    res.send(req.user)
})



// Create user
router.post("/user", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.send({ user, token }).status(201)

    } catch (error) {
        res.send(error).status(400)
    }
 
})


// get a user with id
router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).send()
            }
            res.send(user).status(200)
        })
        .catch(() => res.status(500).send())
})



// login user
router.post("/user/login", async (req, res) => {
    try {

        const user = await User.findUserByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token }).status(200)

    } catch (error) {
        res.status(400).send()
    }
})



module.exports = router
