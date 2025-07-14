import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const InquiryWrite = () => {
  const [type, setType] = useState('기타');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const email = 'SYD342@gmail.com'; // 실제로는 유저 상태에서 가져와야 함

  const navigate = useNavigate();
  const location = useLocation();

  const isWritePage = location.pathname.includes('/inquiry/write');
  const isListPage = location.pathname === '/mypage/inquiry';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('문의가 등록되었습니다.');
    navigate('/mypage/inquiry');
  };

  return (
    <Wrapper>
      <TabMenu>
        <Tab active={isWritePage} onClick={() => navigate('/mypage/inquiry/write')}>1:1 문의하기</Tab>
        <Tab active={isListPage} onClick={() => navigate('/mypage/inquiry')}>1:1 문의내역</Tab>
      </TabMenu>

      <FormWrapper onSubmit={handleSubmit}>
        <Row>
          <Th>문의 유형</Th>
          <Td>
            <label><input type="radio" value="기타" checked={type === '기타'} onChange={() => setType('기타')} /> 기타</label>
            <label><input type="radio" value="오류" checked={type === '오류'} onChange={() => setType('오류')} /> 오류</label>
            <label><input type="radio" value="콘텐츠 관련 문의" checked={type === '콘텐츠 관련 문의'} onChange={() => setType('콘텐츠 관련 문의')} /> 콘텐츠 관련 문의</label>
          </Td>
        </Row>

        <Row>
          <Th>이메일</Th>
          <Td>{email}</Td>
        </Row>

        <Row>
          <Th>제목</Th>
          <Td>
            <input type="text" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Td>
        </Row>

        <Row>
          <Th>내용</Th>
          <Td>
            <textarea placeholder="내용을 정확히 남겨주시면 정확한 답변이 가능합니다" value={content} onChange={(e) => setContent(e.target.value)} />
          </Td>
        </Row>

        <ButtonWrap>
          <button type="submit">등록하기</button>
        </ButtonWrap>
      </FormWrapper>
    </Wrapper>
  );
};

export default InquiryWrite;

const Wrapper = styled.div`
  width: 85%;
  padding: 10px;
`;

const TabMenu = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const Tab = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ active }) => (active ? 'black' : '#aaa')};
  border-bottom: ${({ active }) => (active ? '2px solid black' : 'none')};
  padding-bottom: 4px;
  cursor: pointer;
`;

const FormWrapper = styled.form`
  border-top: 1px solid #aaa;

`;

const Row = styled.div`
  display: flex;
  border-top: 1px solid #ddd;

  &:first-of-type {
    border-top: none;
  }
`;

const Th = styled.div`
  width: 120px;
  padding: 20px;
  font-weight: bold;
  border-right: 1px solid #ddd;
`;

const Td = styled.div`
  flex: 1;
  padding: 20px;

  input[type='text'], textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    resize: none;
  }

  textarea {
    height: 120px;
  }

  label {
    margin-right: 24px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;

  button {
    background: #f26c44;
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
