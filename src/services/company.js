import axiosInstance from "./http";

export const company = async (company, token) => {
  try {
    const response = await axiosInstance.post("api/companies", {
      data: {
        name: company,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
