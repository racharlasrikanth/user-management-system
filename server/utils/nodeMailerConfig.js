module.exports = {
    host: process.env.SECURE_GMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.SECURE_GMAIL_ID,
        pass: process.env.SECURE_GMAIL_PASS
    },
    secure: true
}

// Log in to your Google account Go to My Account > Sign-in & Security > App Passwords (Sign in again to confirm it's you) Scroll down to Select App (in the Password & sign-in method box) and choose Other (custom name) Give this app password a name, e.g. "nodemailer" Choose Generate Copy the long generated password and paste it into your Node.js script instead of your actual Gmail password.