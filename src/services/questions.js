import axiosInstance from "./http";

export const postQuestion = async (text, type, order) => {
  try {
    const response = await axiosInstance.post("questions", {
      data: {
        text,
        type,
        order,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllQuestion = async () => {
  try {
    const response = await axiosInstance.get("questions");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuestions = async (id) => {
  try {
    const response = await axiosInstance.delete(`questions/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
