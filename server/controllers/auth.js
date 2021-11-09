const tryCatchError = require("../middleware/tryCatchError");
const User = require('../models/users')
const ErrorHandler = require("../util/errorHandler");
const sendToken = require("../util/jwtToken");
const crypto = require("crypto");
const sendEmail = require('../util/sendEmail')

exports.signUp = tryCatchError(async (req,res, next) => {
    const { name, email, password } = req.body;
     
    const user = await User.create({name,email,password,
        avatar: {
            public_id: 'profile id',
            url: 'profile url',
          },
        })
       
      sendToken(user, 201, res)
       
 
}) 

exports.signIn = tryCatchError (async(req,res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email:email}).select("+password")
    
    
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
     user.password = undefined 
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  sendToken(user, 200, res)
    
}) 

exports.logout = tryCatchError (async(req,res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
    
}) 


exports.forgetPassword = tryCatchError (async (req,res,next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {

    await sendEmail({
        email: user.email,
        subject: 'Shop Password Recovery',
        message
    })

    res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
    })

} catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500))
}

})



exports.resetPassword = tryCatchError (async (req, res, next) => {

  // Hash URL token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
      return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
  }

  if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Password does not match', 400))
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res)

})


exports.userProfile = tryCatchError (async (req,res,next) => {

  const user = await User.findById(req.user.id)
 
  res.status(200).json({
    success: true,
    user
})
})


exports.passwordUpdate = tryCatchError (async (req,res,next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
})



exports.userProfileUpdate = tryCatchError (async (req,res,next) => {

  const user = await User.findById(req.user.id)
 
  res.status(200).json({
    success: true,
    user
})
})



exports.getAllUsers = tryCatchError (async (req,res,next) => {

  const users = await User.find()
 
  res.status(200).json({
    success: true,
    users
})
})



exports.getSingleUser = tryCatchError (async (req,res,next) => {
   
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user
})
})



exports.updateUserRole = tryCatchError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


exports.deleteUser = tryCatchError(async(req,res,next) => {

  const user = await User.findByIdAndDelete(req.params.id)

  if(!user){
    return next(
      new ErrorHandler('user is not deleted', 401)
    );
  }
  res.status(200).json({
    success:true,
    message:'user is deleted'
  })
})