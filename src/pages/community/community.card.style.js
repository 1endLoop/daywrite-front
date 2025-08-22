import styled from "styled-components";

const Card = {};

Card.Card = styled.div`
  background-color: #fff;
  padding: 24px 22px 24px 22px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
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

Card.RightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  position: relative;
  display: flex;
  align-items: center;
`;

Card.MoreBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  padding: 4px 6px;
  line-height: 1;
  border-radius: 6px;

  &:hover {
    background: #f5f5f5;
  }
`;

export default Card;