import bcrypt from "bcryptjs";

const hashpassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log("Error in hashing", error);
  }
};

export default hashpassword;
