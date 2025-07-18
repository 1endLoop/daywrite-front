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
  const [bookmarkItems, setBookmarkItems] = useState([]);

  // ✅ 드롭다운
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownInfo(null));

  // ✅ 북마크 목록 가져오기
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/bookmarks?userId=user1");
        const data = await res.json(); // [{ historyId, folderId, type, ... }]
        setBookmarkItems(data);
      } catch (err) {
        console.error("북마크 목록 불러오기 실패:", err);
      }
    };
    fetchBookmarks();
  }, []);

  // ✅ 폴더별 그룹화
  const groupedByFolder = {};
  bookmarkItems.forEach((item) => {
    const { folderId } = item;
    if (!groupedByFolder[folderId]) groupedByFolder[folderId] = [];
    groupedByFolder[folderId].push(item);
  });

  // ✅ 폴더 메타 정보 (앞으로 DB화 예정)
  const folders = [
    {
      id: 1,
      title: "북마크한 모든 글",
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 2,
      title: "쇼펜하우어 명언집",
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 3,
      title: "니체 명언집",
      type: "글",
      imageUrl: "/assets/images/book-img.jpeg",
    },
    {
      id: 8,
      title: "사랑에 빠졌을 때",
      type: "곡",
      imageUrl: "/assets/images/album-image.png",
    },
    {
      id: 9,
      title: "포근한",
      type: "곡",
      imageUrl: "/assets/images/profiles/cat.JPG",
    },
  ];

  // ✅ 필터 및 count 추가
  const folderCards = folders
    .filter((folder) => folder.type === type)
    .map((folder) => ({
      ...folder,
      count: groupedByFolder[folder.id]?.length || 0,
    }));

  // ✅ 드롭다운 위치
  const handleMoreClick = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownInfo({
      x: rect.left,
      y: rect.bottom,
      item,
    });
  };

  // ✅ 스크롤 감지
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
          {folderCards.map((item) => (
            <BookmarkCard
              key={item.id}
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