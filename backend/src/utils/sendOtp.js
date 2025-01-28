import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_HOST_ID,
    pass: process.env.MAIL_HOST_PASSWORD,
  },
});

const sendOtp = async function (email, otp) {
  const mailOptions = {
    from: '"PlantCare" <noreply@plantcare.com>',
    to: email,
    subject: "PlatCare: Login OTP ",
    html: `<div> <p> Your OTP for login is: ${otp}</p> <br> <p> This OTP is valid for 10 minutes.</p> <br> <p> If you didn't request this, please ignore this email.</p> </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error while sending OTP", error);
    throw new Error("Error while sending OTP");
  }
};

export default sendOtp;
