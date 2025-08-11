import S from "./bookmark.section.style";

const BookmarkCard = ({ title, count, imageUrl, type, onMoreClick, onClick }) => {

// BookmarkCard 내부에서 props로 사용하는 것들:
// {
//   id,
//   title,
//   type,
//   imageUrl,
//   count,
//   onMoreClick,
//   onClick,
// }

  return (
    <S.Card onClick={onClick}>
      <S.Image src={imageUrl} alt={title} />
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
