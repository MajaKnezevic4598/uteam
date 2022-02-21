import axiosInstance from "./http";

export const passwordChange = async (userId, newPassword) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, {
      password: newPassword,
    });
    return response;
  } catch (error) {
    console.log(`Unable to change password ${error.message}`);
  }
};
