require("dotenv").config();
const { NODE_EMAIL_ID, NODE_PASS } = process.env;
const nodemailer = require("nodemailer");

const sendSelfMail = async (data, to) => {
  let toEmail;
  if (to === "job") {
    toEmail = "jobs@omanchlorine.com";
  } else if (to === "quote") {
    toEmail = "info@omanchlorine.com";
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODE_EMAIL_ID,
        pass: NODE_PASS,
      },
    });

    const mailOptions = {
      from: data.from,
      to: toEmail,
      subject: data.subject,
      text: data.text,
      attachments: data.attachment
        ? [
            {
              filename: data.attachment.originalname,
              content: data.attachment.buffer,
            },
          ]
        : [],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("🚀 ~ sendSelfMail ~ error:", error);
      } else {
        console.log("🚀 ~ Email sent: ~ response: " + info.response);
      }
    });
  } catch (error) {
    console.log("🚀 ~ sendSelfMail ~ error:", error);
  }
};

module.exports = sendSelfMail;
