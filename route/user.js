import { logIn, register, deleteUser, updateUser } from "../controller/user.js";
import { generateAccessToken } from "../helper/get-jwt.js";
import STATUS from "../interfaces/statusCodes.js";
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/login", async (req, res) => {
  try {
    const { password, email, isSql } = req.body;

    if (!password || !email || isSql === undefined) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await logIn(email, password, isSql);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(result.data._id);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Logged In successfully",
      token,
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json({ message: error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, mobile, password, email, isSql } = req.body;

    if (!name || !mobile || !password || !email || isSql === undefined) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "All parameters are required",
      };
      throw err;
    }

    const result = await register(name, mobile, password, email, isSql);

    if (!result.success) {
      throw result.error;
    }

    const token = generateAccessToken(result.data._id);

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "User Register successfully",
      token,
      data: result.data,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const { name, mobile, password, email, isSql } = req.body;
    const { _id } = req.user;

    if (!email || isSql === undefined) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "Database Type and email are required parameters",
      };
      throw err;
    }

    const result = await updateUser(_id, name, mobile, password, email, isSql);

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
    const { isSql } = req.body;
    const { _id } = req.user;

    if (isSql === undefined) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "Database Type is requied",
      };
      throw err;
    }

    const result = await deleteUser(_id, isSql);

    if (!result.success) {
      throw result.error;
    }

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: `user with ${_id} deleted successfully`,
    });
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json(error);
  }
});

export default router;
