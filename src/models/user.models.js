// IMPORTING MODULES
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

// DEFINE USER SCHEMA
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: () => ({
        url: 'https://placehold.co/600x400',
        localpath: '',
      }),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// HASH PASSWORD BEFORE SAVING TO DATABASE
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// METHOD TO CHECK IF ENTERED PASSWORD MATCHES STORED HASHED PASSWORD
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// METHOD TO GENERATE ACCESS TOKEN FOR USER AUTHENTICATION
userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
  return token;
};

// METHOD TO GENERATE REFRESH TOKEN FOR SESSION MANAGEMENT
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
  return token;
};

// METHOD TO GENERATE TEMPORARY TOKEN (FOR EMAIL VERIFICATION OR PASSWORD RESET) 
userSchema.methods.generateTemporaryToken = function () {
  // Step 1: Generate a random 20-byte (160-bit) token and convert it to a hexadecimal string
  const unhashedToken = crypto.randomBytes(20).toString('hex');
  // Step 2: Hash the token using SHA-256 for secure storage in the database
  const hashedToken = crypto
    .createHash('sha256')
    .update(unhashedToken)
    .digest('hex');
  // Step 3: Set an expiry time (20 minutes from now)
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  // Return both versions:
  // - unhashedToken (sent to user via email)
  // - hashedToken (stored securely in the database)
  return { hashedToken, unhashedToken, tokenExpiry };
};

// CREATE AND EXPORT USER MODEL
export const User = mongoose.model('User', userSchema);
