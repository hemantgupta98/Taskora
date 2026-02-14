import acceptModel from "./accept.model.js";
import { hashpassword } from "../auth/auth.hashed.js";

export const findUserByEmail = async (email) => {
  return await acceptModel.findOne({ email });
};

export const createUser = async (data) => {
  return acceptModel.create(data);
};

export const User = async (user) => {
  if (!user || !user.email || !user.password || !user.phone || !user.name)
    return null;
  const hashed = await hashpassword(user.password);

  return await acceptModel.create({
    email: user.email,
    phone: user.phone,
    name: user.name,
    password: hashed,
    confirmPassword: hashed,
  });
};
