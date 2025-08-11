import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

  // 🔐 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  // ✅ 드롭다운
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownInfo(null));

  // ✅ 북마크 목록 가져오기 (로그인 후)
  useEffect(() => {
    if (!isAuthed || !userId) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`/api/bookmarks?userId=${userId}`);
        const data = await res.json();

        // 중복(historyId 기준) 제거 안전 처리
        const dedup = Array.isArray(data)
          ? Array.from(new Map(data.map((b) => [String(b.historyId || b._id), b])).values())
          : [];

        setBookmarkItems(dedup);
      } catch (err) {
        console.error("북마크 목록 불러오기 실패:", err);
      }
    };
    fetchBookmarks();
  }, [isAuthed, userId]);

  // ✅ 폴더별 그룹화
  const groupedByFolder = bookmarkItems.reduce((acc, item) => {
    const fid = item.folderId ?? 1;
    if (!acc[fid]) acc[fid] = [];
    acc[fid].push(item);
    return acc;
  }, {});

  // ✅ 폴더 메타 (임시)
  const folders = [
    { id: 1, title: "북마크한 모든 글", type: "글", imageUrl: "/assets/images/book-img.jpeg" },
    { id: 2, title: "쇼펜하우어 명언집", type: "글", imageUrl: "/assets/images/book-img.jpeg" },
    { id: 3, title: "니체 명언집", type: "글", imageUrl: "/assets/images/book-img.jpeg" },
    { id: 8, title: "사랑에 빠졌을 때", type: "곡", imageUrl: "/assets/images/album-image.png" },
    { id: 9, title: "포근한", type: "곡", imageUrl: "/assets/images/profiles/cat.JPG" },
  ];

  // ✅ 필터 + count 계산
  const totalTypedCount = bookmarkItems.length; // 현재 API가 '글' 북마크만 내려온다고 가정
  const folderCards = folders
    .filter((f) => f.type === type)
    .map((f) => {
      const baseCount = groupedByFolder[f.id]?.length || 0;
      // "북마크한 모든 글"은 실제 총 개수로 표시
      const count = f.id === 1 && type === "글" ? totalTypedCount : baseCount;
      return { ...f, count };
    });

  // ✅ 드롭다운 위치
  const handleMoreClick = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownInfo({ x: rect.left, y: rect.bottom, item });
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
    handleScrollVisibility();
    return () => el.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  // // newFolder 저장한 값 보여주기
  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     try {
  //       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookmarkFolder/folders`);
  //       const data = await res.json();
  //       console.log("✅ folders API 응답:", data);
  //       setFolders(data);
  //     } catch (err) {
  //       console.error("폴더 목록 불러오기 실패:", err);
  //     }
  //   };

  //   fetchFolders();
  // }, []);

  return (
    <S.Section>
      <S.TitleRow>
        <S.Title>{title}</S.Title>
        <S.BookmarkFolder
          onClick={() => navigate(`/archive/bookmark/${type === "글" ? "bookmarkNewFolder" : "playedNewFolder"}`)}
        >
          +폴더 생성
        </S.BookmarkFolder>
        <S.ViewAll onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}`)}>
          전체보기
        </S.ViewAll>
      </S.TitleRow>

      <S.ScrollWrapper>
        {showLeftBtn && <S.ScrollLeftBtn onClick={() => scroll("left")}>{"<"}</S.ScrollLeftBtn>}

        <S.CardRow ref={scrollRef}>
          {folderCards.map((forlder) => (
            // <BookmarkCard
            //   key={item.id}
            //   {...item}
            //   onMoreClick={(e) => handleMoreClick(e, item)}
            //   onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}/${item.id}`)}
            // />
            <BookmarkCard
              key={forlder.id}
              title={forlder.title}
              type={forlder.type}
              // imageUrl={`${process.env.REACT_APP_BACKEND_URL}/uploads/${item.thumbnailUrl}`} // 여기 중요!
              imageUrl={forlder.imageUrl}
              count={forlder.count}
              onMoreClick={(e) => handleMoreClick(e, forlder)}
              onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}/${forlder.id}`)}
            />
          ))}
          {/* {folderCards.map((item) => (
            <BookmarkCard
              key={item.id}
              {...item}
              onMoreClick={(e) => handleMoreClick(e, item)}
              onClick={() => navigate(`/archive/bookmark/${type === "글" ? "typed" : "played"}/${item.id}`)}
            />
          ))} */}
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
