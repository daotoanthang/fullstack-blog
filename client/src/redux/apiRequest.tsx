import {
  registerStart,
  registerFailed,
  registerSuccess,
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";
import {
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
  getOnePostStart,
  getOnePostSuccess,
  getOnePostFailed,
  createPostStart,
  createPostSuccess,
  createPostFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
} from "./postSlice";

import {
  getUserStart,
  getUserSuccess,
  getUserError,
  getAllUserStart,
  getAllUserSuccess,
  getAllUserError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFail,
} from "./userSlice";

import { AppDispatch } from "./store";
import axios from "axios";
import { baseUrl } from "../utils/listContainer";
import { toast } from "react-toastify";

interface User {
  email: string;
  fullname?: string;
  password: string;
}

//Register
export const registerUser = async (
  user: User,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  dispatch(registerStart());
  try {
    let res = await axios.post(`${baseUrl}/register`, user);
    if (res.data.errCode === 0) {
      dispatch(registerSuccess());
      toast.success(res.data.message);
      navigate("/login");
    } else {
      dispatch(registerFailed(res.data.message));
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(registerFailed(error));
  }
};

/// handleLogin
export const handleLogin = async (
  user: User,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  dispatch(loginStart());
  try {
    let res = await axios.post(`${baseUrl}/login`, user);
    if (res.data.errCode === 0) {
      dispatch(loginSuccess(res.data));
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      dispatch(loginFailed(res.data.message));
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("error system");
  }
};

//Logout
export const handleCallLogout = async (
  userId: number,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  accessToken: string
) => {
  dispatch(logoutStart());
  try {
    let res = await axios.post(`${baseUrl}/logout`, userId, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

// Image upload
export const handleUploadImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    // Đính kèm file ảnh

    const response = await axios.post(
      "http://localhost:8080/v1/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Định dạng request cho file upload
        },
      }
    );

    // Kiểm tra phản hồi từ server
    if (response.status === 200) {
      return response.data.imageUrl;
    }
  } catch (error) {
    return error;
  }
};

export const handleUploadImageSingle = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    // Đính kèm file ảnh

    const response = await axios.post(
      "http://localhost:8080/v1/upload-image-single",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Định dạng request cho file upload
        },
      }
    );

    // Kiểm tra phản hồi từ server
    if (response.status === 200) {
      return response.data.imageUrl;
    }
  } catch (error) {
    return error;
  }
};

/// Get category ALL
export const getCategory = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/get-category?id=${id}`);
    if (res.data.errCode === 0) {
      return res.data.category;
    } else {
      throw new Error("Not found category");
    }
  } catch (error) {
    return error;
  }
};

///get all post limits
export const getPostLimit = async (limits: string, dispatch: AppDispatch) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(`${baseUrl}/get-post-limits?limits=${limits}`);
    if (res.data.errCode === 0) {
      dispatch(getAllPostSuccess(res.data?.post));
    } else {
      toast.error("Not found post");
    }
  } catch (error) {
    dispatch(getAllPostFailed());
  }
};

/// Get post ALL or slug
export const getPost = async (slug: string, dispatch: AppDispatch) => {
  if (slug === "All") {
    dispatch(getAllPostStart());
    try {
      const res = await axios.get(`${baseUrl}/get-post?slug=${slug}`);
      if (res.data.errCode === 0) {
        dispatch(getAllPostSuccess(res.data?.post));
      } else {
        throw new Error("Not found post");
      }
    } catch (error) {
      dispatch(getAllPostFailed());
    }
  }
  if (slug !== "All") {
    dispatch(getOnePostStart());
    try {
      const res = await axios.get(`${baseUrl}/get-post?slug=${slug}`);
      if (res.data.errCode === 0) {
        dispatch(getOnePostSuccess(res.data?.post));
        return res.data.post;
      } else {
        throw new Error("Not found post");
      }
    } catch (error) {
      dispatch(getOnePostFailed());
    }
  }
};

/// get post related
export const getPostRelated = async (
  category: string,
  dispatch: AppDispatch
) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(
      `${baseUrl}/get-post-related?category=${category}`
    );
    if (res.data.errCode === 0) {
      dispatch(getAllPostSuccess(res.data?.post));
    } else {
      toast.error("Not found post");
    }
  } catch (error) {
    dispatch(getAllPostFailed());
  }
};

// get post by author
export const getPostAuthor = async (userId: string, dispatch: AppDispatch) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(`${baseUrl}/get-post-author?userId=${userId}`);
    if (res.data.errCode === 0) {
      dispatch(getAllPostSuccess(res.data?.post));
    } else {
      toast.error("Not found post");
    }
  } catch (error) {
    dispatch(getAllPostFailed());
  }
};

///get post manage
export const getPostManage = async (
  userId: string,
  userRole: number,
  dispatch: AppDispatch
) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(
      `${baseUrl}/get-post-manage?userId=${userId}&userRole=${userRole}`
    );
    if (res.data.errCode === 0) {
      dispatch(getAllPostSuccess(res.data?.post));
    } else {
      toast.error("Not found post");
    }
  } catch (error) {
    dispatch(getAllPostFailed());
  }
};

/// Create post
export const createPost = async (
  postInfo: Object,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  accessToken: string
) => {
  dispatch(createPostStart());
  try {
    const res = await axios.post(`${baseUrl}/create-post`, postInfo, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.data.errCode === 0) {
      dispatch(createPostSuccess());
      toast.success(res.data.message);
      navigate("/manage/post");
    } else {
      toast.error("create post failed");
    }
  } catch (error) {
    dispatch(createPostFailed());
    toast.error("create post failed");
  }
};

/// Delete post
export const deletePost = async (
  id: string,
  dispatch: AppDispatch,
  accessToken: string,
  navigate: (path: string) => void
) => {
  dispatch(deletePostStart());
  try {
    const res = await axios.delete(`${baseUrl}/delete-post`, {
      headers: { token: `Bearer ${accessToken}` },
      data: { id: id },
    });
    if (res.data.errCode === 0) {
      dispatch(deletePostSuccess());
      toast.success(res.data.message);
      navigate("/manage/post");
    } else {
      toast.error("Delete post failed");
    }
  } catch (error) {
    dispatch(deletePostFailed());
    toast.error("Delete post failed");
  }
};

/// Update post

export const updatePost = async (
  postInfo: Object,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  accessToken: string
) => {
  dispatch(updatePostStart());
  try {
    const res = await axios.put(`${baseUrl}/update-post`, postInfo, {
      headers: { token: `Bearer ${accessToken}` },
    });
    if (res.data.errCode === 0) {
      dispatch(updatePostSuccess());
      toast.success(res.data.message);
      navigate("/manage/post");
    } else {
      toast.error("update post failed");
    }
  } catch (error) {
    dispatch(updatePostFailed());
    toast.error("Update post failed");
  }
};

//// Get user
export const getUser = async (
  userRole: number,
  userId: string,
  dispatch: AppDispatch
) => {
  if (userRole === 1) {
    dispatch(getAllUserStart());
    try {
      const res = await axios.get(
        `${baseUrl}/get-user?role=${userRole}&userId=${userId}`
      );
      if (res.data.errCode === 0) {
        dispatch(getAllUserSuccess(res?.data?.user));
      }
    } catch (error) {
      dispatch(getAllUserError());
    }
  }
  if (userRole !== 1) {
    dispatch(getUserStart());
    try {
      const res = await axios.get(
        `${baseUrl}/get-user?role=${userRole}&userId=${userId}`
      );
      if (res.data.errCode === 0) {
        dispatch(getUserSuccess(res?.data?.user));
      } else {
        throw new Error("Not found user");
      }
    } catch (error) {
      dispatch(getUserError());
    }
  }
};

/// get single user by id
export const getUserById = async (id: string, dispatch: AppDispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`${baseUrl}/get-user-id?id=${id}`);
    if (res?.data?.errCode === 0) {
      dispatch(getUserSuccess(res?.data?.user));
    } else {
      throw new Error("Not found user");
    }
  } catch (error) {
    dispatch(getUserError());
  }
};

/// delete user
export const deleteUser = async (userId: string, dispatch: AppDispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(`${baseUrl}/delete-user`, {
      data: { id: userId },
    });
    if (res.data?.errCode === 0) {
      dispatch(deleteUserSuccess());
      toast.success(res?.data?.message);
    } else {
      toast.error("Delete user failed");
    }
  } catch (error) {
    dispatch(deleteUserFail());
    toast.error("Delete user failed");
  }
};

/// Update user
export const updateUser = async (
  userInfo: Object,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${baseUrl}/update-user`, userInfo);
    if (res.data.errCode === 0) {
      dispatch(updateUserSuccess());
      toast.success(res.data.message);
      navigate("/dashboard");
    } else {
      toast.error("update user failed");
    }
  } catch (error) {
    dispatch(updateUserFail());
    toast.error("Update post failed");
  }
};
