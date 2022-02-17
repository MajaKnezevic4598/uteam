import axiosInstance from "./http";

export const authUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("auth/local", {
      identifier: email,
      password,
    });
    console.log(response);
    console.log("Authentification succssful!");
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
