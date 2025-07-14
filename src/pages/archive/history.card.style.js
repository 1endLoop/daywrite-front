import styled from "styled-components";

const Card = {};

Card.Card = styled.div`
  background-color: #fff;
  padding: 24px 22px 24px 22px;
  border: ${({ selected }) => (selected ? "1px solid #f96f3d" : "1px solid #e0e0e0")};
  border-radius: 5px;
  font-family: pretendard;
  transition: border 0.2s ease;
  cursor: pointer;
`;

Card.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

Card.Date = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 12px;
`;

Card.MoreBtn = styled.div`
  cursor: pointer;
  font-size: 18px;
  color: #666;
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
  gap: 7px;
`;

Card.Icon = styled.span`
  cursor: pointer;
`;

Card.Music = styled.div`
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

export default Card;
