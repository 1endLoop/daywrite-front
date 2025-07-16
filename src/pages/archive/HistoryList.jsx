import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toast, setToast] = useState(null); // 토스트 상태

  // 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        // 북마크 초기값 세팅
        const updatedData = data.map((item) => ({
          ...item,
          bookmarked: false, // 초기값
        }));
        setHistoryList(updatedData);
      })
      .catch((err) => console.error("히스토리 불러오기 실패:", err));
  }, []);

  const USER_ID = "user1"; // 사용자 고유 ID (실제 인증 연동 전엔 하드코딩)

  const toggleBookmark = async (item) => {
    const isBookmarked = item.bookmarked;
    const url = "http://localhost:8000/api/bookmarks";

    try {
      if (isBookmarked) {
        await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, historyId: item._id }),
        });
        // 북마크 해제 토스트
        setToast("북마크에서 삭제되었습니다!");
        setTimeout(() => setToast(null), 2000);
      } else {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, historyId: item._id, folderId: 1 }),
        });

        // 북마크 저장 토스트
        setToast("북마크에 저장되었습니다!");
        setTimeout(() => setToast(null), 2000); // 2초 뒤 사라짐
      }

      // 북마크 UI 상태 업데이트
      setHistoryList((prev) => prev.map((el) => (el._id === item._id ? { ...el, bookmarked: !isBookmarked } : el)));
    } catch (err) {
      console.error("북마크 저장 실패:", err);
    }
  };

  const toggleLike = (item) => {
    setHistoryList((prev) => prev.map((el) => (el._id === item._id ? { ...el, liked: !el.liked } : el)));
  };

  return (
    <Container>
      {toast && <Toast message={toast} />}
      <TopRow>
        <Title>History</Title>
        <SearchBarWrapper>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchBarWrapper>
      </TopRow>

      <CardList>
        {historyList.map((item, index) => (
          <HistoryCard
            key={item._id}
            data={item}
            onClick={() => setSelectedCard(item)}
            onToggleBookmark={() => toggleBookmark(item)}
            onToggleLike={() => toggleLike(item)}
            selected={false}
            isEditMode={false}
          />
        ))}
      </CardList>

      {selectedCard && (
        <HistoryDetail
          data={selectedCard}
          onClose={() => setSelectedCard(null)}
          onToggleBookmark={() => toggleBookmark(selectedCard)}
          onToggleLike={() => toggleLike(selectedCard)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 24px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #131313;
`;

const SearchBarWrapper = styled.div`
  input {
    width: 260px;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default HistoryList;
