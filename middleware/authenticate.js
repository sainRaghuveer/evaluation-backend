var jwt = require('jsonwebtoken');

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    try{
        jwt.verify(token, 'post', async(err, decoded)=> {
            if(decoded){
                next();
            }else{
                res.send({"msg":"login please"})
            }
          });
    }catch(error){
        res.send({"msg":"verify"})
    }
}

module.exports={
    authentication
}