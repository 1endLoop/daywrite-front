import styled from "styled-components";

const S = {};

// 전체 레이아웃
S.TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 0 0;
  gap: 3px;
`;

S.BackBtn = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

S.PageTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

S.CountText = styled.span`
  font-size: 14px;
  color: gray;
  margin-left: 8px;
`;

S.SearchBar = styled.input`
  margin-left: auto;
  width: 240px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// 본문 내용
S.ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  padding: 20px 0 0 0;
`;

// 썸네일 영역
S.ThumbnailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
`;

S.Thumbnail = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  margin-bottom: 5px;
`;

S.FolderTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // 폴더명과 아이콘을 수직 가운데 정렬
  width: 100%;
  margin-top: 10px;
`;

S.FolderTitle = styled.h3`
  font-size: 16px;
  line-height: 1.4;
`;

S.EditButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 14px;
  cursor: pointer;
`;

S.MenuWrapper = styled.div`
  display: flex;
  align-items: center; // 아이콘을 가운데 정렬
`;

S.MoreBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1; //  텍스트 기준 위치 조정
`;

// 카드 영역
S.CardColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 편집 모드
S.EditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

S.DeleteButton = styled.button`
  background: none;
  border: none;
  color: #f96f3d;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
`;

S.SelectedText = styled.span`
  font-size: 14px;
  color: gray;
`;

// 디테일 팝업

// 전체 배경 어둡게
S.Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 999;
`;

// 모달 박스
S.Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 600px; // 고정 높이로 약간 더 큼
  background: white;
  border-radius: 12px;
  z-index: 1100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 상단 타이틀 바
S.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 3px 0;
  margin-left: 24px;
  margin-right: 18px;
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

// 닫기 버튼
S.CloseBtn = styled.button`
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #131313;
`;

// 회색 실선
S.Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  width: calc(100% - 48px); // 좌우 24px 패딩 고려
  margin: 0 auto; // 가운데 정렬
`;

// 콘텐츠 전체 영역
S.Content = styled.div`
  display: flex;
  padding: 24px;
  margin-bottom: 12px;
  gap: 24px;
  flex: 1;
  overflow: hidden;
`;

// 왼쪽 도서 표지
S.CoverImage = styled.img`
  width: 160px;
  height: 230px;
  object-fit: cover;
  border: 1px solid #ccc;
`;

// 오른쪽 정보 영역
S.InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

// 책 제목
S.Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
`;

// 메타 정보 (저자, 출판사 등)
S.Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;

  & > span {
    flex: 1;
    text-align: left;

    label {
      font-weight: normal;
      color: #999; // 레이블은 더 연한 회색
      margin-right: 4px;
    }
  }
`;

// 설명 영역 (스크롤 가능)
S.Description = styled.div`
  font-size: 15px;
  color: #444;
  line-height: 1.6;
  overflow-y: auto;
  flex: 1;
  padding-right: 8px;
  text-align: justify;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
`;

// 폴더 생성
S.Label = styled.label`
    /* border: solid 1px red; */
    width: 100%;
    height: 120px;
`
S.ImgWrapper = styled.div`
    /* border-radius: 8px; */
    width: 120px;
    height: 120px;
    margin-top: 0px;
    background-color: #e0e0e0;
    input{
        display: none;
    }
`
S.Profile = styled.img`
    width: 120px;
    height: 120px;
    border: none;
`
S.ImgUpload = styled.button`
    background-color: #FEE9E2;
    margin-top: 5px;
    border-radius: 5px;
    font-size: 12px;
    padding: 2px;
`
// NewFolder countText
S.NewFolderTextCount = styled.span`
  font-size: 14px;
  color: gray;
  margin-top: 50px;
  margin-left: 6px;
`

export default S;
