import { User } from "../db-init/models/user";
export const deleteUserDetails = async (email, isSql) => {
  try {
    if (!isSql) {
      await User.findOneAndDelete({ email: email }).exec();
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
  name,
  mobile,
  password,
  email,
  isSql
) => {
  try {
    if (!isSql) {
      await User.updateOne(
        { email: email },
        {
          mobile,
          password,
          email,
          isSql,
          updatedAt: Data.now(),
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
