import React from "react";
import Post from "./post.detail.style";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// ✅ 임시 더미데이터
const dummyData = [
  {
    id: 1,
    content: "여러 변덕스러운 우연이, 지쳐버린 타인이, 그리고 누구보다...",
    title: "서울대학교 졸업식 축사",
    author: "허준이",
    music: "Love on Top",
    artist: "John Canada",
    profileImg: "",
    likes: 121,
    comments: 36,
    commentList: [],
  },
  {
    id: 2,
    content: "여러 변덕스러운 우연이, 지쳐버린 타인이, 그리고 누구보다...",
    title: "내가 틀릴 수도 있습니다",
    author: "조짱희",
    music: "Rainy Days",
    artist: "Lee Moon",
    profileImg: "",
    likes: 98,
    comments: 24,
    commentList: [],
  },
];

const PostDetail = () => {
  // 좋아요 토글 버튼
  const [liked, setLiked] = useState(true);
  const [musicLiked, setMusicLiked] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // ✅ URL 파라미터 추출

  // 1. location.state로 넘어온 post 우선 사용
  // 2. 없으면 dummyData에서 id로 찾기
  const post = location.state?.post || dummyData.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Post.Wrapper>
        <Post.Top>
          <Post.Back onClick={() => navigate(-1)}>←</Post.Back>
          <Post.Tab>전체 글</Post.Tab>
        </Post.Top>
        <div>게시글을 찾을 수 없습니다.</div>
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
            <Post.Profile src={post.profileImg || "../assets/images/profiles/profile2.jpeg"} />
            <Post.TitleWrapper>
              <span className="title">{post.title}</span>
              <span className="author">{post.author}</span>
            </Post.TitleWrapper>
          </Post.LeftInfo>

          <Post.RightInfo>
            <Post.IconGroup>
              <Post.Icon onClick={() => setLiked((prev) => !prev)}>
                <img
                  src={liked ? "../assets/images/icons/svg/thumb=on.svg" : "../assets/images/icons/svg/thumb=off.svg"}
                  alt="like"
                />
              </Post.Icon>

              <span>{post.likes}</span>
            </Post.IconGroup>
            <Post.IconGroup>
              <img src="/assets/images/icons/svg/comment.svg" alt="comment" />
              <span>{post.comments}</span>
            </Post.IconGroup>
          </Post.RightInfo>
        </Post.Header>

        <Post.Content>{post.content}</Post.Content>
        <Post.Divider />
        <Post.MusicRow>
          <Post.Music>
            <Post.Icon onClick={() => setMusicLiked((prev) => !prev)}>
              <img
                src={musicLiked ? "../assets/images/icons/svg/like=on.svg" : "../assets/images/icons/svg/like=off.svg"}
                alt="like"
              />
            </Post.Icon>
            <span role="img" aria-label="music">
              🎵
            </span>
            <span className="music-name">{post.music}</span>
            <span className="artist">{post.artist}</span>
          </Post.Music>

          <Post.Write>이 글 작성하기</Post.Write>
        </Post.MusicRow>
      </Post.Card>

      <Post.CommentBox>
        <h4>댓글</h4>
        <Post.InputWrapper>
          <input placeholder="댓글을 입력하세요" />
          <button>등록</button>
        </Post.InputWrapper>

        {post.commentList?.map((c) => (
          <Post.Comment key={c.id}>
            <Post.CommentProfile src={c.profile} />
            <Post.CommentContent>
              <Post.CommentTop>
                <strong>{c.user}</strong>
                <span className="org">{c.org}</span>
              </Post.CommentTop>
              <p>{c.text}</p>
              <Post.CommentBottom>
                <span>{c.date}</span>
                <span role="img" aria-label="like">
                  👍
                </span>{" "}
                {post.likes}
                <span role="img" aria-label="comment">
                  💬
                </span>{" "}
                {post.comments}
              </Post.CommentBottom>
            </Post.CommentContent>
          </Post.Comment>
        ))}
      </Post.CommentBox>
    </Post.Wrapper>
  );
};

export default PostDetail;
