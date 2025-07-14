import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Faq = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(-1);
  const [faqs, setFaqs] = useState([]);

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleToggle = (index) => {
    setExpanded(expanded === index ? -1 : index);
  };

  // 백엔드에서 FAQ 불러오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/faq`)
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error('FAQ 불러오기 실패:', err));
  }, []);

  // 검색 필터링
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  // 페이지네이션 로직
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpanded(-1);
  };

  return (
    <Wrapper>
      <Title>FAQ</Title>

      <SearchBox>
        <Input
          type="text"
          placeholder="찾으시는 질문을 검색해보세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <img
            src="/assets/images/icons/search.png"
            alt="검색"
            style={{ width: '20px', height: '20px' }}
          />
        </button>
      </SearchBox>

      <List>
        {currentFaqs.map((faq, idx) => (
          <Item key={idx}>
            <Question onClick={() => handleToggle(idx)}>
              {faq.question}
            </Question>
            {expanded === idx && (
              <Answer>{faq.answer || '답변이 준비되지 않았습니다.'}</Answer>
            )}
          </Item>
        ))}
      </List>

      <Pagination>
        <span
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
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
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          &gt;
        </span>
      </Pagination>
    </Wrapper>
  );
};

export default Faq;

// ---------------- Styled Components ----------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f2f2f2;
  padding: 8px 16px;
  width: 340px;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-size: 14px;
  outline: none;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
`;

const Item = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
`;

const Question = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const Answer = styled.div`
  font-size: 14px;
  color: #444;
  margin-top: 20px;
  line-height: 1.5;
  padding-left: 30px;
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


