import pkg from "sib-api-v3-sdk";
import { config } from "dotenv";
const { TransactionalEmailsApi, ApiClient } = pkg;

config();

const client = ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new TransactionalEmailsApi();

export const sendOTPMail = (mail, name, otp) => {
  const sender = {
    email: process.env.MAIL_SENDER,
  };
  const receivers = [
    {
      email: mail,
    },
  ];
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Your One-Time Password (OTP)",
      textContent: `
      Dear ${name},

    As part of our enhanced security measures, we have generated a verification link for you to validate your email address. Please click on the link below to complete the verification process:
    Verification Link: ${process.env.LINK}${otp}
    Please ensure that you do not share this link with anyone, including our customer support team. We will never ask you to share your verification link over the phone or email. If you suspect any fraudulent activity, please contact us immediately.
    Thank you for choosing our services.

    Best regards,
    James at Starfire`,
    })
    .then(console.log,'sucess')
    .catch(console.log,'failed');
};
