import { useEffect, useState } from "react";
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "../../components/button/ToggleButton";
import { useSelector } from "react-redux";
import { fetchMyPosts, deletePost } from "../../api/communityApi";
import Toast from "../../components/Toast";
import { toggleLike } from "../../api/communityApi";
import { syncLikeInArray } from "../../modules/likeSync";

const CommunityMyPosts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // URL 쿼리(tab=temp)로 임시저장 탭 진입 지원
  const initialTemp = new URLSearchParams(location.search).get("tab") === "temp";
  const [isTemp, setIsTemp] = useState(initialTemp); // true=draft, false=published
  const [items, setItems] = useState([]);

  // 토스트
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });
  const hideToast = () => setToast(null);

  const load = async () => {
    if (!userId) return;
    try {
      const status = isTemp ? "draft" : "published";
      const res = await fetchMyPosts(userId, status);
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, [isTemp, userId]);

  const handleEdit = (post) => {
    navigate("/community/write", { state: { mode: "edit", post } });
  };

  // 단일 경로 삭제 + 성공 판정 후 토스트/갱신
  const handleDelete = async (post) => {
    if (!post?._id) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(post._id, userId); // ✅ 서버에서 실제 삭제
      // 서버 기준 재조회(새로고침해도 유지)
      await load();
      showToast("삭제되었습니다!", "success");
    } catch (e) {
      console.error(e);
      showToast("삭제 실패: 백엔드 라우트를 확인해 주세요.", "error");
    }
  };

  const ensureLogin = () => !!userId;

  const handleToggleLike = async (postId) => {
    if (!ensureLogin()) return;
    try {
      const res = await toggleLike(postId, userId);
      const { liked, likes } = res;
      setItems((prev) => syncLikeInArray(prev, postId, liked, likes));
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
    }
  };

  return (
    <Container>
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} duration={2000} />}

      <TopRow>
        <Left>
          <ToggleButton isTemp={isTemp} onToggle={setIsTemp} />
        </Left>
        <WriteButton onClick={() => navigate("/community/write")}>나만의 글 쓰기</WriteButton>
      </TopRow>

      <CardList>
        {items.map((item) => (
          <CommunityCard
            key={item._id}
            data={item}
            onClick={() => navigate(`/community/${item._id}`, { state: { post: item } })}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
            showMenu
            onToggleLike={handleToggleLike}
          />
        ))}
      </CardList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 24px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const WriteButton = styled.button`
  background-color: #ff6f3f;
  color: white;
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default CommunityMyPosts;
