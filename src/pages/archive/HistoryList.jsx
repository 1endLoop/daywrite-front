import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import { useState, useEffect } from "react";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        // 북마크 초기값 세팅
        const updatedData = data.map((item) => ({
          ...item,
          bookmarked: true, // 초기값 (API 값이 있다면 거기서 받아도 됨)
        }));
        setHistoryList(updatedData);
      })
      .catch((err) => console.error("히스토리 불러오기 실패:", err));
  }, []);

  // 북마크 상태 토글 함수
  const toggleBookmark = (id) => {
    const updated = historyList.map((item) => (item._id === id ? { ...item, bookmarked: !item.bookmarked } : item));
    setHistoryList(updated);

    // 디테일에서 보고 있다면 상태도 반영
    if (selectedCard?._id === id) {
      setSelectedCard(updated.find((item) => item._id === id));
    }
  };

  return (
    <Container>
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
            onToggleBookmark={() => toggleBookmark(item._id)}
          />
        ))}
      </CardList>

      {selectedCard && (
        <HistoryDetail
          data={selectedCard}
          onClose={() => setSelectedCard(null)}
          onToggleBookmark={() => toggleBookmark(selectedCard._id)}
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
