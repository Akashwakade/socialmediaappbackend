const jwt=require('jsonwebtoken')

const authhenticateUser=(req,res,next)=>{
    const token=req.headers.authentication;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        res.userId=decodedToken.userId;
        next();
    } catch (error) {
        console.error('authnticaton error');
        res.status(401).json({message:"unauthorized"})
    }
}

module.exports=authhenticateUser