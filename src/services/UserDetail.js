import ApiClient from "./baseapi";

const userDetail = {
  getAllUser: () => {
    return ApiClient().get("/user/getAll?start=%2C&length=%2C", {
      timeout: 5000,
    });
  },
};

export default userDetail;
