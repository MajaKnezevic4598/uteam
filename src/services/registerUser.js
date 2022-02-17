import axiosInstance from "./http";

// const register = axios.post("http://localhost:1337/auth/local/register.");

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post("auth/local/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    // console.log(`{response User: ${JSON.stringify(response.data.user)}}`);
    // console.log(`{response Token: ${response.data.jwt}}`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
