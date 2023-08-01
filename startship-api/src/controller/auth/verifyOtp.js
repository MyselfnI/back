import { userModel } from '../../model/index.js';

export const verifyOtpController = async (req, res) => {
  const { otp } = req.params;

  try {
    // Find user with OTP
    const findUserWithOtp = await userModel.findOne({ verificationOneTimeCode: otp }).exec();

    if (findUserWithOtp) {
      // Check if email is already verified
      if (findUserWithOtp.isEmailVerified) {
        res.json({
          status: false,
          message: "Email is already verified"
        });
      } else {
        // Update user's email verification status
        findUserWithOtp.isEmailVerified = true;
        await findUserWithOtp.save();

        res.json({
          status: true,
          message: "Email validated"
        });
      }
    } else {
      res.json({
        status: false,
        message: "The link has expired"
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: `An error occurred: ${error}`
    });
  }
};
