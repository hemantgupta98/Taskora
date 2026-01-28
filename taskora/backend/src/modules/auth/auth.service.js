import { User } from "./auth.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (data) => {
  return await User.create(data);
};

{
  /** export const createLogin = async (data) => {
  return await User.create(data);
};*/
}
