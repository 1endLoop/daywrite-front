import React, { useState } from 'react';
import styled from 'styled-components';

const mockData = [
  { name: '사랑', icon: '💖', percent: 45, color: '#f79bb3' },
  { name: '이별', icon: '💔', percent: 45, color: '#f27b87' },
  { name: '우울한 감정', icon: '😞', percent: 30, color: '#f8c279' },
  { name: '그 외의 감정', icon: '🥺', percent: 100,color: '#3c2f2f' },
  { name: '소설', icon: '📖', percent: 100, color: '#f9dc8b' },
  { name: '시', icon: '💥', percent: 15, color: '#dcdcf9' },
  { name: '에세이', icon: '📝', percent: 20, color: '#f2a0a0' },
  { name: '역사', icon: '🏺', percent: 30, color: '#f4e2b7' },
  { name: '문학', icon: '✍️', percent: 50, color: '#c5a7f2' },
  { name: '철학', icon: '🎓', percent: 30, color: '#a4d4f9' },
];

const sortOptions = ['전체', '데이터 높은 순', '데이터 낮은 순', '가나다 순', '선호도 순'];

const CategoryData = () => {
  const [sort, setSort] = useState(sortOptions[1]);

  const sortedData = [...mockData].sort((a, b) => {
    switch (sort) {
      case '데이터 높은 순': return b.percent - a.percent;
      case '데이터 낮은 순': return a.percent - b.percent;
      case '가나다 순': return a.name.localeCompare(b.name);
      case '전체':
      case '선호도 순':
      default:
        return 0;
    }
  });

  return (
    <Container>
      <Header>
        <Title>카테고리 데이터</Title>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Header>

      <List>
        {sortedData.map((item, index) => (
          <Item key={index}>
            <Label>
              {item.icon} {item.name}
            </Label>
            <BarWrap>
              <Bar style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
              <Percent>{item.percent}%</Percent>
            </BarWrap>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default CategoryData;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: -50px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
font-size: 28px;
font-weight: 600;
`;

const Select = styled.select`
  padding: 6px 12px;
  font-size: 14px;
  transform: translateX(-110px);
  margin-top: 40px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.4fr;
  gap: 50px 60px;                   // ✅ 세로 24px, 가로 60px 간격
  align-items: flex-start;  
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const BarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Bar = styled.div`
  height: 8px;
  border-radius: 4px;
  background-color: #ccc;
  flex-shrink: 0;
  transition: width 0.3s ease;
`;

const Percent = styled.div`
  font-size: 14px;
  color: #333;
`;

