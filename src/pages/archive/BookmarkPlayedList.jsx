// BookmarkPlayedList.jsx
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import S from "./bookmark.typed.style";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Dropdown from "../../components/dropdown/Dropdown";
import Toast from "../../components/Toast";
import BookmarkPlayCard from "./BookmarkPlayCard";

const BookmarkPlayedList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const BE = process.env.REACT_APP_BACKEND_URL;
  const navState = location.state || {};
  const readOnly = !!navState.readOnly;

  // 네비게이션 state(빠르게 초깃값으로 사용)
  const [folderMeta, setFolderMeta] = useState({
    title: navState.title || "폴더",
    thumbnailUrl: navState.thumbnailUrl || "",
  });

  const [toast, setToast] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // 로그인 유저
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? localStorage.getItem("uid") ?? null;
  const token = localStorage.getItem("jwtToken");

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
  
  const buildImageSrc = (raw = "") => {
    if (!raw) return "";
    const s = String(raw).trim().replace(/\\/g, "/");
    if (/^(https?:|data:|blob:)/i.test(s)) return s;       // ← 이미 절대/데이터 URL이면 그대로

    const origin = getAssetOrigin();
    if (s.startsWith("/uploads/")) return `${origin}${s}`;
    if (s.startsWith("uploads/"))  return `${origin}/${s}`;
    return `${origin}/uploads/${s.replace(/^\/+/, "")}`;
  };


  // ✅ 폴더 상세 불러오기 (플레이리스트 폴더)
  // useEffect(() => {
  //   if (!id) return;
  //   (async () => {
  //     try {
  //       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders/${id}`, {
  //         headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  //       });
  //       if (!res.ok) throw new Error(await res.text());
  //       const data = await res.json();
  //       console.log("played folder detail >", data);

  //       // 폴더 메타 업데이트
  //       setFolderMeta({
  //         title: data.title || navState.title || "폴더",
  //         thumbnailUrl: buildImageSrc(data.thumbnailUrl || navState.thumbnailUrl || ""),
  //       });

  //       // 곡 목록 세팅 (서버가 items로 내려준다고 가정)
  //       const list = Array.isArray(data.items) ? data.items : [];
  //       setSongs(list);
  //     } catch (e) {
  //       console.error("플레이드 폴더 상세 실패:", e);
  //       setSongs([]);
  //     }
  //   })();
  //   // navState는 초기값 역할이라 deps에 안넣음
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id, token]);

  useEffect(() => {
  if (!id) return;
  (async () => {
    try {
      const res = await fetch(`${BE}/api/playList/folders/${id}`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      console.log("played folder detail >", data);

      // ── 폴더 메타 썸네일 정규화 ──
      const rawCover = data.thumbnailUrl || navState.thumbnailUrl || "";
      setFolderMeta({
        title: data.title || navState.title || "폴더",
        thumbnailUrl: buildImageSrc(rawCover),
      });

      // ── 곡 목록 이미지 정규화(키 통일) ──
      const list = Array.isArray(data.items) ? data.items : [];
      const normalized = list.map((it) => {
        const rawImg = it.imageUrl || it.img || it.albumArt || "";
        return {
          ...it,
          imageUrl: buildImageSrc(rawImg), // 카드가 imageUrl만 보면 되도록 통일
        };
      });
      setSongs(normalized);
    } catch (e) {
      console.error("플레이드 폴더 상세 실패:", e);
      setSongs([]);
    }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id, token]);

  // ---- 이름변경 ----
const handleRename = async () => {
  setDropdownOpen(false);
  const next = window.prompt("새 폴더 이름을 입력하세요", folderMeta.title);
  if (next == null) return;
  const title = next.trim();
  if (!title) return alert("제목을 입력해주세요.");

  try {
    const res = await fetch(`${BE}/api/playList/folders/${id}`, {
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
    const res = await fetch(`${BE}/api/playList/folders/${id}?userId=${encodeURIComponent(userId ?? "")}`, {
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
      navigate(-1);
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
        <S.CountText>{songs.length}개의 곡</S.CountText>
        <S.SearchBar placeholder="검색어를 입력하세요" />
      </S.TopRow>

      <S.PlayListWrapper>
        <S.ThumbnailBox>
          {/* <S.Thumbnail src={folderMeta.thumbnailUrl || "/assets/images/album-image.png"} /> */}
          <S.Thumbnail
            src={folderMeta.thumbnailUrl || "/assets/images/album-image.png"}
            onError={(e) => { e.currentTarget.src = "/assets/images/album-image.png"; }}
          />
          <S.FolderTitleRow>
            <S.FolderTitle>{folderMeta.title}</S.FolderTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn> */}
              {!readOnly && <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn>}
            </div>
          </S.FolderTitleRow>

          <S.FolderEditRow />
          {!readOnly && dropdownInfo && (
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
          
        <S.PlayCardColumn>
          <BookmarkPlayCard
            data={songs}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            // selectable={true}
            selectable={!readOnly}
          />
        </S.PlayCardColumn>
      </S.PlayListWrapper>
    </>
  );
};

export default BookmarkPlayedList;