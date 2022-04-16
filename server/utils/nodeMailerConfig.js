module.exports = {
    host: process.env.SECURE_GMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.SECURE_GMAIL_ID,
        pass: process.env.SECURE_GMAIL_PASS
    },
    secure: true
}