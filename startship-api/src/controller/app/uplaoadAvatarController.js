import { userModel } from '../../model/index.js';

export const uploadAvatar = async (req,res) =>{
    const userId = req.user._id;
    const {avatarUrl} = req.body
   if(avatarUrl){
    try{
        const updatedUser = await userModel.findOneAndUpdate(
            {_id:userId},
            {profilePicture: avatarUrl},
           
        ).exec()
        if(updatedUser){
            res.json({
                status:true,
                message:'profile image succefull updated'
            })
        }else{
            res.json({
                status:false,
                message:'an error occured of user does not exist'
            })
        }
    }catch(err){
        res.json({
            status:false,
            message:'an error occured'
        })
    }
   }else{
       res.json({
           status:false,
           message:"please enter a valid url"
       })
   }
}