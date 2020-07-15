require("mongoose")
// import { MongoClient } from 'mongodb'
const express = require("express")
const app = express()
const userRoute = require("./Routes/user")

 


app.use(express.json())
app.use(userRoute)

const jwt = require("jsonwebtoken")

// const myFn = async () => {
//     const token = jwt.sign({ "_id": "123henok" }, "testtoken", {expiresIn:"5 seconds"})
//     console.log(token);
//     setTimeout(() => {
//         const signIn = jwt.verify(token, "testtoken")
//         console.log(signIn);

//     }, 3000);


// }

// myFn()
// const myFn = async () => {
//     const pass = "henok123"
//     const hash_Pass = await bcryptjs.hash(pass, 8)
//     console.log(pass);
//     console.log(hash_Pass);

//     const isMatch = await bcryptjs.compare("hedfnok123", hash_Pass)
//     console.log(isMatch);
// }

// myFn()


app.listen(4000, () => {
    console.log('Open in 4000');

})