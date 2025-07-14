import Card from "./liked.card.style";
import { useState } from "react";

const LikedCard = ({ data }) => {
  const { date, content, title, author, music, artist } = data;

  // 좋아요 토글 버튼
  const [liked, setLiked] = useState(true);
  const [musicLiked, setMusicLiked] = useState(true);

  return (
    <Card.Card>
      <Card.Header>
        <Card.HeaderLeft>
          <span className="title">{title}</span>
          <span className="author">{author}</span>
        </Card.HeaderLeft>

        <Card.Icon onClick={() => setLiked((prev) => !prev)}>
          <img
            src={liked ? "../assets/images/icons/svg/thumb=on.svg" : "../assets/images/icons/svg/thumb=off.svg"}
            alt="like"
          />
        </Card.Icon>
      </Card.Header>
      <Card.Content>{content}</Card.Content>

      <Card.Divider />

      <Card.BottomWrapper>
        <Card.MusicInfo>
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
        </Card.MusicInfo>

        <Card.Date>{date}</Card.Date>
      </Card.BottomWrapper>
    </Card.Card>
  );
};

export default LikedCard;
