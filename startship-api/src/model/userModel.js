import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    email:{type:String, required: true},
    fullName:{type:String, required: true},
    password:{type:String,required:true},
    userName:{type:String, required: true},
    referalCode:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    refered:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
      },
      amountinDollars:{type:Decimal128,default:0.00},
      amountinPounds:{type:Decimal128,default:0.00},
      amountinBTC:{type:Decimal128,default:0.00},
      amountinETHUSDT:{type:Decimal128,default:0.00},
      verificationOneTimeCode:{type:String,required:true},
      isEmailVerified:{type:Boolean,default:false},
      btcAddress:{type:String,default:"1MavNKVtsEU35abPPAhCtPsyUzHmMLzbG"},
      ethAddress:{type:String,default:"0xedd640874aa5e043f153d31e4b38557d1542c202"},
      profilePicture:{type:String,default:'https://img.icons8.com/fluency/48/test-account.png'},
      canWithDrawl:{type:Boolean,default:false}
})

export const userRegistrationScheme = mongoose.model("users", userSchema);