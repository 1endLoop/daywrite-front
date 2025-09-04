import Card from "./liked.card.style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LikedCard = ({ data, onToggleLike }) => {
  const navigate = useNavigate();

  const { _id, id, date, content, title, author, music, artist, liked = true } = data;
  const postId = _id || id;

  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  const [localLiked, setLocalLiked] = useState(!!liked);

  const goDetail = () => {
    if (!postId) return;
    navigate(`/community/${postId}`, { state: { from: "archive-liked" } });
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (!userId) {
      window.alert("로그인 시 사용할 수 있어요!");
      return;
    }
    await onToggleLike?.(postId);
    setLocalLiked((p) => !p);
  };

  return (
    <Card.Card onClick={goDetail}>
      <Card.Header>
        <Card.HeaderLeft>
          <span className="title">{title}</span>
          <span className="author">{author}</span>
        </Card.HeaderLeft>

        <Card.Icon onClick={handleLikeClick} title={localLiked ? "좋아요 해제" : "좋아요"}>
          <img
            src={localLiked ? "/assets/images/icons/svg/thumb=on.svg" : "/assets/images/icons/svg/thumb=off.svg"}
            alt="like"
          />
        </Card.Icon>
      </Card.Header>

      <Card.Content>{content}</Card.Content>

      <Card.Divider />

      <Card.BottomWrapper>
        <Card.MusicInfo>
          <span role="img" aria-label="music">🎵</span>
          <span className="music-name">{music}</span>
          <span className="artist">{artist}</span>
        </Card.MusicInfo>
        <Card.Date>{date}</Card.Date>
      </Card.BottomWrapper>
    </Card.Card>
  );
};

export default LikedCard;