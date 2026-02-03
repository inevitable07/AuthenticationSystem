import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: [true, "Username is required"], 
        unique: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"] 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    isverified: { 
        type: Boolean, 
        default: false 
    },
    forgotPasswordToken: { 
        type: String 
    },
    forgotPasswordExpiry: { 
        type: Date 
    },
    verificationToken: { 
        type: String 
    },
    verificationTokenExpiry: { 
        type: Date 
    },

},
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;