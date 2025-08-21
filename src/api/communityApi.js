// src/api/communityApi.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api",
  withCredentials: true,
});

// 글 저장(게시/임시저장 공통)
// payload: { userId, nickname, profileImg, type, title, refAuthor, content, musicTitle, musicArtist, isPublic, status }
export const createPost = async (payload) => {
  const { data } = await API.post("/community/posts", payload);
  return data;
};

// 커뮤니티 전체(공개+게시) 목록
// sort: 'popular' | 'recent'
export const fetchCommunityPublic = async (sort = "popular") => {
  const { data } = await API.get(`/community/posts/public`, { params: { sort } });
  return data; // { items: [...], total: n }
};

// 내 글 목록
// status: 'published' | 'draft'
export const fetchMyPosts = async (userId, status = "published") => {
  const { data } = await API.get(`/community/posts/mine`, { params: { userId, status } });
  return data; // { items: [...], total: n }
};

export const fetchPostById = async (id) => {
  const { data } = await API.get(`/community/posts/${id}`);
  return data;
};
