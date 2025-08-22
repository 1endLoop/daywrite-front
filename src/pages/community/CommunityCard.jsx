import { useState, useRef } from "react";
import Card from "./community.card.style";
import Dropdown from "../archive/dropdown.style";
import useClickOutside from "../../modules/hooks/useClickOutside";

const CommunityCard = ({ data, onClick, onEdit, onDelete, showMenu = false }) => {
  const {
    content = "",
    title = "",
    musicTitle = "",
    musicArtist = "",
    profileImg = data?.profileImg || data?.profileImageUrl || "",
    nickname = "익명",
    likes = 0,
    comments = 0,
  } = data;

  const [liked, setLiked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setOpenMenu(false));

  return (
    <Card.Card>
      <Card.Header>
        <Card.LeftInfo>
          <Card.Profile src={profileImg || "/assets/images/profiles/profile.jpg"} alt="profile" />
          <Card.TitleWrapper>
            <span className="title">{title}</span>
            <span className="author">{nickname}</span>
          </Card.TitleWrapper>
        </Card.LeftInfo>
        <Card.RightInfo>
          <Card.IconGroup>
            <Card.Icon onClick={() => setLiked((prev) => !prev)}>
              <img
                src={liked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"}
                alt="like"
              />
            </Card.Icon>
            <span>{likes}</span>
          </Card.IconGroup>

          <Card.IconGroup>
            <img src="/assets/images/icons/svg/comment.svg" alt="comment" />
            <span>{comments}</span>
          </Card.IconGroup>
        </Card.RightInfo>
      </Card.Header>

      <Card.Content onClick={onClick}>{content}</Card.Content>
      <Card.Divider />

      <Card.MusicInfo>
        <Card.MusicLeft>
          <span role="img" aria-label="music">
            🎵
          </span>
          <span className="music-name">{musicTitle}</span>
          <span className="artist">{musicArtist}</span>
        </Card.MusicLeft>

        {showMenu && (
          <Card.MusicRight ref={menuRef} onClick={(e) => e.stopPropagation()}>
            <Card.MoreBtn onClick={() => setOpenMenu((p) => !p)}>⋯</Card.MoreBtn>
            {openMenu && (
              <Dropdown.Wrapper>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      onEdit?.(data);
                      setOpenMenu(false);
                    }}
                  >
                    수정하기
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      onDelete?.(data);
                      setOpenMenu(false);
                    }}
                  >
                    삭제하기
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Wrapper>
            )}
          </Card.MusicRight>
        )}
      </Card.MusicInfo>
    </Card.Card>
  );
};

export default CommunityCard;
