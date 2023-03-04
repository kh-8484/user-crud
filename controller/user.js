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
