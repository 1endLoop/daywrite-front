import styled from 'styled-components';

const P = {};

P.PopupContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 30px;
  width: 350px;
  background: white;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  padding: 24px 30px 36px 30px;
  z-index: 1000;
`;

P.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

P.Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

P.CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;


P.Separator = styled.hr`
  margin-top: 14px;
  margin-bottom: 24px;
  border: 0;
  border-top: 1px solid #282828;
`;

P.List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

P.Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

P.ArtistWrap = styled.div`
  display: flex;
  align-items: center; 
  gap: 12px;

  img {
    width: 48px;
    height: 48px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 4px;
    border: 0.1px solid #000;
    flex-shrink: 0; 
  }
`;


P.TitleWrap = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
  display: inline-flex;
`

P.SongTitle = styled.p`
  font-weight: 500;
  margin: 0;
`;

P.Artist = styled.p`
  font-size: 14px;
  margin: 2px 0 0;
  color: #666;
`;

P.HeartBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;


export default P;
