import bcrypt from "bcryptjs";

export const hashpassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("Error in hashing", error);
  }
};

export const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
