import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookmarkCard from "./BookmarkCard";
import S from "./bookmark.section.style";

const BookmarkAll = () => {
  const { type } = useParams(); // "typed" 또는 "played"
  const [items, setItems] = useState([]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const title = capitalize(type); // "Typed" 또는 "Played"
  const contentType = type === "typed" ? "글" : "곡";
  const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000").replace(/\/$/, ""); //

  // typed 보여주기
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) return setItems([]);

        const token = localStorage.getItem("jwtToken");

        const basePath = type === "typed" ? "bookmarkFolder" : "playList";
        const filterType = type === "typed" ? "글" : "곡";

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/${basePath}/folders?userId=${encodeURIComponent(uid)}&type=${encodeURIComponent(filterType)}`,
          { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
        );

        if (!res.ok) {
          console.error("폴더 목록 실패", await res.text());
          return setItems([]);
        }

        const data = await res.json(); // [{ id, title, type, thumbnailUrl, count }]
        setItems(data); // 이미 서버에서 type 필터됨
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    };
    fetchFolders();
  }, [type]);

  
  // 이미지
  // const buildImageSrc = (thumb = "") => {
  //   if (!thumb) return "";
  //   // 완전한 URL이면 그대로
  //   if (/^https?:\/\//i.test(thumb)) return thumb;

  //   // "/uploads/xxx" 같이 슬래시로 시작 → API_BASE + thumb
  //   if (thumb.startsWith("/")) return `${API_BASE}${thumb}`;

  //   // "uploads/xxx" → API_BASE + "/uploads/xxx"
  //   if (thumb.startsWith("uploads/")) return `${API_BASE}/${thumb}`;

  //   // 그 외 "profile/xxx" 같은 상대경로 → API_BASE + "/uploads/" + thumb
  //   return `${API_BASE}/uploads/${thumb}`;
  // };

  
  // BookmarkAll.jsx
  const getAssetOrigin = () => {
    // 예: http://localhost:8000 또는 http://localhost:8000/api
    const raw = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");
    // 끝의 /api 제거
    return raw.replace(/\/api$/i, "");
  };

  const buildImageSrc = (thumb = "") => {
    if (!thumb) return "";
    // 절대 URL이면 그대로
    if (/^https?:\/\//i.test(thumb)) return thumb;

    const origin = getAssetOrigin() || "http://localhost:8000";

    // "/uploads/..." → origin + thumb
    if (thumb.startsWith("/")) return `${origin}${thumb}`;
    // "uploads/..." → origin + "/uploads/..."
    if (thumb.startsWith("uploads/")) return `${origin}/${thumb}`;
    // "thumbnail/..."처럼 uploads 빠졌을 때 → origin + "/uploads/thumbnail/..."
    return `${origin}/uploads/${thumb}`;
  };


  useEffect(() => {
    console.table(items.map(i => ({
      title: i.title,
      raw: i.thumbnailUrl,
      built: buildImageSrc(i.thumbnailUrl)
    })));
  }, [items]);


  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     try {
  //       const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders`);
  //       const data = await res.json();
  //       const filtered = data.filter(folder => folder.type === contentType);
  //       setItems(filtered);
  //     } catch (err) {
  //       console.error("폴더 목록 불러오기 실패:", err);
  //     }
  //   };

  //   fetchFolders();
  // }, [type]);


  return (
    <S.Container>
      <S.AllTitle>{title}</S.AllTitle>
      <S.AllCardGrid>
        {items.map((item) => (
          // <BookmarkCard
          //   key={item.id}               // ← _id가 아니라 id
          //   title={item.title}
          //   count={item.count}          // ← playlistIds 길이 말고 서버에서 계산된 count 사용
          //   type={item.type}
          //   // imageUrl={item.thumbnailUrl}
          //   imageUrl={buildImageSrc(item.thumbnailUrl)}
          //   onClick={() => console.log(item)}
          // />
          <BookmarkCard
            key={item.id}
            title={item.title}
            count={item.count}
            type={item.type}
            imageUrl={buildImageSrc(item.thumbnailUrl)}
            onClick={() => console.log(item)}
          />
        ))}
      </S.AllCardGrid>

    </S.Container>
  );
};

export default BookmarkAll;
