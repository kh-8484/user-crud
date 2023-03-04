// Importing  jwt
import jwt from "jsonwebtoken";

// function to generate token
export const generateAccessToken = (name) => {
  return jwt.sign(
    {
      name,
    },
    "SECRET"
  );
};
