import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import S from "./bookmark.typed.style";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Dropdown from "../../components/dropdown/Dropdown";
import HistoryCard from "./HistoryCard";
import BookmarkDetail from "./BookmarkDetail";
import Toast from "../../components/Toast";

const BookmarkTyped = () => {
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [toast, setToast] = useState(null);
  const { id } = useParams(); // 폴더 ID (없으면 기본 1 사용)
  const folderId = Number(id) || 1;

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  // ✅ 로그인 유저 파생 (slice/키 이름이 달라도 견고)
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  const dropdownInfo = dropdownOpen && { x: dropdownOpen.x, y: dropdownOpen.y };

  const handleMoreClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownOpen({ x: rect.left, y: rect.bottom });
  };

  // ✅ 북마크 목록 조회 (로그인 완료 후 진행)
  useEffect(() => {
    if (!isAuthed || !userId) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`/api/bookmarks?userId=${userId}&folderId=${folderId}`);
        if (!res.ok) throw new Error("북마크 조회 실패");
        const data = await res.json();

        if (Array.isArray(data)) {
          const likedMusicKeys = JSON.parse(localStorage.getItem("likedMusicIds") || "[]");
          const parsed = data.map((item) => {
            const musicKey = `${item.music}___${item.artist}`;
            return {
              ...item,
              bookmarked: true,
              liked: likedMusicKeys.includes(musicKey),
            };
          });
          setBookmarkItems(parsed);
        } else {
          console.warn("북마크 응답이 배열이 아닙니다:", data);
          setBookmarkItems([]);
        }
      } catch (err) {
        console.error("북마크 불러오기 실패:", err);
      }
    };

    fetchBookmarks();
  }, [isAuthed, userId, folderId]);

  // ✅ 북마크 토글(로그인 필요)
  const handleBookmark = async (item) => {
    if (!isAuthed || !userId) {
      setToast("로그인 시 사용 가능한 기능입니다!");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    const isBookmarked = item.bookmarked;

    try {
      if (isBookmarked) {
        // 삭제
        await fetch(`/api/bookmarks`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId: item._id }),
        });

        setBookmarkItems((prev) => prev.filter((b) => b._id !== item._id));
        setToast("북마크에서 삭제되었습니다!");
      } else {
        // 추가
        const res = await fetch(`/api/bookmarks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId: item._id, folderId }),
        });
        const saved = await res.json();

        setBookmarkItems((prev) => [
          ...prev,
          {
            ...item,
            bookmarked: true,
            bookmarkId: saved._id,
            folderId,
          },
        ]);
        setToast("북마크에 저장되었습니다!");
      }

      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("북마크 처리 실패:", err);
    }
  };

  // 음악 좋아요 토글 (LocalStorage 활용)
  const toggleLike = (item) => {
    const musicKey = `${item.music}___${item.artist}`;
    const likedMusics = JSON.parse(localStorage.getItem("likedMusicIds") || "[]");
    const updated = item.liked ? likedMusics.filter((k) => k !== musicKey) : [...likedMusics, musicKey];

    localStorage.setItem("likedMusicIds", JSON.stringify(updated));
    setBookmarkItems((prev) => prev.map((el) => (el._id === item._id ? { ...el, liked: !item.liked } : el)));
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (item) => {
    if (!isEditMode) setSelectedCard(item);
    else handleCardSelect(item._id);
  };

  const handleClose = () => setSelectedCard(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setSelectedIds([]);
  };

  const handleEditDone = () => {
    setIsEditMode(false);
    setSelectedIds([]);
  };

  const handleCardSelect = (id) => {
    if (!isEditMode) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  // ✅ 선택 삭제(로그인 필요)
  const handleDeleteSelected = async () => {
    if (!isAuthed || !userId) {
      setToast("로그인 시 사용 가능한 기능입니다!");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    try {
      await Promise.all(
        selectedIds.map((historyId) =>
          fetch(`/api/bookmarks`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, historyId }),
          })
        )
      );

      const newItems = bookmarkItems.filter((item) => !selectedIds.includes(item._id));
      setBookmarkItems(newItems);
      setSelectedIds([]);
      setToast("삭제가 완료되었습니다!");
      setTimeout(() => setToast(null), 2000);
    } catch (error) {
      console.error("삭제 실패:", error);
      setToast("삭제 중 오류가 발생했습니다.");
      setTimeout(() => setToast(null), 2000);
    }
  };

  // ✅ 단일 삭제(로그인 필요)
  const handleDeleteSingle = async (item) => {
    if (!isAuthed || !userId) {
      setToast("로그인 시 사용 가능한 기능입니다!");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    try {
      await fetch(`/api/bookmarks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, historyId: item._id }),
      });

      setBookmarkItems((prev) => prev.filter((b) => b._id !== item._id));
      setToast("북마크에서 삭제되었습니다!");
      setTimeout(() => setToast(null), 2000);

      if (selectedCard && selectedCard._id === item._id) setSelectedCard(null);
    } catch (err) {
      console.error("북마크 삭제 실패:", err);
      setToast("삭제 중 오류 발생");
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <>
      {toast && <Toast message={toast} />}
      <S.TopRow>
        <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
        <S.PageTitle>북마크한 모든 글</S.PageTitle>
        <S.CountText>{bookmarkItems.length}개의 글</S.CountText>
        <S.SearchBar placeholder="검색어를 입력하세요" />
      </S.TopRow>

      <S.ContentWrapper>
        <S.ThumbnailBox>
          <S.Thumbnail src="/assets/images/book-img.jpeg" />

          <S.FolderTitleRow>
            <S.FolderTitle>북마크한 모든 글</S.FolderTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn>
            </div>
          </S.FolderTitleRow>

          {isEditMode ? (
            <S.FolderEditRow>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <S.DeleteButton onClick={handleDeleteSelected}>삭제</S.DeleteButton>
                <S.SelectedText>{selectedIds.length}개 선택됨</S.SelectedText>
              </div>
              <S.DoneButton onClick={handleEditDone}>완료</S.DoneButton>
            </S.FolderEditRow>
          ) : (
            <S.FolderEditRow>
              <S.EditButton onClick={handleEditClick}>편집</S.EditButton>
            </S.FolderEditRow>
          )}

          {dropdownInfo && (
            <Dropdown
              refProp={dropdownRef}
              x={dropdownInfo.x}
              y={dropdownInfo.y}
              onClose={() => setDropdownOpen(false)}
            >
              <li>이름변경</li>
              <li>폴더삭제</li>
            </Dropdown>
          )}
        </S.ThumbnailBox>

        <S.CardColumn>
          {bookmarkItems.map((item) => (
            <HistoryCard
              key={item._id}
              data={item}
              onToggleBookmark={() => handleBookmark(item)}
              onToggleLike={() => toggleLike(item)}
              onClick={() => handleCardClick(item)}
              onDelete={() => handleDeleteSingle(item)}
              isEditMode={isEditMode}
              selected={selectedIds.includes(item._id)}
            />
          ))}
        </S.CardColumn>

        {selectedCard && <BookmarkDetail data={selectedCard} onClose={handleClose} />}
      </S.ContentWrapper>
    </>
  );
};

export default BookmarkTyped;
