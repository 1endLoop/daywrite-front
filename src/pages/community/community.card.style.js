import styled from "styled-components";

const Card = {};

Card.Card = styled.div`
  background-color: #fff;
  padding: 24px 22px 24px 22px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.08); */
  font-family: pretendard;
`;

Card.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

Card.LeftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

Card.Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

Card.TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #131313;
  }

  .author {
    font-size: 13px;
    color: #888;
  }
`;

Card.Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e0e0e0;
  margin: 16px 0;
`;

Card.Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #131313;
`;

Card.Author = styled.div`
  font-size: 13px;
  color: #888;
`;

Card.RightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* 좋아요/댓글 묶음 사이 간격 넓힘 */
  font-size: 15px;
  color: #444;
`;

Card.IconGroup = styled.div`
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

Card.RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* 아이콘과 숫자 간 간격 */
`;

Card.Icon = styled.div`
  cursor: pointer;
`;

Card.Content = styled.p`
  font-size: 15px;
  color: #282828;
  line-height: 1.7;
  margin-bottom: 20px;
  padding: 0 2px;
  cursor: pointer;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
`;

Card.Divider = styled.div`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0 0 20px 0;
`;

Card.MetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Card.MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .title {
    font-size: 14px;
    color: #282828;
    font-weight: 500;
  }

  .author {
    font-size: 13px;
    color: #787878;
  }
`;

Card.MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

Card.MusicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #333;
`;

Card.MusicLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .music-name {
    font-weight: 500;
  }

  .artist {
    color: #999;
  }
`;

Card.MusicRight = styled.div`
  font-size: 16px;
`;

export default Card;
