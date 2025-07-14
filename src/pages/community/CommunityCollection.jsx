import React, { useRef, useState } from 'react';
import S from './collectionStyle';

const CommunityCollection = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div>
      <S.TypedTitle>
        <h2>인기 글 컬렉션</h2>
        <p>전체보기 &gt;</p>
      </S.TypedTitle>
        <S.TypedWrapper>
          {[...Array(5)].map((_, i) => (
          <S.TypedBox key={i}>
            <img src="/assets/images/profiles/cat.JPG" alt="" id='ss'/>
            <S.LetterBox>
              <div>
                <h6>제목</h6>
                <p>작성 글 개수</p>
              </div>
              <S.dd onClick={() => setOpenDropdown((prev) => !prev)}>
                <S.Wrapper ref={dropdownRef}>
                  {openDropdown && (
                    <S.Menu>
                      <S.Item onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.Item>
                      <S.Item onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.Item>
                      <S.Item onClick={() => alert("공유하겠습니다!")}>공유하기</S.Item>
                    </S.Menu>
                  )}
                </S.Wrapper>
              </S.dd> 
            </S.LetterBox>
          </S.TypedBox>
          ))}
          {/* 다른 TypedBox 요소들도 여기에 추가 */}
        </S.TypedWrapper>

      {/* Played */}
      <S.PlayedTitle>
        <h2>인기 음악 플레이리스트</h2>
        <p>전체보기 &gt;</p>
      </S.PlayedTitle>
        <S.TypedWrapper>
          {[...Array(5)].map((_, i) => (
          <S.TypedBox key={i}>
            <img src="/assets/images/profiles/cat.JPG" alt="" id='ss'/>
            <S.LetterBox>
              <div>
                <h6>제목</h6>
                <p>작성 글 개수</p>
              </div>
              <S.dd onClick={() => setOpenDropdown((prev) => !prev)} />
            </S.LetterBox>
          </S.TypedBox>
          ))}
          {/* 다른 Played 박스도 추가 */}
        </S.TypedWrapper>
    </div>
  );
};

export default CommunityCollection;