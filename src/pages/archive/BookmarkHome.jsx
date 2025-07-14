import React, { useRef, useState } from "react";
import S from "./bookmark.style";

const BookmarkHome = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const typedScrollRef = useRef(null);
  const playedScrollRef = useRef(null);

  const scroll = (ref, direction) => {
    const container = ref.current;
    if (container) {
      const amount = 300;
      container.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <S.TypedTitle>
        <h2>Typed</h2>
      </S.TypedTitle>

      <S.SliderWrapper>
        <S.ArrowButton onClick={() => scroll(typedScrollRef, "left")}>◀</S.ArrowButton>
        <S.TypedWrapper ref={typedScrollRef}>
          {[...Array(12)].map((_, i) => (
            <S.TypedBox key={i}>
              <img src="/assets/images/profiles/cat.JPG" alt="" id="ss" />
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
        <S.ArrowButton onClick={() => scroll(typedScrollRef, "right")}>▶</S.ArrowButton>
      </S.SliderWrapper>

      {/* Played */}
      <S.PlayedTitle>
        <h2>Played</h2>
      </S.PlayedTitle>

      <S.SliderWrapper>
        <S.ArrowButton onClick={() => scroll(playedScrollRef, "left")}>◀</S.ArrowButton>
        <S.TypedWrapper ref={playedScrollRef}>
          {[...Array(12)].map((_, i) => (
            <S.TypedBox key={i}>
              <img src="/assets/images/album-image.png" alt="" id="album" />
              <S.LetterBox>
                <div>
                  <h6>제목</h6>
                  <p>곡 수</p>
                </div>
                <S.dd onClick={() => setOpenDropdown((prev) => !prev)} />
              </S.LetterBox>
            </S.TypedBox>
          ))}
          {/* 다른 Played 박스도 추가 */}
        </S.TypedWrapper>
        <S.ArrowButton onClick={() => scroll(playedScrollRef, "right")}>▶</S.ArrowButton>
      </S.SliderWrapper>
    </div>
  );
};

export default BookmarkHome;
