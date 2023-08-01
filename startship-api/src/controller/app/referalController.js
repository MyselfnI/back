import { userModel } from "../../model/index.js";

export const referalControler = async (req, res) => {
  const { code } = req.params;
  const {userId} = req.body;

// find user with referal code
if (code.startsWith("STARSHIP") && code.split('').length === 15){

  try{
    const query = {
      referalCode: code,
      refered: { $ne: userId } // Check if userId is not already present in the referred array
    };
    const findUserWithcode = await userModel.findOneAndUpdate(
      query,
      { $push: { refered: userId } },
      {new:true}
      ).exec();
  if(findUserWithcode){
    res.json({
      status:true,
      message:'Valid code'
    })
  }else{
    res.json({
      status:false,
      message:"Referral code does not exist or has already been used by the current user."
    })
  }
  }catch(err){
    res.json({
      status:fasle,
      message:err
    })
  }
  } else {
    res.json({
      status: false,
      message: "Please enter a valid referral code."
    });
  }
};
