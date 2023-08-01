import { userModel } from "../../model/index.js";
import validator from "validator";

export const forgetPasswordController = (req,res)=>{
    const {email} = req.params
    //validate email
    if(validator.isEmail(email)){
        //valid email
        try{

        }catch(err){
            res.json({
                status:false,
                message:[err,"an error occured"]
            })
        }
    }else{
        res.json({
            status:false,
            message:"Enter a valid email"
        })
    }
}