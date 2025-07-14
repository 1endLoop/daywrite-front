import React from 'react';
import styled from 'styled-components';

const dummyNotices = [
  { no: 100, title: '어떻게 사용하나요?', date: '2025.04.18' },
  { no: 99, title: '커뮤니티 신고는 어떻게 하는 걸까요?', date: '2025.04.18' },
  { no: 98, title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18' },
  { no: 97, title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18' },
  { no: 96, title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18' },
  { no: 95, title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18' },
  { no: 94, title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18' },
];

const NoticeHome = () => {
  return (
    <Wrapper>
      <Title>공지사항</Title>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>문의 제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {dummyNotices.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <span>&lt;</span>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>&gt;</span>
      </Pagination>
    </Wrapper>
  );
};

export default NoticeHome;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  

  th, td {
    padding: 18px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }

  th {
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #fff8f4;
    
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  span {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .active {
    font-weight: bold;
    text-decoration: underline;
  }
`;
