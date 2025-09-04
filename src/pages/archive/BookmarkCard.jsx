import S from "./bookmark.section.style";

const BookmarkCard = ({
  title,
  count,
  type, // "글" | "곡"
  onMoreClick,        // ← 존재하면 메뉴 표시, 없으면 숨김
  onClick,

  // 어떤 프롭 이름으로 오더라도 커버
  imageUrl,
  thumbnailUrl,
  imgUrl,
  cover,
  thumb,
}) => {
  const getAssetOrigin = () => {
    const raw = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };

  const buildLocalSrc = (t = "") => {
    if (!t) return "";
    const s = String(t).replace(/\\/g, "/");
    if (/^https?:\/\//i.test(s)) return s;
    const origin = getAssetOrigin();
    if (s.startsWith("/")) return `${origin}${s}`;
    if (s.startsWith("uploads/")) return `${origin}/${s}`;
    return `${origin}/uploads/${s.replace(/^\/+/, "")}`;
  };

  const raw = imageUrl || thumbnailUrl || imgUrl || cover || thumb || "";
  const src = buildLocalSrc(raw);
  const fallback = type === "곡" ? "/assets/images/album-image.png" : "/assets/images/book-img.jpeg";

  const showMenu = typeof onMoreClick === "function";  // ★ 핵심

  return (
    <S.Card onClick={onClick}>
      <S.Image
        src={src || fallback}
        alt={title}
        onError={(e) => { e.currentTarget.src = fallback; }}
      />
      <S.InfoRow>
        <S.CardTitle>{title}</S.CardTitle>

        {showMenu && (  /* ★ onMoreClick 있을 때만 ⋯ 표시 */
          <S.MenuWrapper onClick={(e) => e.stopPropagation()}>
            <S.MoreBtn onClick={onMoreClick}>⋯</S.MoreBtn>
          </S.MenuWrapper>
        )}
      </S.InfoRow>

      <S.CardDesc>{`${count}개의 ${type}`}</S.CardDesc>
    </S.Card>
  );
};

export default BookmarkCard;