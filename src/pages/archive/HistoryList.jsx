import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import { useState } from "react";

const dummyData = [
  {
    id: 1,
    date: "2025. 05. 27",
    content:
      "진정한 사랑이란, 반드시 두 사람의 자유가 서로 상대방을 인정하는 기초 위에 세워져야 한다. 이때 두 사람은 서로를 자기 자신처럼 또는 타자처럼 느끼면서, 어느 한편에서도 자기 초월을 포기하지 않고 또 자기를 불구로 만드는 일 없이 함께 세계 속에서 가치와 목적을 발견할 것이다. 또한 자기를 줌으로써 자기 자신을 찾고 세계를 풍요롭게 할 것이다.",
    title: "제2의 성",
    author: "시몬느 드 보부아르",
    music: "Hollywood",
    artist: "검정치마",
  },
  {
    id: 2,
    date: "2025. 05. 26",
    content:
      "살아남은 자들이 부끄러워하던 시대는 가고, 곧 1등이든 2등이든 무조건 살아남는 것이 최선이라는 시대가 왔다. 지금은 너를 떨어뜨리지 않으면 내가 죽는다는, 오직 단 한명만이 살아남는다는 ‘오징어 게임’, 서바이벌 게임의 세계관이 스크린을 지배하는 세상이 되었다. 그러나 나는 은밀히 믿고 있다. 액정화면 밖 진짜 세상은 다르다고, 거기에는 조용히, 그러나 치열하게, 자기만의 방식으로 살아남아 어떻게든 삶의 의미를 찾기 위해 싸우는 이들이 있다는 것을.",
    title: "단 한 번의 삶",
    author: "김영하",
    music: "Rainy Days",
    artist: "Lee Moon",
  },
];

const HistoryList = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Container>
      <TopRow>
        <Title>History</Title>
        <SearchBarWrapper>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchBarWrapper>
      </TopRow>
      <CardList>
        {dummyData.map((item) => (
          <HistoryCard key={item.id} data={item} onClick={() => setSelectedCard(item)} />
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
