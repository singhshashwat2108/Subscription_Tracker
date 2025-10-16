import User from '../models/user.model.js'

export const getusers = async (req,res,next)=>{
try {
  const users= await User.find();

  if(!users){
    const error =new Error("users not found");
    error.statusCode(404);
    throw error
  }
  res.status(200).json({
    success:true,
    data:users
  })

}catch (error) {
  next(error)
}
}

export const getuser = async (req,res,next)=>{
  const user = await User.findById(req.params.id).select("-password");

  try {
    if (!user) {
      const error = new Error("user not found");
      error.statusCode(404);
      throw error;
    }

    res.status(200).json({
      success:true,
      data:user
    });

  } catch (error) {
    next(error);
    
  }
}