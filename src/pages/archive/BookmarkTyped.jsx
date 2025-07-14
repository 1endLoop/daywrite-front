import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import S from "./bookmark.typed.style";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Dropdown from "../../components/dropdown/Dropdown";
import HistoryCard from "./HistoryCard";
import BookmarkDetail from "./BookmarkDetail";

const BookmarkTyped = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const dropdownInfo = dropdownOpen && {
    x: dropdownOpen.x,
    y: dropdownOpen.y,
  };

  const handleMoreClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownOpen({
      x: rect.left,
      y: rect.bottom,
    });
  };

  // 디테일 팝업
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (item) => {
    setSelectedCard(item); // 클릭한 카드 데이터 저장
  };

  const handleClose = () => {
    setSelectedCard(null); // 닫기
  };

  const [items, setItems] = useState([
    {
      id: 1,
      date: "2025.06.28",
      title: "끝내주는 인생",
      content:
        "영원히 멋진 타인 같은 건 없을 테지만 어느 시절 우리가 좋은 이야기 속에 있었다는 사실만은 잘 변하지 않는다. 최고의 순간을 같이 겪어준 누군가에게 권위를 부여하는 것이 나는 좋다. 그와 주고받은 시선과 언어가 자의식 천국의 건축 자재다. 천국은 지옥보다 터가 넓다. 거기선 평소처럼 굴어도 좋고 평소와 다르게 굴어도 좋고 끼 부려도 좋고 실수해도 좋고 세상에 없는 노래를 즉석에서 지어 불러도 좋다. ",
      author: "이슬아",
      publisher: "디플롯",
      publishedDate: "2023.07.03",
      music: "Love on Top",
      artist: "John Canada",
      coverUrl: "/assets/images/book-img.jpeg",
    },
  ]);

  // 편집 모드
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
    setSelectedIds([]); // 편집 모드 종료 시 초기화
  };

  const handleCardSelect = (id) => {
    if (!isEditMode) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleDeleteSelected = () => {
    const newItems = items.filter((item) => !selectedIds.includes(item.id));
    setItems(newItems);
    setSelectedIds([]);
  };

  return (
    <>
      {/* 상단 타이틀 영역 */}
      <S.TopRow>
        <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
        <S.PageTitle>북마크한 모든 글</S.PageTitle>
        <S.CountText>{items.length}개의 글</S.CountText>
        <S.SearchBar placeholder="검색어를 입력하세요" />
      </S.TopRow>

      {/* 메인 콘텐츠 */}
      <S.ContentWrapper>
        {/* 왼쪽: 썸네일 & 폴더 정보 */}
        <S.ThumbnailBox>
          <S.Thumbnail src="/assets/images/book-img.jpeg" />
          <S.FolderTitleRow>
            <S.FolderTitle>북마크한 모든 글</S.FolderTitle>

            <S.MenuWrapper>
              <S.MoreBtn onClick={handleMoreClick}>⋯</S.MoreBtn>
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
            </S.MenuWrapper>
          </S.FolderTitleRow>
          {isEditMode ? (
            <S.EditRow>
              <S.DeleteButton onClick={handleDeleteSelected}>삭제</S.DeleteButton>
              <S.SelectedText>{selectedIds.length}개 선택됨</S.SelectedText>
            </S.EditRow>
          ) : (
            <S.EditButton onClick={handleEditClick}>편집</S.EditButton>
          )}
        </S.ThumbnailBox>

        {/* 북마크 카드 리스트 */}
        <S.CardColumn>
          {items.map((item, idx) => (
            <HistoryCard
              key={item.id}
              data={item}
              onClick={() => (isEditMode ? handleCardSelect(item.id) : handleCardClick(item))}
              selected={selectedIds.includes(item.id)}
              isEditMode={isEditMode}
            />
          ))}
        </S.CardColumn>
        {/* 팝업 */}
        {selectedCard && <BookmarkDetail data={selectedCard} onClose={handleClose} />}
      </S.ContentWrapper>
    </>
  );
};

export default BookmarkTyped;
