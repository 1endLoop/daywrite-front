// src/pages/community/CommunityCard.jsx
import { useState } from "react";
import Card from "./community.card.style";

const CommunityCard = ({ data, onClick }) => {
  const {
    content = "",
    title = "",
    // refAuthor 는 표시 보류 (추후 참조글 배지/표시 예정)
    musicTitle = "",
    musicArtist = "",
    profileImg = data?.profileImg || data?.profileImageUrl || "",
    nickname = "익명",
    likes = 0,
    comments = 0,
  } = data;

  const [liked, setLiked] = useState(false);
  const [musicLiked, setMusicLiked] = useState(false);

  return (
    <Card.Card>
      <Card.Header>
        <Card.LeftInfo>
          <Card.Profile src={profileImg || "/assets/images/profiles/profile.jpg"} alt="profile" />
          <Card.TitleWrapper>
            <span className="title">{title}</span>
            <span className="author">{nickname}</span>
          </Card.TitleWrapper>
        </Card.LeftInfo>
        <Card.RightInfo>
          <Card.IconGroup>
            <Card.Icon onClick={() => setLiked((prev) => !prev)}>
              <img
                src={liked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"}
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
          <span role="img" aria-label="music">
            🎵
          </span>
          <span className="music-name">{musicTitle}</span>
          <span className="artist">{musicArtist}</span>
        </Card.MusicLeft>
      </Card.MusicInfo>
    </Card.Card>
  );
};

export default CommunityCard;
