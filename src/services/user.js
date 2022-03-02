import axiosInstance from "./http";

export const user = async () => {
  try {
    const response = await axiosInstance.get("users/me");
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `profiles?filters[user][id][$eq]=${userId}&populate=profilePhoto`
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
