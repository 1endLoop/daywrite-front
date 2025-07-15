import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NoticeHome = () => {
  const [notices, setNotices] = useState([]);
  const [expanded, setExpanded] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notice`)
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.error('공지사항 불러오기 실패:', err));
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? -1 : index);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpanded(-1);
  };

  return (
    <Wrapper>
      <Title>공지사항</Title>

      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>공지 제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((item, idx) => {
            const globalIndex = indexOfFirst + idx + 1; // 전체 기준 번호
            const isExpanded = expanded === idx;
            return (
              <tr
                key={item._id || idx}
                onClick={() => handleToggle(idx)}
                style={{ cursor: 'pointer', verticalAlign: 'top' }}
              >
                <TdNum>{globalIndex}</TdNum>
                <TdTitle>
                  <TitleText>{item.title}</TitleText>
                  {isExpanded && (
                    <Answer>{item.content || '내용이 없습니다.'}</Answer>
                  )}
                </TdTitle>
                <td>{item.createdAt?.slice(0, 10).replace(/-/g, '.')}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination>
        <span
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          style={{
            cursor: currentPage === 1 ? 'default' : 'pointer',
            color: currentPage === 1 ? '#aaa' : '#333',
          }}
        >
          &lt;
        </span>
        {[...Array(totalPages)].map((_, idx) => (
          <span
            key={idx}
            className={currentPage === idx + 1 ? 'active' : ''}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </span>
        ))}
        <span
          onClick={() =>
            handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          style={{
            cursor: currentPage === totalPages ? 'default' : 'pointer',
            color: currentPage === totalPages ? '#aaa' : '#333',
          }}
        >
          &gt;
        </span>
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

  th,
  td {
    padding: 18px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
    vertical-align: top;
  }

  th {
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #fff8f4;
  }
`;

const TdNum = styled.td`
  width: 50px;
  text-align: center;
`;

const TdTitle = styled.td`
  width: 70%;
`;

const TitleText = styled.div`
  font-weight: 600;
`;

const Answer = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #444;
  line-height: 1.5;
  padding-left: 15px;
  border-left: 3px solid #f0a500;
  white-space: pre-wrap;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;

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