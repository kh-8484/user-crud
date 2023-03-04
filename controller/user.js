import * as userRepo from "../repositories/user.js";

export const logIn = async (name, mobile, password, email, isSql) => {
  try {
    const result = await logIn(name, mobile, password, email, isSql);

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

export const updateUserDetails = async (
  name,
  mobile,
  password,
  email,
  isSql
) => {
  try {
    const isUserExist = await userRepo.fetchUserDetail(email, isSql);

    if (!isUserExist.success) {
      throw result.error;
    }

    const result = await userRepo.updateUserDetails(
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

export const deleteUserDetails = async (email, isSql) => {
  try {
    const isUserExist = await userRepo.fetchUserDetailById(email, isSql);

    if (!isUserExist.success) {
      throw result.error;
    }

    const result = await userRepo.deleteUserDetails(email, isSql);

    if (!result.success) {
      throw result.error;
    }

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
