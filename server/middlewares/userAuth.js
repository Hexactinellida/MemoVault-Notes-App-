import jwt from 'jsonwebtoken';


const userAuth = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({ success:false, message: "Not Authorized. Login Again!"})
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (!req.body) {
            req.body = {};
        }
        req.body.userId = tokenDecode.id;

        next();     //it invokes the controller function (sendverifyotp) in authcontrollers.js
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }

}
export default userAuth;