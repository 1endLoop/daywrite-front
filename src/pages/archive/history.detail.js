import styled from "styled-components";

const S = {};

S.Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

S.Modal = styled.div`
  background: #fff;
  width: 680px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 32px 28px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
`;

S.Header = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

S.DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

S.IconGroup = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
`;

S.Icon = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

S.Divider = styled.hr`
  height: 1px;
  background-color: #ddd;
  border: none;
  margin: 16px 0 24px;
`;

S.SourceBox = styled.div`
  font-size: 14px;
  margin-bottom: 20px;

  .label {
    margin-right: 7px;
    color: #666;
  }

  .title {
    color: #282828;
    font-weight: 600;
  }

  .author {
    margin-left: 7px;
    color: #666;
  }
`;

S.Date = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #282828;
`;

S.CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: -8px;
  margin-top: 2px;

  img {
    width: 28px;
    height: 28px;
  }
`;

S.Content = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #222;
  margin-bottom: 24px;
  white-space: pre-wrap;
  text-align: justify;
`;

S.MusicSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none; // ✅ 회색 배경 제거
  border-radius: 0;
  margin-bottom: 24px;
`;

S.MusicInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

S.AlbumImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

S.MusicTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

S.MusicArtist = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: #666;
`;

S.MusicControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
  }
`;

S.MetaSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  font-size: 13px;
  color: #282828;
  gap: 12px;
`;

S.MetaText = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;

  ${S.Tags} {
    margin-left: 6px;
    color: #888;
    font-size: 12px;
  }
`;

S.Tags = styled.span`
  margin-left: 6px;
  color: #888;
  font-size: 12px;
`;

S.ReWrite = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  color: #282828;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-right: -6px;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default S;
