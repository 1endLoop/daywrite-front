// src/pages/community/PostDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import Post from "./post.detail.style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchPostById, toggleLike } from "../../api/communityApi";
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

  // 1차: 라우팅 state로 넘어온 post
  const initialPost = location.state?.post || null;

  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost && !!id);
  const [error, setError] = useState(null);

  // 필요시 서버 조회 (liked 포함 위해 userId 전달)
  useEffect(() => {
    if (!id || post) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id, userId); // ← userId도 넘겨서 liked 계산 받기
        if (!alive) return;
        if (!data || data.success === false) {
          setError("게시글을 찾을 수 없습니다.");
        } else {
          setPost(data);
        }
      } catch (e) {
        setError("게시글을 찾을 수 없습니다.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id, userId, post]);

  // 좋아요 토글
  const ensureLogin = () => {
    if (!userId) {
      showToast("로그인 시 사용할 수 있어요!", "error");
      return false;
    }
    return true;
  };

  const handleToggleLike = async () => {
    if (!ensureLogin() || !post?._id) return;
    try {
      const res = await toggleLike(post._id, userId); // { liked, likes }
      const { liked, likes } = res;

      // 1) 상세 화면 즉시 반영
      setPost((prev) => (prev ? { ...prev, liked, likes } : prev));

      // 2) (선택) 홈/목록 등 다른 화면에도 즉시 반영되게 브로드캐스트
      //    듣는 쪽이 없으면 무시되므로 안전합니다.
      window.dispatchEvent(new CustomEvent("COMMUNITY_LIKE_SYNC", {
        detail: { postId: post._id, liked, likes }
      }));
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
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
      liked: !!post.liked, // 👈 서버/상태의 liked 사용
      comments: post.comments ?? 0,
      commentList: post.commentList || [],
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

            <Post.IconGroup>
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

          <Post.Write onClick={() => navigate("/community/write")}>이 글 작성하기</Post.Write>
        </Post.MusicRow>
      </Post.Card>

      <Post.CommentBox>
        <h4>댓글</h4>
        <Post.InputWrapper>
          <input placeholder="댓글을 입력하세요" />
          <button>등록</button>
        </Post.InputWrapper>

        {view.commentList.map((c) => (
          <Post.Comment key={c.id || c._id}>
            <Post.CommentProfile src={c.profile || "/assets/images/profiles/profile.jpg"} alt="comment-profile" />
            <Post.CommentContent>
              <Post.CommentTop>
                <strong>{c.user || c.nickname || "익명"}</strong>
                {c.org && <span className="org">{c.org}</span>}
              </Post.CommentTop>
              <p>{c.text}</p>
              <Post.CommentBottom>
                <span>{c.date}</span>
                <span role="img" aria-label="like">👍</span> {c.likes ?? 0}
                <span role="img" aria-label="comment">💬</span> {c.comments ?? 0}
              </Post.CommentBottom>
            </Post.CommentContent>
          </Post.Comment>
        ))}
      </Post.CommentBox>
    </Post.Wrapper>
  );
};

export default PostDetail;