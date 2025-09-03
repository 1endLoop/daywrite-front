import { useEffect, useMemo, useState } from "react";
import Post from "./post.detail.style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchPostById,
  toggleLike,
  listComments,
  createComment,
  toggleCommentLike,
  listReplies,
  createReply,
  updateComment,
  deleteComment,
} from "../../api/communityApi";
import Toast from "../../components/Toast";

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // 로그인 사용자
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 토스트
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });
  const hideToast = () => setToast(null);

  // 초기 게시글
  const initialPost = location.state?.post || null;
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost && !!id);
  const [error, setError] = useState(null);

  // 댓글 관련
  const [commentInput, setCommentInput] = useState("");
  const [commentItems, setCommentItems] = useState([]);
  const [cmtLoading, setCmtLoading] = useState(false);
  const [cmtLikeLoading, setCmtLikeLoading] = useState({});

  // 대댓글 열림 상태: { [commentId]: boolean }
  const [openReply, setOpenReply] = useState({});
  // 대댓글 입력값: { [commentId]: string }
  const [replyInput, setReplyInput] = useState({});
  // 대댓글 목록 캐시: { [commentId]: array }
  const [replyMap, setReplyMap] = useState({});
  // 수정 모드 상태
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // 게시글 조회
  useEffect(() => {
    if (!id || post) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id, userId);
        if (!alive) return;
        if (!data || data.success === false || !data.item) {
          setError("게시글을 찾을 수 없습니다.");
        } else {
          setPost(data.item); // 서버 응답 { item }
        }
      } catch {
        setError("게시글을 찾을 수 없습니다.");
      } finally {
        alive && setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, userId, post]);

  // 댓글 목록 초기 로드 (단 한 번)
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setCmtLoading(true);
        const res = await listComments(id, { userId });
        setCommentItems(res.items || []);
      } catch (e) {
        console.error(e);
        showToast("댓글을 불러오지 못했습니다.", "error");
      } finally {
        setCmtLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userId]);

  const ensureLogin = () => {
    if (!userId) {
      showToast("로그인 시 사용할 수 있어요!", "error");
      return false;
    }
    return true;
  };

  // 게시글 좋아요
  const handleToggleLike = async () => {
    if (!ensureLogin() || !post?._id) return;
    try {
      const res = await toggleLike(post._id, userId);
      const { liked, likes } = res;
      setPost((prev) => (prev ? { ...prev, liked, likes } : prev));
      window.dispatchEvent(new CustomEvent("COMMUNITY_LIKE_SYNC", { detail: { postId: post._id, liked, likes } }));
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
    }
  };

  // 댓글 작성
  const handleCreateComment = async () => {
    if (!ensureLogin()) return;
    const text = commentInput.trim();
    if (!text) return;

    try {
      const res = await createComment(id, text);
      if (res.ok) {
        setCommentItems((prev) => [res.item, ...prev]);
        setCommentInput("");
        // 댓글 수 증가 & 동기화 브로드캐스트
        setPost((p) => (p ? { ...p, comments: (p.comments ?? 0) + 1 } : p));
        window.dispatchEvent(
          new CustomEvent("COMMUNITY_COMMENT_SYNC", {
            detail: { postId: id, comments: (post?.comments ?? 0) + 1 },
          })
        );
      } else {
        showToast("댓글 등록 실패", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("댓글 등록 실패", "error");
    }
  };

  // 댓글 좋아요 토글
  const handleToggleCommentLike = async (commentId) => {
    if (!ensureLogin()) return;
    if (cmtLikeLoading[commentId]) return; // 연타 방지

    try {
      setCmtLikeLoading((m) => ({ ...m, [commentId]: true }));
      const res = await toggleCommentLike(commentId);
      setCommentItems((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, liked: res.liked, likes: res.likes } : c))
      );
    } catch (e) {
      console.error(e);
      showToast("댓글 좋아요 실패", "error");
    } finally {
      setCmtLikeLoading((m) => ({ ...m, [commentId]: false }));
    }
  };

  // 대댓글 열고/불러오기
  const toggleReplies = async (commentId) => {
    const open = !!openReply[commentId];
    setOpenReply((s) => ({ ...s, [commentId]: !open }));
    if (open) return; // 닫는 경우
    if (!replyMap[commentId]) {
      try {
        const res = await listReplies(commentId, { userId });
        setReplyMap((m) => ({ ...m, [commentId]: res.items }));
      } catch (e) {
        console.error(e);
        showToast("답글을 불러오지 못했습니다.", "error");
      }
    }
  };

  // 대댓글 작성
  const handleCreateReply = async (commentId) => {
    if (!ensureLogin()) return;
    const txt = (replyInput[commentId] || "").trim();
    if (!txt) return;

    try {
      const res = await createReply(commentId, txt);
      if (res.ok) {
        setReplyMap((m) => ({ ...m, [commentId]: [res.item, ...(m[commentId] || [])] }));
        setReplyInput((i) => ({ ...i, [commentId]: "" }));
        // UI 카운트도 반영
        setCommentItems((prev) => prev.map((c) => (c._id === commentId ? { ...c, replies: (c.replies ?? 0) + 1 } : c)));
        setPost((p) => (p ? { ...p, comments: (p.comments ?? 0) + 1 } : p));
        window.dispatchEvent(
          new CustomEvent("COMMUNITY_COMMENT_SYNC", {
            detail: { postId: id, comments: (post?.comments ?? 0) + 1 },
          })
        );
      }
    } catch (e) {
      console.error(e);
      showToast("답글 등록 실패", "error");
    }
  };

  // 수정 모드 진입
  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.content || "");
  };

  // 수정 저장
  const saveEdit = async (commentId, isReply = false, parentId = null) => {
    if (!ensureLogin()) return;
    const text = (editText || "").trim();
    if (!text) return;
    try {
      setEditLoading(true);
      await updateComment(commentId, text);
      if (!isReply) {
        setCommentItems((prev) => prev.map((c) => (c._id === commentId ? { ...c, content: text } : c)));
      } else {
        setReplyMap((m) => ({
          ...m,
          [parentId]: (m[parentId] || []).map((r) => (r._id === commentId ? { ...r, content: text } : r)),
        }));
      }
      setEditingId(null);
      setEditText("");
      showToast("수정되었습니다.");
    } catch (e) {
      console.error(e);
      showToast("수정 실패", "error");
    } finally {
      setEditLoading(false);
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // 삭제
  const removeComment = async (commentId, isReply = false, parentId = null) => {
    if (!ensureLogin()) return;
    if (!window.confirm("삭제하시겠어요?")) return;

    try {
      const res = await deleteComment(commentId);
      if (res?.ok) {
        if (!isReply) {
          // 최상위 댓글 삭제
          setCommentItems((prev) => prev.filter((c) => c._id !== commentId));
        } else {
          // 대댓글 삭제
          setReplyMap((m) => ({
            ...m,
            [parentId]: (m[parentId] || []).filter((r) => r._id !== commentId),
          }));
          // 부모 댓글의 replies -1
          setCommentItems((prev) =>
            prev.map((c) => (c._id === parentId ? { ...c, replies: Math.max((c.replies ?? 1) - 1, 0) } : c))
          );
        }
        // 전체 댓글 카운트 감소(서버가 알아서 깎지만, 클라 UI도 반영)
        setPost((p) => (p ? { ...p, comments: Math.max((p.comments ?? 1) - 1, 0) } : p));
        showToast("삭제되었습니다.");
      } else {
        showToast(res?.message || "삭제 실패", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("삭제 실패", "error");
    }
  };

  // 안전한 필드 매핑
  const view = useMemo(() => {
    if (!post) return null;
    return {
      title: post.title || "",
      content: post.content || "",
      nickname: post.nickname || "익명",
      profileImg: post.profileImg || post.profileImageUrl || "/assets/images/profiles/profile.jpg",
      musicTitle: post.musicTitle || "",
      musicArtist: post.musicArtist || "",
      likes: post.likes ?? 0,
      liked: !!post.liked,
      comments: post.comments ?? 0,
      userId: post.user || post.userId || post.authorId || null, // 게시글 작성자 비교용
      createdAt: post.createdAt || post.created_at || null,     // ← 작성일 추가
    };
  }, [post]);

  if (loading) {
    return (
      <Post.Wrapper>
        <Post.Top>
          <Post.Back onClick={() => navigate(-1)}>←</Post.Back>
          <Post.Tab>전체 글</Post.Tab>
        </Post.Top>
        <div>불러오는 중…</div>
      </Post.Wrapper>
    );
  }
  if (error || !view) {
    return (
      <Post.Wrapper>
        <Post.Top>
          <Post.Back onClick={() => navigate(-1)}>←</Post.Back>
          <Post.Tab>전체 글</Post.Tab>
        </Post.Top>
        <div>{error || "게시글을 찾을 수 없습니다."}</div>
      </Post.Wrapper>
    );
  }

  return (
    <Post.Wrapper>
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} duration={2000} />}

      <Post.Top>
        <Post.Back onClick={() => navigate(-1)}>←</Post.Back>
        <Post.Tab>전체 글</Post.Tab>
      </Post.Top>

      <Post.Card>
        <Post.Header>
          <Post.LeftInfo>
            <Post.Profile src={view.profileImg} alt="profile" />
            <Post.TitleWrapper>
              <span className="title">{view.title}</span>
              <span className="author">{view.nickname}</span>
            </Post.TitleWrapper>
          </Post.LeftInfo>

        <Post.RightInfo>
            <Post.IconGroup>
              <Post.Icon onClick={handleToggleLike}>
                <img
                  src={view.liked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"}
                  alt="like"
                />
              </Post.Icon>
              <span>{view.likes}</span>
            </Post.IconGroup>

            <Post.IconGroup title="댓글 수">
              <img src="/assets/images/icons/svg/comment.svg" alt="comment" />
              <span>{view.comments}</span>
            </Post.IconGroup>
          </Post.RightInfo>
        </Post.Header>

        <Post.Content>{view.content}</Post.Content>
        <Post.Divider />

        <Post.MusicRow>
          <Post.Music>
            <span role="img" aria-label="music">🎵</span>
            <span className="music-name">{view.musicTitle}</span>
            <span className="artist">{view.musicArtist}</span>
          </Post.Music>

          {/* 작성일 (댓글 날짜와 동일 톤) */}
          {view.createdAt && (
            <Post.PostDate>{new Date(view.createdAt).toLocaleDateString("ko-KR")}</Post.PostDate>
          )}
        </Post.MusicRow>
      </Post.Card>

      {/* 댓글 */}
      <Post.CommentBox>
        <h4>댓글</h4>
        <Post.InputWrapper>
          <input
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateComment()}
          />
          <button onClick={handleCreateComment}>등록</button>
        </Post.InputWrapper>

        {commentItems.map((c, idx) => {
          const dateStr = new Date(c.createdAt).toLocaleDateString("ko-KR");
          const isCommentOwner = String(c.user?._id || "") === String(userId || "");
          const isPostOwner = String(view.userId || "") === String(userId || "");
          const canEdit = isCommentOwner;
          const canDelete = isCommentOwner || isPostOwner;
          const inEdit = editingId === c._id;

          return (
            <div key={c._id}>
              <Post.Comment>
                <Post.CommentProfile
                  src={c.user?.profileImg || "/assets/images/profiles/profile.jpg"}
                  alt="comment-profile"
                />

                <Post.CommentContent>
                  {/* 1) 닉네임(좌) / 아이콘(우) */}
                  <Post.CommentHeader>
                    <div className="left">
                      <strong className="nick">{c.user?.nickname || "익명"}</strong>

                      {(canEdit || canDelete) && (
                        <Post.CommentActions>
                          {canEdit && (
                            <>
                              {!inEdit ? (
                                <button type="button" onClick={() => startEdit(c)}>
                                  수정
                                </button>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    disabled={editLoading}
                                    onClick={() => saveEdit(c._id, false, null)}
                                  >
                                    저장
                                  </button>
                                  <span className="sep">|</span>
                                  <button type="button" onClick={cancelEdit}>
                                    취소
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          {canEdit && canDelete && !inEdit && <span className="sep">|</span>}
                          {canDelete && !inEdit && (
                            <button type="button" onClick={() => removeComment(c._id, false, null)}>
                              삭제
                            </button>
                          )}
                        </Post.CommentActions>
                      )}
                    </div>

                    <div className="right">
                      <Post.CmtIcon
                        onClick={() => handleToggleCommentLike(c._id)}
                        title="좋아요"
                        style={{
                          opacity: cmtLikeLoading[c._id] ? 0.5 : 1,
                          pointerEvents: cmtLikeLoading[c._id] ? "none" : "auto",
                        }}
                      >
                        <img
                          src={
                            c.liked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"
                          }
                          alt="comment-like"
                        />
                        <i>{c.likes ?? 0}</i>
                      </Post.CmtIcon>

                      <Post.CmtIcon onClick={() => toggleReplies(c._id)} title="답글">
                        <img src="/assets/images/icons/svg/comment.svg" alt="replies" />
                        <i>{c.replies ?? 0}</i>
                      </Post.CmtIcon>
                    </div>
                  </Post.CommentHeader>

                  {/* 2) 본문 (수정 모드면 입력창) */}
                  {!inEdit ? (
                    <p className="body">{c.content}</p>
                  ) : (
                    <Post.EditInput
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="내용을 수정하세요"
                    />
                  )}

                  {/* 3) 날짜 (본문 아래) */}
                  <span className="date-under">{dateStr}</span>

                  {/* 4) 대댓글 */}
                  {openReply[c._id] && (
                    <Post.ReplyBlock>
                      <Post.ReplyInputRow>
                        <input
                          placeholder="답글을 입력하세요"
                          value={replyInput[c._id] || ""}
                          onChange={(e) => setReplyInput((m) => ({ ...m, [c._id]: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && handleCreateReply(c._id)}
                        />
                        <button onClick={() => handleCreateReply(c._id)}>등록</button>
                      </Post.ReplyInputRow>

                      {(replyMap[c._id] || []).map((r) => {
                        const rDate = new Date(r.createdAt).toLocaleDateString("ko-KR");
                        const rOwner = String(r.user?._id || "") === String(userId || "");
                        const canEditR = rOwner; // 대댓글 수정: 작성자만
                        const canDeleteR = rOwner || isPostOwner; // 삭제: 대댓글 작성자 or 게시글 작성자
                        const inEditR = editingId === r._id;

                        return (
                          <Post.ReplyRow key={r._id}>
                            <Post.CommentProfile
                              src={r.user?.profileImg || "/assets/images/profiles/profile.jpg"}
                              alt="reply-profile"
                            />
                            <div className="reply-inner">
                              <Post.CommentHeader>
                                <div className="left">
                                  <strong className="nick small">{r.user?.nickname || "익명"}</strong>

                                  {(canEditR || canDeleteR) && (
                                    <Post.CommentActions>
                                      {canEditR && (
                                        <>
                                          {!inEditR ? (
                                            <button type="button" onClick={() => startEdit(r)}>
                                              수정
                                            </button>
                                          ) : (
                                            <>
                                              <button
                                                type="button"
                                                disabled={editLoading}
                                                onClick={() => saveEdit(r._id, true, c._id)}
                                              >
                                                저장
                                              </button>
                                              <span className="sep">|</span>
                                              <button type="button" onClick={cancelEdit}>
                                                취소
                                              </button>
                                            </>
                                          )}
                                        </>
                                      )}
                                      {canEditR && canDeleteR && !inEditR && <span className="sep">|</span>}
                                      {canDeleteR && !inEditR && (
                                        <button type="button" onClick={() => removeComment(r._id, true, c._id)}>
                                          삭제
                                        </button>
                                      )}
                                    </Post.CommentActions>
                                  )}
                                </div>
                                <div className="right" />
                              </Post.CommentHeader>

                              {!inEditR ? (
                                <p className="body">{r.content}</p>
                              ) : (
                                <Post.EditInput
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  placeholder="내용을 수정하세요"
                                />
                              )}

                              <span className="date-under">{rDate}</span>
                            </div>
                          </Post.ReplyRow>
                        );
                      })}
                    </Post.ReplyBlock>
                  )}
                </Post.CommentContent>
              </Post.Comment>

              {/* 댓글 사이 디바이더 */}
              {idx < commentItems.length - 1 && <Post.CommentDivider />}
            </div>
          );
        })}
      </Post.CommentBox>
    </Post.Wrapper>
  );
};

export default PostDetail;