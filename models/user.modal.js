import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema(
    {
        email: String,
        password: String,
        rememberMe: Boolean,
    },
    { timestamps: true }
);

const users = mongoose.models.users || mongoose.model("users", userSchema);

export default users;