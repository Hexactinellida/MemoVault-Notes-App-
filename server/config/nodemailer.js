import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS  
  }
});

// Optional but useful
transporter.verify()
  .then(() => console.log("SMTP is ready 🚀"))
  .catch(err => console.error("SMTP ERROR:", err.message));

export default transporter;
