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
      .then((data) => setHistoryList(data))
      .catch((err) => console.error("히스토리 불러오기 실패:", err));
  }, []);

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
          <HistoryCard key={item._id || index} data={item} onClick={() => setSelectedCard(item)} />
        ))}
      </CardList>

      {selectedCard && <HistoryDetail data={selectedCard} onClose={() => setSelectedCard(null)} />}
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
