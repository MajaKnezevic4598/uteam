import axiosInstance from "./http";

export const authUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("api/auth/local", {
      identifier: email,
      password,
    });
    console.log(response);
    console.log("Authentification succssful!");
  } catch (error) {
    console.log(error.message);
  }
};
