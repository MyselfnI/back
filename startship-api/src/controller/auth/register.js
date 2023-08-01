import { userModel } from "../../model/index.js"
import validator from "validator";
import bcrypt from "bcryptjs";
import PasswordValidator from "password-validator";
import { passwordRules } from "../../utils/passwordRules.js";
import { generate } from "randomstring";
import { generatedOtp } from "../../utils/generateOtp.js";
import { sendOTPMail } from "../../utils/sendMail.js";

export const registerController = async (req,res)=>{
    const {userName,fullName,email,password,phoneNumber} = req.body

    //check if all the parameters are present
  if (
    !fullName ||
    !email ||
    !password || 
    !userName ||
    !phoneNumber
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  //check if user exists
  const emailCheck = await userModel
    .findOne({ email: email })
    .exec();
  if (emailCheck) {
    if (emailCheck.isEmailVerified) {
      return res.json({
        status: false,
        message: "User already exists",
      });
    } else {
      //send mail to registered user
      // sendOTPMail(emailCheck.email, emailCheck.fullName, generatedOtp);
      let user;
      user = await userModel.findById(emailCheck._id).exec();
      user.verificationOneTimeCode = generatedOtp;
      await user
        .save()
        .then(() => {
          return res.json({
            status: false,
            userId: emailCheck._id,
            message:
              "User already exists verify your email address. Check your email for the OTP.",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: false,
            message: "an error occured",
          });
        });
    }
  } else {
    // check if email is valid
    if (validator.isEmail(email)) {
      let schema = new PasswordValidator();
      // Add properties to it
      schema
        .is()
        .min(6) // Minimum length 8
        .is()
        .max(100) // Maximum length 100
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(2) // Must have at least 2 digits
        .has()
        .not()
        .spaces() // Should not have spaces
    

      if (schema.validate(password)) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password, salt);
        let referalCode = `STARSHIP${generate(7)}`

        //save info in database
        const registerUser = new userModel({
          fullName:fullName,
          email: email,
          password: hashedPassword,
          userName:userName,
          phoneNumber:phoneNumber,
          verificationOneTimeCode:generatedOtp,
          referalCode:referalCode
        });
        registerUser
          .save()
          .then((response) => {
            //send mail to registered user
             sendOTPMail(email, fullName, generatedOtp);
            res.json({
              status: true,
              userId: response._id,
              message: `Registration successful! Check your email for the OTP`,
            });
          })
          .catch((error) => {
            res.json({
              status: false,
              message: error,
            });
          });
      } else {
        let error = schema.validate(password, { list: true });
        error.push("please use a strong password");
        res.json({
          status: false,
          message: "please use a strong password",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Email is not valid",
      });
    }
  }
}