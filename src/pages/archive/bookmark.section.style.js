import styled from "styled-components";

const S = {};

S.Container = styled.div`
  position: relative;
  padding: 40px 0 0 0;
`;

S.Section = styled.div`
  margin-bottom: 50px;
`;

S.TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`;

S.BookmarkFolder = styled.button`
  font-size: 14px;
  color: #f86f03;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute; right: 80px;
`

S.Title = styled.h2`
  font-size: 20px;
`;

S.ViewAll = styled.button`
  font-size: 14px;
  color: #f86f03;
  background: none;
  border: none;
  cursor: pointer;
`;

S.CardRow = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 16px;
  // 스크롤바 숨기기
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;

// 스크롤 버튼
S.ScrollWrapper = styled.div`
  position: relative;
  overflow: visible;
`;

S.ScrollLeftBtn = styled.button`
  position: absolute;
  top: 45%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: #f96f3d;
  cursor: pointer;
`;

S.ScrollRightBtn = styled.button`
  position: absolute;
  top: 45%;
  right: 0;
  transform: translateY(-50%) translateX(50%); // → 오른쪽으로 반쯤 걸치게
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: #f96f3d;
  cursor: pointer;
`;

// BookmarkCard.jsx

S.Card = styled.div`
  width: 160px;
  flex-shrink: 0;

`;

S.Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  cursor: pointer;
`;

S.InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  cursor: pointer;
`;

S.CardTitle = styled.div`
  font-size: 14px;
`;

S.CardDesc = styled.div`
  font-size: 12px;
  color: gray;
`;

S.MenuWrapper = styled.div`
  position: relative;
`;

S.MoreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// 전체보기

S.AllTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0 24px; // ← 카드 그리드와 같은 패딩
  box-sizing: border-box;
`;

S.AllCardGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); // 카드 최소 140px, 최대 1fr
  gap: 24px; // 카드 사이 간격
  justify-content: center; // ← 핵심: 가운데 정렬
  padding: 0 24px; // 양쪽 여백 맞춤
  box-sizing: border-box;
`;

// 폴더 상세
// 폴더 상세: 썸네일 + 제목 + 편집
S.FolderDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  padding: 0 24px;
`;

S.Thumbnail = styled.img`
  width: 160px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
`;

S.FolderName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

S.FolderEdit = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
`;

S.FolderCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 24px 40px;
  box-sizing: border-box;
`;

export default S;
