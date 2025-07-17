import { useState, useRef } from "react";
import useClickOutside from "../../modules/hooks/useClickOutside";
import Card from "./history.card.style";
import Dropdown from "./dropdown.style";

const HistoryCard = ({ data, onClick, onToggleBookmark }) => {
  const { createdAt, content, book, author, music, artist, bookmarked } = data;

  const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [liked, setLiked] = useState(true);

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setOpenDropdown(false));

  return (
    <Card.Card>
      <Card.Header>
        <Card.Date>{formattedDate}</Card.Date>
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
          <Card.Icon
            onClick={(e) => {
              e.stopPropagation(); // 카드 클릭 방지
              onToggleBookmark(); // 부모의 북마크 핸들러 호출
            }}
          >
            <img
              src={
                bookmarked
                  ? "../assets/images/icons/svg/bookmark=on.svg"
                  : "../assets/images/icons/svg/bookmark=off.svg"
              }
              alt="bookmark"
            />
          </Card.Icon>
          <span className="title">{book}</span>
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
