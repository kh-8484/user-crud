import STATUS from "../interfaces/statusCodes.js";
import {
  createUser,
  fetchUser,
  fetchUserByEmailAndPassword,
  updateUserDetails,
  deleteUserDetails,
  fetchUserById,
} from "../repositories/user.js";

export const register = async (name, mobile, password, email, isSql) => {
  try {
    const userExist = await fetchUser(email, isSql);

    if (userExist.success) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: "User already exists",
      };
      throw err;
    }

    const result = await createUser(name, mobile, password, email, isSql);

    if (!result.success) {
      throw result.error;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const logIn = async (email, password, isSql) => {
  try {
    const userExist = await fetchUserByEmailAndPassword(email, password, isSql);

    if (!userExist.success) {
      throw userExist.message;
    }

    return {
      success: true,
      data: userExist.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const updateUser = async (_id, name, mobile, password, email, isSql) => {
  try {
    const isUserExist = await fetchUserById(_id, isSql);

    if (!isUserExist.success) {
      throw result.error;
    }

    const result = await updateUserDetails(
      _id,
      name,
      mobile,
      password,
      email,
      isSql
    );

    if (!result.success) {
      throw result.error;
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const deleteUser = async (_id, isSql) => {
  try {
    const isUserExist = await fetchUserById(_id, isSql);

    if (!isUserExist.success) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: isUserExist.message,
      };
      throw err;
    }

    const result = await deleteUserDetails(_id, isSql);

    if (!result.success) {
      let err = {
        status: STATUS.BAD_REQUEST,
        message: result.message,
      };
      throw err;
    }

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
