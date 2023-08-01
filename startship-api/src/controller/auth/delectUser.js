import {userModel} from '../../model/index.js'

export const DeleteUserController =async  (req,res)=>{
    const {userId} = req.params
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (deletedUser) {
            res.json({
                status:true,
                message:'user sucessfully deleted'
            })
        } else {
            res.json({
                status:false,
                message:'an error occued'
            })
        }
      } catch (error) {
        res.json({
            status:false,
            message:error
        })
      }
}