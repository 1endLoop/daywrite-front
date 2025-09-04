import styled from "styled-components";

const Post = {};

Post.Wrapper = styled.div`
  padding: 40px 0;
  font-family: "Pretendard", sans-serif;
`;

Post.Top = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

Post.Back = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

Post.Tab = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

Post.Card = styled.div`
  border: 1px solid #ddd;
  padding: 24px;
  border-radius: 6px;
  margin-bottom: 32px;
`;

Post.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Post.Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

Post.LeftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

Post.Info = styled.div`
  flex: 1;
  margin-left: 12px;
`;

Post.TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #131313;
    line-height: 1.2;
  }

  .author {
    font-size: 13px;
    color: #888;
    line-height: 1;
    position: relative;
  }
`;

Post.RightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

Post.IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 15px;
    color: #333;
  }
`;

Post.Icon = styled.div`
  cursor: pointer;
`;

Post.Content = styled.p`
  margin: 20px 0;
  color: #282828;
  line-height: 1.7;
  font-size: 15px;
  text-align: justify;
`;

Post.Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

Post.MusicRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

Post.Music = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;

  .music-name {
    font-weight: 500;
  }

  .artist {
    color: #888;
  }
`;

/* ← 작성일 스타일 (댓글 날짜와 동일 톤) */
Post.PostDate = styled.span`
  font-size: 13px;
  color: #999;
  white-space: nowrap;
`;

Post.Write = styled.div`
  font-size: 13px;
  color: #999;
  cursor: pointer;
  white-space: nowrap;
`;

/* ===== 댓글 영역 ===== */

Post.CommentBox = styled.div`
  margin-top: 40px;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #131313;
  }
`;

Post.InputWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  margin-bottom: 24px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    outline: none;
    font-size: 14px;
    font-family: "Pretendard", sans-serif;
  }

  button {
    background-color: #ff6f3f;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 14px;
  }
`;

Post.Comment = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 0 16px;
`;

Post.CommentProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

Post.CommentContent = styled.div`
  flex: 1;
  margin-top: 2px;
  font-size: 15px;
  line-height: 1.6;
  color: #131313;
  font-family: "Pretendard", sans-serif;

  .body {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .date-under {
    display: inline-block;
    font-size: 12px;
    color: #999;
  }
`;

/* 닉네임(좌) / 아이콘(우): 같은 줄 */
Post.CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nick {
    font-size: 14px; /* 닉네임은 본문보다 작게 */
    font-weight: 700; /* Bold */
    color: #131313;
  }

  .nick.small {
    font-size: 14px;
  }

  .right {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    gap: 12px;
  }
`;

Post.CmtIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }
  i {
    font-style: normal;
    font-size: 14px;
    color: #666;
  }
`;

/* 댓글 사이 디바이더 (입력창 테두리색과 동일) */
Post.CommentDivider = styled.div`
  height: 1px;
  background-color: #ddd; /* 인풋 border와 통일 */
  margin: 16px 0;
`;

/* ===== 답글 영역 ===== */

Post.ReplyBlock = styled.div`
  margin-top: 20px;
`;

/* 답글 입력창: 댓글 입력창과 동일 규격(폭/스타일) */
Post.ReplyInputRow = styled.div`
  display: flex;
  gap: 0;
  margin: 8px 0 22px;

  input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ddd; /* 댓글 입력창과 동일 */
    border-radius: 4px 0 0 4px; /* 좌측 라운드 */
    outline: none;
    font-size: 14px;
    font-family: "Pretendard", sans-serif;
  }
  button {
    background-color: #ff6f3f;
    color: #fff;
    border: none;
    padding: 0 16px;
    border-radius: 0 4px 4px 0; /* 우측 라운드 */
    cursor: pointer;
    font-size: 14px;
  }
`;

Post.ReplyRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  font-family: "Pretendard", sans-serif;

  .reply-inner {
    flex: 1;
  }

  p.body {
    font-size: 15px;
    line-height: 1.6;
    color: #131313;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

Post.CommentActions = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #999;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  button {
    padding: 0;
    background: none;
    border: none;
    color: #999;
    font-size: 12px;
    cursor: pointer;
  }

  .sep {
    color: #ddd;
  }
`;

Post.EditInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  font-family: "Pretendard", sans-serif;
  line-height: 1.6;
  min-height: 64px;
  resize: vertical;
  margin: 6px 0 8px;
`;

export default Post;