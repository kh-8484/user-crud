import { logIn } from "../controller/user.js";
import { generateAccessToken } from "../helper/get-jwt.js";
import STATUS from "../interfaces/statusCodes.js";
import express from "express";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { name, mobile, password, email, isSql } = req.body;

    if (!name || !mobile || !password || !email) {
      let err = {
        status: STATUS.NOT_FOUND,
        message: "All parametes are required",
      };
      throw err;
    }

    const result = await logIn(name, mobile, password, email, isSql);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(name);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Logged In successfully",
      token,
    });
  } catch (error) {
    res.status(STATUS.NOT_FOUND).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, mobile, password, email, isSql } = req.body;

    if (!name || !mobile || !password || !email) {
      let err = {
        status: STATUS.NOT_FOUND,
        message: "All parametes are required",
      };
      throw err;
    }

    const result = await signUp(name, mobile, password, email, isSql);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(name);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Register successfully",
      token,
    });
  } catch (error) {
    res.status(STATUS.NOT_FOUND).json(error);
  }
});

export default router;
