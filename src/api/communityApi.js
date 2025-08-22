import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api",
  withCredentials: true,
});

/** 글 저장 */
export const createPost = async (payload) => {
  const { data } = await API.post("/community/posts", payload);
  return data;
};

/** 커뮤니티 전체(공개+게시) 목록 */
export const fetchCommunityPublic = async (sort = "popular", userId) => {
  const { data } = await API.get("/community/posts/public", {
    params: { sort, userId },
  });
  return data; // { items, total }
};

/** 내 글 목록 */
export const fetchMyPosts = async (userId, status = "published") => {
  const { data } = await API.get("/community/posts/mine", {
    params: { userId, status },
  });
  return data; // { items, total }
};

/** 단건 조회 */
export const fetchPostById = async (id, userId) => {
  const { data } = await API.get(`/community/posts/${id}`, {
    params: userId ? { userId } : {},
  });
  return data;
};

/** 게시글 수정 */
export const updatePost = async (id, payload) => {
  const { data } = await API.put(`/community/posts/${id}`, payload);
  return data;
};

/** 게시글 삭제 */
export const deletePost = async (id, userId) => {
  const res = await API.delete(`/community/posts/${id}`, {
    params: userId ? { userId } : {},
  });

  if (res.status === 204) return true;
  const d = res.data ?? {};
  if (d.success === true) return true;
  if (typeof d.deletedCount === "number" && d.deletedCount > 0) return true;

  throw new Error("Delete failed by server response.");
};

/** 좋아요 토글 */
export const toggleLike = async (postId, userId) => {
  const { data } = await API.post(`/community/posts/${postId}/like`, { userId });
  return data; // { success, liked, likes, postId }
};
