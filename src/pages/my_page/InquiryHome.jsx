import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const InquiryHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isWritePage = location.pathname.includes('/inquiry/write');
  const isListPage = location.pathname === '/mypage/inquiry';

  const [inquiries] = useState([
    { title: '어떻게 사용하나요?', date: '2025.04.18', status: '답변완료' },
    { title: '커뮤니티 신고는 어떻게 하는 걸까요?', date: '2025.04.18', status: '미응답' },
    { title: '이거 왜 안되나요', date: '2025.04.18', status: '미응답' },
    { title: '레벨은 어떻게 하나요', date: '2025.04.18', status: '미응답' },
    { title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18', status: '답변완료' },
    { title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18', status: '답변완료' },
    { title: '무슨 질문을 할까요 사람들이?', date: '2025.04.18', status: '답변완료' },
  ]);

  return (
    <Wrapper>
      <TabMenu>
        <Tab active={isWritePage} onClick={() => navigate('/mypage/inquiry/write')}>
          1:1 문의하기
        </Tab>
        <Tab active={isListPage} onClick={() => navigate('/mypage/inquiry')}>
          1:1 문의내역
        </Tab>
      </TabMenu>

      <StyledTable>
        <thead>
          <tr>
            <th>문의 제목</th>
            <th>작성일</th>
            <th>답변유무</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td className={item.status === '미응답' ? 'pending' : ''}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>
        <span>{'<'}</span>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>{'>'}</span>
      </Pagination>
    </Wrapper>
  );
};

export default InquiryHome;

// ---------- styled-components ----------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TabMenu = styled.div`
  display: flex;
  gap: 24px;
`;

const Tab = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ active }) => (active ? 'black' : '#aaa')};
  border-bottom: ${({ active }) => (active ? '2px solid black' : 'none')};
  padding-bottom: 4px;
  cursor: pointer;
`;

const StyledTable = styled.table`
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

  .pending {
    color: red;
    font-weight: bold;
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
