import { measureMemory } from "vm";
import acceptModel from "./accept.model.js";

export const accept = async (req, res) => {
  const { name, phone, password } = req.body;

  try {
    const savedUser = await acceptModel.create({
      name,
      phone,
      password,
    });
    res.status(201).json({
      success: true,
      data: savedUser,
      message: "accept user saved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to send the data",
    });
    console.log(error);
  }
};

export default accept;
