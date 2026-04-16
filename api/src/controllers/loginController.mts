import User, { convertToDto } from "../models/UserModel.mjs";
import bcrypt from "bcryptjs";
import type { LoginRequest } from "../models/requests/loginRequest.mjs";

export const loginUser = async (req: LoginRequest) => {
  const foundUser = await User.findOne({ email: req.email });

  if (!foundUser) {
    return null;
  }

  const valid = await bcrypt.compare(req.password, foundUser.password);

  if (valid) {
    return convertToDto(foundUser);
  } else {
    return null;
  }
};
