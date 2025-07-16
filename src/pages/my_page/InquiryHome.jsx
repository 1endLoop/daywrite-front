import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const InquiryHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isWritePage = location.pathname.includes('/inquiry/write');
  const isListPage = location.pathname === '/mypage/inquiry';

  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 5;

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/inquiry');
        const data = await res.json();
        setInquiries(data);
      } catch (err) {
        console.error('문의 불러오기 실패:', err);
      }
    };

    fetchInquiries();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace('.', '.');
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(inquiries.length / inquiriesPerPage);
  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = inquiries.slice(indexOfFirst, indexOfLast);

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
          {currentInquiries.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td className="pending">미응답</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>
        <span
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={{ opacity: currentPage === 1 ? 0.3 : 1 }}
        >
          {'<'}
        </span>

        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </span>
        ))}

        <span
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          style={{ opacity: currentPage === totalPages ? 0.3 : 1 }}
        >
          {'>'}
        </span>
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
    user-select: none;
  }

  .active {
    font-weight: bold;
    text-decoration: underline;
  }
`;