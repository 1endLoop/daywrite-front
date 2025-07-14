import styled from "styled-components";

const Card = {}

Card.Card = styled.div`
  width:205px;
  min-width:205px;
  background-color: #fff;
  padding: 24px 22px 24px 22px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);
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
  gap: 12px;
`;

Card.Profile = styled.img`
  width: 36px;
  height: 36px;
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

  .author-title {
    font-size: 16px;
    font-weight: 600;
    color: #131313;
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
  gap: 8px;
  font-size: 13px;
  color: #444;
`;

Card.LikeIcon = styled.img`
  width: 16px;
`;

Card.CommentIcon = styled.img`
  width: 16px;
`;


Card.Content = styled.p`
  font-size: 15px;
  color: #282828;
  line-height: 1.7;
  margin-bottom: 20px;

  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

Card.Divider = styled.div`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0 0 20px 0;
`

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

Card.Icon = styled.span`
  font-size: 14px;
`;

Card.Action = styled.div`
  font-size: 14px;
  cursor: pointer;
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
