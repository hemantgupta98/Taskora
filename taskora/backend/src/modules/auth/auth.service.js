import User from "./auth.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};
