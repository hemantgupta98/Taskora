import { signSchema, loginDB } from "./auth.model.js";

export const createUser = async (data) => {
  return await signSchema.create(data);
};

export const createLogin = async (data) => {
  return await loginDB.create(data);
};
