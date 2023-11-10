const mongoose = require("mongoose")

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        exprireAt: {
            type: Date,
            expires: 180 // now + 180s
        }
    },
    {
        timestamps: true
    }
);
const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;