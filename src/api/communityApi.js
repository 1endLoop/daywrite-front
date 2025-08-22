// src/api/communityApi.js
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
export const fetchCommunityPublic = async (sort = "popular") => {
  const { data } = await API.get(`/community/posts/public`, { params: { sort } });
  return data; // { items, total }
};

/** 내 글 목록 */
export const fetchMyPosts = async (userId, status = "published") => {
  const { data } = await API.get(`/community/posts/mine`, { params: { userId, status } });
  return data; // { items, total }
};

/** 단건 조회 */
export const fetchPostById = async (id) => {
  const { data } = await API.get(`/community/posts/${id}`);
  return data;
};

/** 게시글 수정(옵션) */
export const updatePost = async (id, payload) => {
  const { data } = await API.put(`/community/posts/${id}`, payload);
  return data;
};

/** 게시글 삭제 — 단일 경로로 확정: DELETE /community/posts/:id */
export const deletePost = async (id, userId) => {
  const res = await API.delete(`/community/posts/${id}`, {
    // 소유권 체크가 필요한 백엔드라면 userId를 쿼리로 넘김(백엔드 구현에 맞춰 유지/제거)
    params: userId ? { userId } : {},
  });

  // ✅ 성공 판정
  if (res.status === 204) return true;
  const d = res.data ?? {};
  if (d.success === true) return true;
  if (typeof d.deletedCount === "number" && d.deletedCount > 0) return true;

  throw new Error("Delete failed by server response.");
};