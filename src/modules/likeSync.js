const LIKE_EVT = "post-like-changed";

/** 전역 통지 */
export function notifyLikeChanged(postId, liked, likes) {
  try {
    window.dispatchEvent(
      new CustomEvent(LIKE_EVT, { detail: { postId, liked, likes } })
    );
  } catch {}
}

/** 전역 구독 */
export function subscribeLikeChanged(handler) {
  const wrap = (e) => handler(e.detail);
  window.addEventListener(LIKE_EVT, wrap);
  return () => window.removeEventListener(LIKE_EVT, wrap);
}