import { User } from "../model/user.js";

export const createUser = async (name, mobile, password, email, isSql) => {
  try {
    if (!isSql) {
      const user = await User.create({
        name,
        mobile,
        email,
        password,
        created_at: Date(),
      });

      if (!user) {
        let err = {
          messgae: "User not created",
        };
        throw err;
      }

      return {
        success: true,
        message: "User created successfully",
        data: user,
      };
    }
  } catch (error) {
    return {
      success: false,
      messgae: error.messgae,
    };
  }
};

export const fetchUser = async (email, isSql) => {
  try {
    if (!isSql) {
      const user = await User.findOne({ email }).exec();

      if (!user) {
        let err = {
          message: "User not found",
        };
        throw err;
      }

      return {
        success: true,
        message: "User found successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUserById = async (_id, isSql) => {
  try {
    if (!isSql) {
      const user = await User.findOne({ _id }).exec();

      if (!user) {
        let err = {
          message: "User not found",
        };
        throw err;
      }

      return {
        success: true,
        message: "User found successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const fetchUserByEmailAndPassword = async (email, password, isSql) => {
  try {
    if (!isSql) {
      const user = await User.findOne({ email, password }).exec();

      if (!user) {
        let err = {
          message: "User not found",
        };
        throw err;
      }

      return {
        success: true,
        message: "User found successfully",
        data: user,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteUserDetails = async (_id, isSql) => {
  try {
    if (!isSql) {
      await User.findOneAndDelete({ _id }).exec();
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: "Something went wrong please try again later",
    };
  }
};

export const updateUserDetails = async (
  _id,
  name,
  mobile,
  password,
  email,
  isSql
) => {
  try {
    if (!isSql) {
      await User.updateOne(
        { _id },
        {
          name,
          mobile,
          password,
          email,
          updatedAt: Date.now(),
        }
      ).exec();
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: "Something went wrong please try again later",
    };
  }
};
