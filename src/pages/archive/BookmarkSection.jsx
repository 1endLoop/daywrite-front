import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkCard from "./BookmarkCard";
import Dropdown from "../../components/dropdown/Dropdown";
import S from "./bookmark.section.style";
import useScrollX from "../../modules/hooks/useScrollX";
import useClickOutside from "../../modules/hooks/useClickOutside";

const BookmarkSection = ({ title, type }) => {
  const navigate = useNavigate();
  const { ref: scrollRef, scroll } = useScrollX();
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  // 드롭다운
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownInfo(null));

  // 임시 북마크 목록 데이터
  const allItems = [
    {
      id: 1,
      title: "북마크한 모든 글",
      count: 1230,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 2,
      title: "쇼펜하우어 명언집",
      count: 3,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 3,
      title: "니체 명언집",
      count: 10,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 4,
      title: "니체 명언집",
      count: 10,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 5,
      title: "니체 명언집",
      count: 10,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 6,
      title: "니체 명언집",
      count: 10,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 7,
      title: "니체 명언집",
      count: 10,
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 8,
      title: "사랑에 빠졌을 때",
      count: 8,
      type: "곡",
      imageUrl: "/assets/images/album-image.png",
    },
    {
      id: 9,
      title: "포근한",
      count: 8,
      type: "곡",
      imageUrl: "/assets/images/profiles/cat.JPG",
    },
  ];

  // 글, 음악 구분 필터
  const filteredItems = allItems.filter((item) => item.type === type);

  const handleMoreClick = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownInfo({
      x: rect.left,
      y: rect.bottom,
      item,
    });
  };

  // 스크롤 상태에 따라 버튼 보여줄지 여부 계산
  const handleScrollVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeftBtn(el.scrollLeft > 0);
    setShowRightBtn(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScrollVisibility);
    handleScrollVisibility(); // 초기 상태 확인

    return () => el.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  return (
    <S.Section>
      <S.TitleRow>
        <S.Title>{title}</S.Title>
        <S.BookmarkFolder>+폴더 생성</S.BookmarkFolder>
        <S.ViewAll onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}`)}>
          전체보기
        </S.ViewAll>
      </S.TitleRow>
      <S.ScrollWrapper>
        {showLeftBtn && <S.ScrollLeftBtn onClick={() => scroll("left")}>{"<"}</S.ScrollLeftBtn>}
        <S.CardRow ref={scrollRef}>
          {filteredItems.map((item, idx) => (
            <BookmarkCard
              key={idx}
              {...item}
              onMoreClick={(e) => handleMoreClick(e, item)}
              onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}/${item.id}`)}
            />
          ))}
        </S.CardRow>
        {showRightBtn && <S.ScrollRightBtn onClick={() => scroll("right")}>{">"}</S.ScrollRightBtn>}
      </S.ScrollWrapper>
      {dropdownInfo && (
        <Dropdown refProp={dropdownRef} x={dropdownInfo.x} y={dropdownInfo.y} onClose={() => setDropdownInfo(null)}>
          <li>이름변경</li>
          <li>폴더삭제</li>
          <li>공유하기</li>
        </Dropdown>
      )}
    </S.Section>
  );
};

export default BookmarkSection;
