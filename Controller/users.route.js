const express = require("express");
const {userModel} = require("../Model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.post("/register",async (req,res)=>{
try {
    console.log(req.body)
    const password = req.body.password;
   
    bcrypt.hash(password, 5, async function(err, hash) {
        // Store hash in your password DB.

        if(hash)
        {
            req.body.password = hash
            const user = new userModel(req.body)

            await user.save();
            res.send({"msg":"user has been successfully registered"})
        }
    });

    
    
} catch (error) {
    res.send({"err":error.message})
}

})

userRouter.post("/login",async(req,res)=>{

        const {email} = req.body

        const user= await userModel.findOne({email:email})
      
     console.log(user)
        bcrypt.compare(req.body.password,user.password, function(err, out) {


            // res === true

            if(out)
            { 
                var token = jwt.sign({ name:user.name }, 'shhhhh')
                res.send({"msg":"user logged in successfully","token":token})
                
            }

            else
            {
                res.send({"msg":"check credentials"})
            }
        });


    
})

module.exports={
    userRouter
}