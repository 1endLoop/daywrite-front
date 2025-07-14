import { useState, useRef, useEffect } from "react";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Card from "./history.card.style";
import Dropdown from "./dropdown.style";

const HistoryCard = ({ data, onClick, selected, isEditMode }) => {
  const { date, content, title, author, music, artist } = data;

  // 북마크, 좋아요 토글 버튼
  const [bookmarked, setBookmarked] = useState(true);
  const [liked, setLiked] = useState(true);

  // 드롭다운 (커스텀훅 경로: modules/hooks/useClickOutside.js)
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setOpenDropdown(false));

  return (
    <Card.Card selected={selected} onClick={onClick}>
      <Card.Header>
        <Card.Date>{date}</Card.Date>
        <Dropdown.Wrapper ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
          <Card.MoreBtn onClick={() => setOpenDropdown((prev) => !prev)}>⋯</Card.MoreBtn>
          {openDropdown && (
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => alert("공유하기!")}>공유하기</Dropdown.Item>
              <Dropdown.Item onClick={() => alert("삭제하기!")}>삭제하기</Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown.Wrapper>
      </Card.Header>
      <Card.Content onClick={onClick}>{content}</Card.Content>

      <Card.Divider />

      <Card.MetaWrapper>
        <Card.MetaLeft>
          <Card.Icon onClick={() => setBookmarked((prev) => !prev)}>
            <img
              src={
                bookmarked
                  ? "../assets/images/icons/svg/bookmark=on.svg"
                  : "../assets/images/icons/svg/bookmark=off.svg"
              }
              alt="bookmark"
            />
          </Card.Icon>
          <span className="title">{title}</span>
          <span className="author">{author}</span>
        </Card.MetaLeft>

        <Card.MetaRight>
          <Card.Icon onClick={() => setLiked((prev) => !prev)}>
            <img
              src={liked ? "../assets/images/icons/svg/like=on.svg" : "../assets/images/icons/svg/like=off.svg"}
              alt="like"
            />
          </Card.Icon>
          <Card.Music>
            <span role="img" aria-label="music">
              🎵
            </span>
            <span className="music-name">{music}</span>
            <span className="artist">{artist}</span>
          </Card.Music>
        </Card.MetaRight>
      </Card.MetaWrapper>
    </Card.Card>
  );
};

export default HistoryCard;
