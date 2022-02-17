import axiosInstance from "./http";

export const createProfile = async (userId, companyId, photoId, name) => {
  try {
    const response = await axiosInstance.post("profiles", {
      data: {
        profilePhoto: photoId,
        user: userId,
        company: companyId,
        name: name,
      },
    });
    return response;
  } catch (error) {
    throw `Profile creation failed - ${error}`;
  }
};
