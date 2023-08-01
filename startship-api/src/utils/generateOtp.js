import otpGenerator from "otp-generator";

const otp = () => {
  const otpCode = otpGenerator.generate(60, {
    upperCase: false,
    specialChars: false,
  });
  return otpCode;
};

export const generatedOtp = otp();
