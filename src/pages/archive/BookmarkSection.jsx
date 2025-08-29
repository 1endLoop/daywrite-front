import { useRef, useState, useEffect, useMemo } from "react";
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

  // 서버 폴더 목록
  const [serverFolders, setServerFolders] = useState([]);
  // 내가 누른 북마크(전체 개수 표시용)
  const [bookmarkItems, setBookmarkItems] = useState([]);

  // 로그인 유저
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const token = localStorage.getItem("jwtToken");
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  // 드롭다운
  const [dropdownInfo, setDropdownInfo] = useState(null);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownInfo(null));

  // 정적 파일 origin → 업로드 URL 만들 때 사용
  const BE = process.env.REACT_APP_BACKEND_URL;
  const getAssetOrigin = () => {
    const raw = (BE || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };
  const buildImageSrc = (thumb = "") => {
    if (!thumb) return "";
    const clean = String(thumb).trim().replace(/\\/g, "/");
    if (/^(https?:|data:|blob:)/i.test(clean)) return clean;
    const origin = getAssetOrigin();
    if (clean.startsWith("/uploads/")) return `${origin}${clean}`;
    if (clean.startsWith("uploads/")) return `${origin}/${clean}`;
    return `${origin}/uploads/${clean.replace(/^\/+/, "")}`;
  };

  // 내 북마크(전체 개수) 가져오기
  useEffect(() => {
    if (!isAuthed || !userId) return;
    (async () => {
      try {
        const res = await fetch(`/api/bookmarks?userId=${encodeURIComponent(userId)}`);
        const data = await res.json();
        const dedup = Array.isArray(data)
          ? Array.from(new Map(data.map(b => [String(b.historyId || b._id), b])).values())
          : [];
        setBookmarkItems(dedup);
      } catch (err) {
        console.error("북마크 목록 불러오기 실패:", err);
        setBookmarkItems([]);
      }
    })();
  }, [isAuthed, userId]);

  // 내 폴더 목록 가져오기 (글/곡 각각 해당 API)
  useEffect(() => {
    if (!isAuthed || !userId) return;
    (async () => {
      try {
        const basePath   = type === "글" ? "bookmarkFolder" : "playList";
        const filterType = type; // "글" 또는 "곡"
        const res = await fetch(
          `${BE}/api/${basePath}/folders?userId=${encodeURIComponent(userId)}&type=${encodeURIComponent(filterType)}`,
          { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
        );
        const data = res.ok ? await res.json() : [];
        // 서버 스키마: [{ id, title, type, thumbnailUrl, count }]
        const mapped = (Array.isArray(data) ? data : []).map(f => ({
          id: String(f.id),
          title: f.title,
          type: f.type,
          count: f.count ?? 0,
          imageUrl: buildImageSrc(f.thumbnailUrl) || (type === "글" ? "/assets/images/book-img.jpeg" : "/assets/images/album-image.png"),
        }));
        setServerFolders(mapped);
      } catch (e) {
        console.error("폴더 목록 실패:", e);
        setServerFolders([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed, userId, type, token]);

  // 렌더 카드: (글) '모든 글' + 서버 폴더 / (곡) 서버 폴더만
  const cards = useMemo(() => {
    const list = [...serverFolders];
    if (type === "글") {
      list.unshift({
        id: "1", // 기존 라우트 호환 (예전엔 1이 '모든 글'이었음)
        title: "북마크한 모든 글",
        type: "글",
        count: bookmarkItems.length,
        imageUrl: "/assets/images/book-img.jpeg",
        _builtinAll: true,
      });
    }
    return list;
  }, [serverFolders, type, bookmarkItems.length]);

  // 점(…) 클릭
  const handleMoreClick = (e, item) => {
    if (item._builtinAll) return; // '모든 글'은 메뉴 없음
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownInfo({ x: rect.left, y: rect.bottom, item });
  };

  // 스크롤 버튼 표시 제어
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
          {cards.map((item) => (
            <BookmarkCard
              key={item.id}
              title={item.title}
              type={item.type}
              imageUrl={item.imageUrl}
              count={item.count}
              onMoreClick={(e) => {
                if (item._builtinAll) return; // '모든 글'은 메뉴 없음
                const rect = e.currentTarget.getBoundingClientRect();
                setDropdownInfo({ x: rect.left, y: rect.bottom, item });
              }}
              onClick={() => {
                if (type === "글") {
                  if (item._builtinAll) {
                    // '북마크한 모든 글'
                    navigate("/archive/bookmark/typed");
                  } else {
                    // 내 폴더(글)
                    navigate(`/archive/bookmark/typed/typedList/${item.id}`, {
                      state: { title: item.title, thumbnailUrl: item.imageUrl },
                    });
                  }
                } else {
                  // 내 폴더(곡)
                  navigate(`/archive/bookmark/playedList/${item.id}`, {
                    state: { title: item.title, thumbnailUrl: item.imageUrl },
                  });
                }
              }}
            />
          ))}
        </S.CardRow>

        {showRightBtn && <S.ScrollRightBtn onClick={() => scroll("right")}>{">"}</S.ScrollRightBtn>}
      </S.ScrollWrapper>

      {dropdownInfo && (
        <Dropdown
          refProp={dropdownRef}
          x={dropdownInfo.x}
          y={dropdownInfo.y}
          onClose={() => setDropdownInfo(null)}
        >
          <li>이름변경</li>
          <li>폴더삭제</li>
        </Dropdown>
      )}
    </S.Section>
  );
};

export default BookmarkSection;