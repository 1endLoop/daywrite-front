// src/pages/community/PostDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import Post from "./post.detail.style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../../api/communityApi";

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // 좋아요 토글 버튼 (UI용)
  const [liked, setLiked] = useState(false);
  const [musicLiked, setMusicLiked] = useState(false);

  // 1차: 라우팅 state로 넘어온 post
  const initialPost = location.state?.post || null;

  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost && !!id);
  const [error, setError] = useState(null);

  // 필요시 서버 조회
  useEffect(() => {
    if (post || !id) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id);
        if (!alive) return;
        if (!data) {
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
    return () => {
      alive = false;
    };
  }, [id, post]);

  // 안전한 필드 매핑
  const view = useMemo(() => {
    if (!post) return null;
    return {
      title: post.title || "",
      content: post.content || "",
      // 작성자 닉네임
      nickname: post.nickname || "익명",
      // 프로필 이미지 (백엔드에 profileImg로 저장)
      profileImg: post.profileImg || post.profileImageUrl || "/assets/images/profiles/profile.jpg",
      // 음악: DB 필드명은 musicTitle, musicArtist
      musicTitle: post.musicTitle || "",
      musicArtist: post.musicArtist || "",
      likes: post.likes ?? 0,
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
              {/* 작성자 표시는 저자(author) 대신 '닉네임' */}
              <span className="author">{view.nickname}</span>
            </Post.TitleWrapper>
          </Post.LeftInfo>

          <Post.RightInfo>
            <Post.IconGroup>
              <Post.Icon onClick={() => setLiked((prev) => !prev)}>
                <img
                  src={liked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"}
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
            <Post.Icon onClick={() => setMusicLiked((prev) => !prev)}>
              <img
                src={musicLiked ? "/assets/images/icons/svg/like=on.svg" : "/assets/images/icons/svg/like=off.svg"}
                alt="like"
              />
            </Post.Icon>
            <span role="img" aria-label="music">🎵</span>
            {/* ✅ 음악 필드 교체 (music → musicTitle, artist → musicArtist) */}
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