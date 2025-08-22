// src/pages/community/CommunityPopularCard.jsx
import React from "react";
import Card from "./community.popularCard.style";
const CommunityPopularCard = ({ data, onClick, onToggleLike }) => {
  const {
    _id,
    content,
    title,
    author,
    music,
    artist,
    profileImg = "",
    likes = 0,
    liked = false,
    comments = 0,
  } = data;

  return (
    <Card.Card onClick={onClick}>
      <Card.Header>
        <Card.LeftInfo>
          <Card.Profile src={profileImg || "../assets/images/profiles/profile2.jpeg"} alt="profile" />
          <Card.TitleWrapper>
            <span className="author-title">{author}</span>
          </Card.TitleWrapper>
        </Card.LeftInfo>

        <Card.RightInfo>
          <Card.LikeIcon
            as="img"
            src={liked ? "../assets/images/icons/svg/thumb=on.svg" : "../assets/images/icons/svg/thumb=off.svg"}
            alt="like"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike?.(_id);
            }}
            style={{ cursor: "pointer" }}
          />
          <span>{likes}</span>
          <Card.CommentIcon src="../assets/images/icons/svg/comment.svg" alt="comment" />
          <span>{comments}</span>
        </Card.RightInfo>
      </Card.Header>

      <Card.Content>{content}</Card.Content>
      <Card.Divider />
      <Card.MusicInfo>
        <Card.MusicLeft>
          <span role="img" aria-label="music">🎵</span>
          <span className="music-name">{music}</span>
          <span className="artist">{artist}</span>
        </Card.MusicLeft>
      </Card.MusicInfo>
    </Card.Card>
  );
};

export default CommunityPopularCard;