import { compare, hash } from "bcryptjs";

const bcrypt = require("bcryptjs");

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function isPasswordValid(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
