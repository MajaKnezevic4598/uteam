import axiosInstance from "./http";

export const company = async (company) => {
  try {
    const response = await axiosInstance.post("companies", {
      data: {
        name: company,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
