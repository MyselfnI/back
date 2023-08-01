import {userModel} from '../../model/index.js'

export const getUserProfileController = async (req,res)=>{
    const userId = req.user._id;
   try{
    const user = await userModel.findById(userId).select('-verificationOneTimeCode').exec()
    if(user){
        const { verificationOneTimeCode, ...userInfo } = user;
        res.json({
            status:true,
            message:user
        })
        
    }else{
        res.json({
            status:false,
            message:'user not found'
        })
    }
   }catch(err){
        res.json({
            status:false,
            message:err
        })
   }
}