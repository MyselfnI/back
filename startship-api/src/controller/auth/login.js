import { userModel } from "../../model/index.js"
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

export const loginConteroller = async (req,res)=>{
    const { email, password } = req.body;

    //find user by email
    //future users can login with phone, username and email
    if (validator.isEmail(email)) {
      const value = await userModel.findOne({ email: email }).exec();
  
      if (value) {
        const plainPassword = password;
        const hashedpassword = value.password;
  
        //compair hashed and plain password
        bcrypt.compare(plainPassword, hashedpassword, (err, result) => {
          if (err) {
            console.error(err);
            res.json({
              status: false,
              message: "an error occured",
            });
          } else {
            //validate the password
            if (result) {
              //create jwt
              var token = jwt.sign(JSON.stringify(value), process.env.JWT_SECRET);
              res.json({
                status: true,
                message: "login sucessfull",
                data: token,
              });
            } else {
              res.json({
                status: false,
                message: "wrong password",
              });
            }
          }
        });
      } else {
        res.json({
          status: false,
          message: "user does not exist",
        });
      }
    } else {
      res.json({
        status: false,
        message: "enter a valid mail",
      });
    }
}