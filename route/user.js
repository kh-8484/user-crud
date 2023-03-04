import {
  logIn,
  updateUserDetails,
  deleteUserDetails,
} from "../controller/user.js";
import { generateAccessToken } from "../helper/get-jwt.js";
import STATUS from "../interfaces/statusCodes.js";
import express from "express";
const router = express.Router();

const auth = require("../middleware/auth");

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

router.put("/", auth, async (req, res) => {
  try {
    const { name, mobile, password, email, isSql } = req.body;

    if (!name || !mobile || !password || !email || isSql) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await updateUserDetails(
      name,
      mobile,
      password,
      email,
      isSql
    );

    if (!result.success) {
      throw result.error;
    }

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "user details updated successfully",
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    // currently assuming email to be unique
    // later id can be used from params
    // const { id } = req.params;
    const { email, isSql } = req.body;

    if (!email || !isSql) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await deleteUserDetails(email, isSql);

    if (!result.success) {
      throw result.error;
    }

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: `user with ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

export default router;
