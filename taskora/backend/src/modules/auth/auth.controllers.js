import { createUser } from "./auth.service.js";

export const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: user,
    });
  } catch (error) {
    console.log("Save error", error);
    res.status(500).json({
      success: false,
      message: "Failed to save user",
    });
  }
};
