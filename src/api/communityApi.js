import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000/api",
  withCredentials: true,
});

console.log(
  "[token check]",
  localStorage.getItem("accessToken"),
  sessionStorage.getItem("accessToken"),
  localStorage.getItem("token"),
  sessionStorage.getItem("token"),
  localStorage.getItem("jwtToken")
);

// Authorization 자동 첨부 (기존 기능 유지 + 구 키 호환)
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("jwtToken"); // 과거 호환

  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;

  return config;
});

/* ======================== 게시글 ======================== */

/** 글 저장 */
export const createPost = async (payload) => {
  const { data } = await API.post("/community/posts", payload);
  return data;
};

/** 커뮤니티 전체(공개+게시) 목록 */
export const fetchCommunityPublic = async (sort = "popular", userId) => {
  const { data } = await API.get("/community/posts/public", { params: { sort, userId } });
  return data; // { items, total }
};

/** 내 글 목록 */
export const fetchMyPosts = async (userId, status = "published") => {
  const { data } = await API.get("/community/posts/mine", { params: { userId, status } });
  return data; // { items, total }
};

/** 단건 조회 (백엔드: { item } 로 응답) */
export const fetchPostById = async (id, userId) => {
  const { data } = await API.get(`/community/posts/${id}`, { params: userId ? { userId } : {} });
  return data; // { item }
};

/** 게시글 수정 */
export const updatePost = async (id, payload) => {
  const { data } = await API.put(`/community/posts/${id}`, payload);
  return data;
};

/** 게시글 삭제 */
export const deletePost = async (id, userId) => {
  const res = await API.delete(`/community/posts/${id}`, { params: userId ? { userId } : {} });
  if (res.status === 204) return true;
  const d = res.data ?? {};
  if (d.success === true) return true;
  if (typeof d.deletedCount === "number" && d.deletedCount > 0) return true;
  throw new Error("Delete failed by server response.");
};

/** 게시글 좋아요 토글 */
export const toggleLike = async (postId, userId) => {
  const { data } = await API.post(`/community/posts/${postId}/like`, { userId });
  return data; // { success, liked, likes, postId }
};

/** 내가 좋아요한 글 목록 (아카이브 LIKED) */
export const fetchLikedByUser = async (userId, q = "") => {
  const { data } = await API.get("/community/posts/liked", { params: { userId, q } });
  return data; // { items }
};

/** 배열에서 특정 게시글의 liked/likes 동기화 */
export const syncLikeInArray = (arr, postId, liked, likes) =>
  (Array.isArray(arr) ? arr : []).map((it) => ((it._id || it.id) === postId ? { ...it, liked, likes } : it));

/* ========= 전역 좋아요 동기화 이벤트 (아카이브 ↔ 커뮤니티) ========= */
const LIKE_EVT = "post-like-changed";

/** 어디서든 좋아요 상태가 바뀌면 호출해서 전역 통지 */
export function notifyLikeChanged(postId, liked, likes) {
  try {
    window.dispatchEvent(new CustomEvent(LIKE_EVT, { detail: { postId, liked, likes } }));
  } catch {}
}

/** 화면(컴포넌트)에서 구독 → 다른 화면에서 바뀐 좋아요를 즉시 반영 */
export function subscribeLikeChanged(handler) {
  const wrap = (e) => handler(e.detail);
  window.addEventListener(LIKE_EVT, wrap);
  return () => window.removeEventListener(LIKE_EVT, wrap);
}

/* ======================== 댓글 ======================== */
/* 백엔드 라우트:
   - GET    /community/:postId/comments
   - POST   /community/:postId/comments
   - GET    /community/comments/:commentId/replies
   - POST   /community/comments/:commentId/replies
   - POST   /community/comments/:commentId/like
   - PATCH  /community/comments/:commentId
   - DELETE /community/comments/:commentId
*/

/** 댓글 목록(최상위) */
export const listComments = async (postId, { cursor, limit = 20, userId } = {}) => {
  const { data } = await API.get(`/community/${postId}/comments`, {
    params: { cursor: cursor || undefined, limit, userId },
  });
  return data; // { ok, items, nextCursor }
};

/** 댓글 작성(최상위) – JWT 필요: Authorization: Bearer ... */
export const createComment = async (postId, content) => {
  const { data } = await API.post(`/community/${postId}/comments`, { content });
  return data; // { ok, item }
};

/** 댓글 좋아요 토글 */
export const toggleCommentLike = async (commentId) => {
  const { data } = await API.post(`/community/comments/${commentId}/like`);
  return data; // { ok, liked, likes }
};

/** 대댓글 목록 */
export const listReplies = async (commentId, { cursor, limit = 20, userId } = {}) => {
  const { data } = await API.get(`/community/comments/${commentId}/replies`, {
    params: { cursor: cursor || undefined, limit, userId },
  });
  return data; // { ok, items, nextCursor }
};

/** 대댓글 작성 */
export const createReply = async (commentId, content) => {
  const { data } = await API.post(`/community/comments/${commentId}/replies`, { content });
  return data; // { ok, item }
};

/** 배열에서 특정 게시글의 댓글 수 동기화 */
export const syncCommentsInArray = (arr, postId, comments) =>
  (Array.isArray(arr) ? arr : []).map((it) => ((it._id || it.id) === postId ? { ...it, comments } : it));

/* ========= 전역 댓글 수 동기화 이벤트 ========= */
const COMMENT_EVT = "post-comment-changed";

/** 상세에서 댓글/대댓글 생성·삭제 시 호출 → 카드/목록 즉시 반영 */
export function notifyCommentChanged(postId, comments) {
  try {
    window.dispatchEvent(new CustomEvent(COMMENT_EVT, { detail: { postId, comments } }));
  } catch {}
}

/** 화면에서 구독하여 댓글 수 실시간 반영 */
export function subscribeCommentChanged(handler) {
  const wrap = (e) => handler(e.detail);
  window.addEventListener(COMMENT_EVT, wrap);
  return () => window.removeEventListener(COMMENT_EVT, wrap);
}

/** 댓글 수정 */
export async function updateComment(commentId, content) {
  const { data } = await API.patch(`/community/comments/${commentId}`, { content });
  return data; // { ok: true }
}

/** 댓글 삭제 */
export async function deleteComment(commentId) {
  const { data } = await API.delete(`/community/comments/${commentId}`);
  return data; // { ok: true, deleted: n }
}
