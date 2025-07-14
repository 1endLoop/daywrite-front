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
  margin-bottom: 10px;
`;

Card.HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .title {
    font-size: 16px;
    font-weight: 600;
    color: #282828;
  }

  .author {
    font-size: 13px;
    color: #787878;
  }
`;

Card.Icon = styled.span`
  cursor: pointer;
`;

Card.LikeIcon = styled.div`
  font-size: 18px;
  cursor: pointer;
  vertical-align: middle; // 또는 position + top 조정도 가능
`;

Card.Content = styled.p`
  font-size: 15px;
  color: #282828;
  line-height: 1.7;
  margin-bottom: 20px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  cursor: pointer;
`;

Card.Divider = styled.div`
  border-top: 1px solid #e0e0e0;
  margin: 0 0 20px 0;
`;

Card.BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Card.Action = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

Card.MusicInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #333;

  .music-name {
    font-weight: 500;
  }

  .artist {
    color: #999;
  }
`;

Card.Date = styled.div`
  font-size: 13px;
  color: #787878;
`;

export default Card;
