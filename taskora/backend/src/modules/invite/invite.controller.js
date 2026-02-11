import inviteModel from "./invite.model.js";

export const user = async (req, res) => {
  const { name, email } = req.body;

  try {
    const savedUser = await inviteModel.create({
      name,
      email,
    });
    res.status(201).json({
      success: true,
      data: savedUser,
      message: "User saved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to send invite" });
  }
};

export default user;
