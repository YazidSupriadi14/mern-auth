import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../mailtrap/emails.js";


export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Validate input
        if (!email || !password || !name) {
            return res.status(400).send("Invalid email or password");
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).send("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Correctly generate the token

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 3600000, // 1 hour expiration
        });

        // Save the user to the database
        await user.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(email, verificationToken);

        // Send success response
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            },
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const verificationEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name); // Assuming this function is defined elsewhere

        return res.status(200).json({ 
            success: true,
            message: "Email verified successfully",
            user : {
                ...user._doc,
                password: undefined // Exclude the password from the response
            } });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { 
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "Please verify your email" });  
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude the password from the response
            },
        });

    } catch (error) {
            console.log("error in login",error);
            return res.status(400).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpired = Date.now() + 3600000; // 1 hour expiration

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpired;
        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params
        const {password} = req.body

        const user = await user.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        await sendResetSuccessEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successfully" });
    }catch(error){
        console.log(error)
    }
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};