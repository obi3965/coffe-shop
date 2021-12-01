
 const User = require("../models/users");
const admin = require('../firebase')

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};


exports.isAuthenticatedAdmin = async(req,res,next) =>{
  const { email } = req.user
  const adminUser = await User.findOne({email}).exec()
  if(adminUser.role !== 'admin'){
    res.status(403).json({
      err:"admin access denied"
    })
  }else{
    next()
  }
}


