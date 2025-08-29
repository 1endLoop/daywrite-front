// BookmarkTypedList.jsx
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import S from "./bookmark.typed.style";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Dropdown from "../../components/dropdown/Dropdown";
import HistoryCard from "./HistoryCard";
import BookmarkDetail from "./BookmarkDetail";
import Toast from "../../components/Toast";

const BookmarkTypedList = () => {
  const BE = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const { id } = useParams();                 // 폴더 ObjectId
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  // 네비게이션 state로 받은 값(옵션)
  // const navState = (location.state || {});
  const navState = (location.state || {});
  const readOnly = !!navState.readOnly;
  const [folderMeta, setFolderMeta] = useState({
    title: navState.title || "폴더",
    thumbnailUrl: navState.thumbnailUrl || "",
  });
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [toast, setToast] = useState(null);

  // 로그인 유저
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? localStorage.getItem("uid") ?? null;

  // 드롭다운
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));
  const dropdownInfo = dropdownOpen && { x: dropdownOpen.x, y: dropdownOpen.y };
  const handleMoreClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownOpen({ x: rect.left, y: rect.bottom });
  };

  // 정적 파일 origin 보정
  const getAssetOrigin = () => {
    const raw = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };
  const buildImageSrc = (thumb = "") => {
    if (!thumb) return "";
    if (/^https?:\/\//i.test(thumb)) return thumb;
    const origin = getAssetOrigin();
    if (thumb.startsWith("/")) return `${origin}${thumb}`;
    if (thumb.startsWith("uploads/")) return `${origin}/${thumb}`;
    return `${origin}/uploads/${thumb}`;
  };

  // ✅ 폴더 상세 불러오기
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookmarkFolder/folders/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setFolderMeta({
          title: data.title,
          thumbnailUrl: buildImageSrc(data.thumbnailUrl),
        });
        setBookmarkItems(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        console.error("폴더 상세 조회 실패:", e);
      }
    })();
  }, [id]);

  // (필요 시) 북마크 토글/삭제 로직은 그대로 사용 가능
  // ... (기존 handleBookmark / handleDeleteSingle 등 그대로)

  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCardClick = (item) => {
    if (!isEditMode) setSelectedCard(item);
    else setSelectedIds((prev) => (prev.includes(item._id) ? prev.filter((v) => v !== item._id) : [...prev, item._id]));
  };

    // ---- 이름변경 ----
  const handleRename = async () => {
    setDropdownOpen(false);
    const next = window.prompt("새 폴더 이름을 입력하세요", folderMeta.title);
    if (next == null) return;               // 취소
    const title = next.trim();
    if (!title) return alert("제목을 입력해주세요.");

    try {
      const res = await fetch(`${BE}/api/bookmarkFolder/folders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, userId }), // 토큰 미들웨어 없을 때 대비
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "이름 변경 실패");

      setFolderMeta(prev => ({ ...prev, title: data.title }));
      setToast("폴더 이름이 변경되었습니다.");
      setTimeout(() => setToast(null), 1500);
    } catch (e) {
      console.error(e);
      alert("이름 변경에 실패했습니다.");
    }
  };

  // ---- 폴더 삭제 ----
  const handleDelete = async () => {
    setDropdownOpen(false);
    if (!window.confirm("정말 이 폴더를 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`${BE}/api/bookmarkFolder/folders/${id}?userId=${encodeURIComponent(userId ?? "")}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "삭제 실패");

      setToast("폴더가 삭제되었습니다.");
      setTimeout(() => {
        setToast(null);
        navigate(-1); // 목록 등 이전 페이지로
      }, 800);
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <>
      {toast && <Toast message={toast} />}
      <S.TopRow>
        <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
        <S.PageTitle>{folderMeta.title}</S.PageTitle>
        <S.CountText>{bookmarkItems.length}개의 글</S.CountText>
        <S.SearchBar placeholder="검색어를 입력하세요" />
      </S.TopRow>

      <S.ContentWrapper>
        <S.ThumbnailBox>
          <S.Thumbnail src={folderMeta.thumbnailUrl || "/assets/images/book-img.jpeg"} />
          <S.FolderTitleRow>
            <S.FolderTitle>{folderMeta.title}</S.FolderTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn> */}
              {!readOnly && <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn>}
            </div>
          </S.FolderTitleRow>

          {!readOnly && isEditMode ? (
            <S.FolderEditRow>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <S.DeleteButton /* onClick={handleDeleteSelected} */>삭제</S.DeleteButton>
                <S.SelectedText>{selectedIds.length}개 선택됨</S.SelectedText>
              </div>
              <S.DoneButton onClick={() => { setIsEditMode(false); setSelectedIds([]); }}>완료</S.DoneButton>
            </S.FolderEditRow>
          ) : (
            // <S.FolderEditRow>
            //   <S.EditButton onClick={() => { setIsEditMode(true); setSelectedIds([]); }}>편집</S.EditButton>
            // </S.FolderEditRow>
            !readOnly && (
              <S.FolderEditRow>
                <S.EditButton onClick={() => { setIsEditMode(true); setSelectedIds([]); }}>편집</S.EditButton>
              </S.FolderEditRow>
            )
          )}

          {!readOnly && dropdownInfo && (
            // <Dropdown refProp={dropdownRef} x={dropdownInfo.x} y={dropdownInfo.y} onClose={() => setDropdownOpen(false)}>
            //   <li>이름변경</li>
            //   <li>폴더삭제</li>
            // </Dropdown>
            <Dropdown
              refProp={dropdownRef}
              x={dropdownInfo.x}
              y={dropdownInfo.y}
              onClose={() => setDropdownOpen(false)}
            >
              <li onClick={handleRename}>이름변경</li>
              <li onClick={handleDelete}>폴더삭제</li>
            </Dropdown>
          )}
        </S.ThumbnailBox>

        <S.CardColumn>
          {bookmarkItems.map((item) => (
            <HistoryCard
              key={item._id}
              data={item}
              onToggleBookmark={() => {/* 필요 시 구현 */}}
              onToggleLike={() => {/* 필요 시 구현 */}}
              onClick={() => handleCardClick(item)}
              onDelete={() => {/* 필요 시 구현 */}}
              isEditMode={isEditMode}
              selected={selectedIds.includes(item._id)}
            />
          ))}
        </S.CardColumn>

        {selectedCard && <BookmarkDetail data={selectedCard} onClose={() => setSelectedCard(null)} />}
      </S.ContentWrapper>
    </>
  );
};

export default BookmarkTypedList;