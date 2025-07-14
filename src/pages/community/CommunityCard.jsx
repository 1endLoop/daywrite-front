import { useState } from "react";
import Card from "./community.card.style";

const CommunityCard = ({ data, onClick }) => {
  const {
    content,
    title,
    author,
    music,
    artist,
    profileImg = "", // ❗️이미지 없어도 에러 안 나게 기본값 처리
    likes = 0,
    comments = 0,
  } = data;

  // 좋아요 토글 버튼
  const [liked, setLiked] = useState(true);
  const [musicLiked, setMusicLiked] = useState(true);

  return (
    <Card.Card>
      <Card.Header>
        <Card.LeftInfo>
          <Card.Profile src={profileImg || "../assets/images/profiles/profile2.jpeg"} alt="profile" />
          <Card.TitleWrapper>
            <span className="title">{title}</span>
            <span className="author">{author}</span>
          </Card.TitleWrapper>
        </Card.LeftInfo>
        <Card.RightInfo>
            <Card.IconGroup>
              <Card.Icon onClick={() => setLiked((prev) => !prev)}>
                <img
                  src={liked ? "../assets/images/icons/svg/thumb=on.svg" : "../assets/images/icons/svg/thumb=off.svg"}
                  alt="like"
                />
              </Card.Icon>

              <span>{likes}</span>
            </Card.IconGroup>
            <Card.IconGroup>
              <img src="/assets/images/icons/svg/comment.svg" alt="comment" />
              <span>{comments}</span>
            </Card.IconGroup>
        </Card.RightInfo>
      </Card.Header>

      <Card.Content onClick={onClick}>{content}</Card.Content>
      <Card.Divider />
      <Card.MusicInfo>
        <Card.MusicLeft>
          <Card.Icon onClick={() => setMusicLiked((prev) => !prev)}>
            <img
              src={musicLiked ? "../assets/images/icons/svg/like=on.svg" : "../assets/images/icons/svg/like=off.svg"}
              alt="like"
            />
          </Card.Icon>
          <span role="img" aria-label="music">
            🎵
          </span>
          <span className="music-name">{music}</span>
          <span className="artist">{artist}</span>
        </Card.MusicLeft>
      </Card.MusicInfo>
    </Card.Card>
  );
};

export default CommunityCard;
