import React from 'react'
import Card from "./community.popularCard.style";
const CommunityPopularCard=({ data, onClick }) => {
  //객체 구조 분해 할당
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

  return (
    <Card.Card onClick={onClick}>
      <Card.Header>
        <Card.LeftInfo>
          <Card.Profile src={profileImg ||  "../assets/images/profiles/profile2.jpeg"} alt="profile" />
          <Card.TitleWrapper>
            <span className="author-title ">{author}</span>
            {/* <span className="author">{author}</span> */}
          </Card.TitleWrapper>
        </Card.LeftInfo>
        <Card.RightInfo>
          <Card.LikeIcon src="../assets/images/icons/svg/thumb=off.svg" alt="like" />
          <span>{likes}</span>
          <Card.CommentIcon src="../assets/images/icons/svg/comment.svg" alt="comment" />
          <span>{comments}</span>
        </Card.RightInfo>
      </Card.Header>

      <Card.Content>{content}</Card.Content>
      <Card.Divider />
      <Card.MusicInfo>
        <Card.MusicLeft>

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





export default CommunityPopularCard