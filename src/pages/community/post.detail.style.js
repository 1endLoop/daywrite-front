import styled from "styled-components";

const Post = {};

Post.Wrapper = styled.div`
  padding: 40px 0;
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

Post.Write = styled.div`
  font-size: 13px;
  color: #999;
  cursor: pointer;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

Post.CommentBox = styled.div`
  margin-top: 40px;
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
  }

  button {
    background-color: #ff6f3f;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
`;

Post.Comment = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

Post.CommentProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
`;

Post.CommentContent = styled.div``;

Post.CommentTop = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .org {
    font-size: 13px;
    color: #888;
  }
`;

Post.CommentBottom = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

export default Post;
