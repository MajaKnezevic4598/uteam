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

export const getCompanyId = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `profiles?filters[user][id][$eq]=${userId}&populate=company`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
