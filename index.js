const express=require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
require('dotenv').config();
const cors=require("cors");
const { authentication } = require("./middleware/authenticate");
const { postsRoute } = require("./routes/posts.route");


const app=express();
app.use(cors());

app.use(express.json());

app.use("/users",userRouter);
app.use(authentication);
app.use("/posts",postsRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to db")
    }catch(error){
        console.log(error)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})