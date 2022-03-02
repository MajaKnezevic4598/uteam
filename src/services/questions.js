import axiosInstance from "./http";

export const postQuestion = async (text, type, order, companyId) => {
  try {
    const response = await axiosInstance.post("questions", {
      data: {
        text,
        type,
        order,
        company: companyId,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllQuestion = async (companyId) => {
  try {
    const response = await axiosInstance.get(
      `questions?filters[company][id][$eq]=${companyId}`
    );
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

export const updateQuestion = async (id, text, type, order) => {
  try {
    const response = await axiosInstance.put(`questions/${id}`, {
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

export const getQuestionsFromAllUsers = async () => {
  try {
    const response = await axiosInstance.get("questions");
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
