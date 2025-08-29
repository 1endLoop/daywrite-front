// BookmarkCard.jsx
import S from "./bookmark.section.style";

const BookmarkCard = ({
  title,
  count,
  type, // "글" | "곡"
  onMoreClick,
  onClick,

  // 어떤 프롭 이름으로 오더라도 커버
  imageUrl,
  thumbnailUrl,
  imgUrl,
  cover,
  thumb,
}) => {
  // 백엔드 베이스 (http://localhost:8000 또는 실제 도메인)
  const getAssetOrigin = () => {
    const raw = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };

  // 카드 내부에서만 경로 보정
  const buildLocalSrc = (t = "") => {
    if (!t) return "";
    const s = String(t).replace(/\\/g, "/");
    if (/^https?:\/\//i.test(s)) return s;   // 절대 URL
    const origin = getAssetOrigin();
    if (s.startsWith("/")) return `${origin}${s}`;
    if (s.startsWith("uploads/")) return `${origin}/${s}`;
    return `${origin}/uploads/${s.replace(/^\/+/, "")}`;
  };

  const raw = imageUrl || thumbnailUrl || imgUrl || cover || thumb || "";
  const src = buildLocalSrc(raw);
  const fallback =
    type === "곡" ? "/assets/images/album-image.png" : "/assets/images/book-img.jpeg";

  return (
    <S.Card onClick={onClick}>
      <S.Image
        src={src || fallback}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = fallback;
        }}
      />
      <S.InfoRow>
        <S.CardTitle>{title}</S.CardTitle>
        <S.MenuWrapper onClick={(e) => e.stopPropagation()}>
          <S.MoreBtn onClick={onMoreClick}>⋯</S.MoreBtn>
        </S.MenuWrapper>
      </S.InfoRow>
      <S.CardDesc>{`${count}개의 ${type}`}</S.CardDesc>
    </S.Card>
  );
};

export default BookmarkCard;