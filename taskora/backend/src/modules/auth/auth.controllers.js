import { createUser, createLogin } from "./auth.service.js";

export const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(200).json({
      success: true,
      message: "User saved in signup",
      data: user,
    });
  } catch (error) {
    console.log("Save error", error);
    res.status(400).json({
      success: false,
      message: "Failed to save in signup",
    });
  }
};

export const login = async (req, res) => {
  try {
    const loginUser = await createLogin(req.body);

    res.status(200).json({
      success: true,
      message: "User saved in login",
      data: loginUser,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({
      success: false,
      message: "Failed to save in login",
    });
  }
};
