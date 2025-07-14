import S from "./bookmark.section.style";
import BookmarkSection from "./BookmarkSection";
import useScrollX from "../../modules/hooks/useScrollX";
import { ScrollButton } from "../../components/button/ScrollButton";

const BookmarkMain = () => {
  return (
    <S.Container>
      <BookmarkSection title="Typed" type="글" />
      <BookmarkSection title="Played" type="곡" />
    </S.Container>
  );
};

export default BookmarkMain;
