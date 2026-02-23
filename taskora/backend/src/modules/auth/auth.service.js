import { User, ResetPassword } from "./auth.model.js";
import acceptModel from "../acceptInvite/accept.model.js";

export const findUserByEmail = async (email) => {
  // Check in auth/signup collection
  let user = await User.findOne({ email });
  
  return user;
};

export const findUserByEmailForLogin = async (email) => {
  // First check in auth/signup collection
  let user = await User.findOne({ email });
  
  // If not found, check in accept invite collection
  // This allows users who accepted invites to login
  if (!user) {
    const acceptUser = await acceptModel.findOne({ email });
    if (acceptUser) {
      // Return the accept user data in a compatible format
      return {
        _id: acceptUser._id,
        name: acceptUser.name,
        email: acceptUser.email,
        password: acceptUser.password, // Already hashed
        isFromAcceptInvite: true,
      };
    }
  }
  
  return user;
};

export const createUser = async (data) => {
  return await User.create(data);
};

export const createResetPasswordRecord = async (user) => {
  if (!user || !user._id || !user.email || !user.password) return null;

  return await ResetPassword.create({
    userId: user._id,
    email: user.email,
    password: user.password, // hashed password after save
    confirmPassword: user.password, // same as password
  });
};
