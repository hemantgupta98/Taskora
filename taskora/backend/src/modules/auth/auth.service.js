import { User, ResetPassword } from "./auth.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
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
