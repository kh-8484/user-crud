// Importing  jwt
import jwt from "jsonwebtoken";

// function to generate token
export const generateAccessToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    "SECRET"
  );
};
