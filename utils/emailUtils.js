const nodemailer = require("nodemailer");

// // Create a Nodemailer transporter
 const transporter = nodemailer.createTransport({
//   // Specify your email service provider SMTP details here
   service: "Gmail", // Example: Gmail
    auth: {
    user: "inframax07@gmail.com",
    pass: "xoqr beri hcac cnjx",
  },
});

// // Function to send a password reset email
// async function sendPasswordResetEmail(email, resetLink) {
//   try {
//     // Send email
//     await transporter.sendMail({
//       from: "inframax07@gmail.com", // Your email address
//       to: email, // Recipient email address
//       subject: "Password Reset Request", // Email subject
//       html: `
//         <p>You requested a password reset.</p>
//         <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
//       `, // Email body with the reset link
//     });
//     console.log("Password reset email sent successfully");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw error;
//   }
// }

// module.exports = { sendPasswordResetEmail };
// Function to send a password reset email
// Function to send a password reset email
async function sendPasswordResetEmail(email, resetLink) {
    try {
      // Send email
      await transporter.sendMail({
        from: "inframax07@gmail.com", // Your email address
        to: email, // Recipient email address
        subject: "Password Reset Request", // Email subject
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #007bff;">Password Reset Request</h2>
            <p style="color: #333;">You requested for a password reset.</p>
            <p style="color: #333;">Click the button below to reset your password:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </p>
            <p style="color: #333;">If you didn't request this reset, you can ignore this email.</p>
          </div>
        `, // Email body with the reset button
      });
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  }
  
  module.exports = { sendPasswordResetEmail };
  
  