


const express = require ("express");
const { connection } = require("./db");
const { userRouter } = require("./Controller/users.route");
const { auth } = require("./middlewares/auth.middleware");
const {postRouter} = require("./Controller/post.route")
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)


app.get("/",(req,res)=>{
    res.send({"msg":"this is the homepage"})
})
app.use(auth)
app.use("/posts",postRouter)


app.listen(8080,async()=>{
    try {
        await connection
    console.log("port running on 8080")
    } catch (error) {
        console.log(error)
    }

    
})