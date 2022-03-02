import axiosInstance from "./http";

export const uploadFile = async (formData) => {
  console.log(formData);
  try {
    const response = await axiosInstance.post("upload", formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
