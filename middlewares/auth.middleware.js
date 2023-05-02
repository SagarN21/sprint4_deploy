const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

let token = req.headers.authorization;

if(token)
{
    var decoded = jwt.verify(token, 'shhhhh');
    if(decoded)
    {
        req.body.name = decoded.name
       
      
        next();
    }

    else{
        res.send({"mssg":"please login"})
    }
    
}

else
{
    res.send({"mssg":"please login"})
}

}

module.exports = {
    auth
}