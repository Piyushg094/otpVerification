const otpGenerator = require('otp-generator');
const OtpModel = require('../models/otp');
const twilio = require('twilio');

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const cDate = new Date();
    const OTP_EXPIRATION_TIME = 60000; // Example: OTP valid for 1 minute (60 seconds)
    await OtpModel.findOneAndUpdate(
      { phoneNumber },
      {
        otp,
        otpExpiration: new Date(cDate.getTime() + OTP_EXPIRATION_TIME),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await twilioClient.messages.create({
        body : `Hello devendra  your friend piyush gupta giving you job in his
        company piyush berojgar bharti technologies you just one step back to get offer letter
        and His company also provides russian per month to their employees from company funds. you secret otp  to get job is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
    })


    return res.status(200).json({
      success: true,
      msg: 'OTP Sent Successfully',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: err.message || 'Failed to send OTP',
    });
  }
};

module.exports = {
  sendOtp,
};

        // console.log(accountSid);
        // console.log(authToken)
        // console.log(process.env.TWILIO_PHONE_NUMBER)
 
