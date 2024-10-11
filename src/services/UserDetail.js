import ApiClient from "./baseapi";

const userDetail = {
  getAllUser: () => {
    return ApiClient().get("/user/getAll", {
      timeout: 5000,
    });
  },
};

export default userDetail;
