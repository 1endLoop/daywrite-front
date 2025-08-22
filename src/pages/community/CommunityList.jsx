import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCommunityPublic, deletePost, toggleLike } from "../../api/communityApi";
import Toast from "../../components/Toast";
import { syncLikeInArray } from "../../modules/likeSync";

const CommunityList = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("popular");
  const [items, setItems] = useState([]);

  // 로그인 사용자
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 토스트 (반복 노출 지원)
  const [toast, setToast] = useState(null);
  const [toastId, setToastId] = useState(0);
  const showToast = (message, type = "success") => {
    setToastId((v) => v + 1);
    setToast({ id: Date.now() + Math.random(), message, type });
  };
  const hideToast = () => setToast(null);

  // ✅ 분리된 로그인 가드
  const requireLoginToast = () => {
    if (!userId) {
      showToast("로그인 시 사용할 수 있어요!", "error");
      return false;
    }
    return true;
  };
  const requireLoginAlert = () => {
    if (!userId) {
      window.alert("로그인 시 사용할 수 있어요!");
      return false;
    }
    return true;
  };

  const goWrite = () => {
    if (!requireLoginAlert()) return; // 글쓰기는 알럿
    navigate("/community/write");
  };

  const goMyPosts = () => {
    if (!requireLoginAlert()) return; // 내가 쓴 글은 알럿
    navigate("/community/mine");
  };

  const load = async () => {
    try {
      const res = await fetchCommunityPublic(sort, userId);
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, [sort, userId]);

  // 좋아요는 토스트
  const handleToggleLike = async (postId) => {
    if (!requireLoginToast()) return;
    try {
      const res = await toggleLike(postId, userId);
      const { liked, likes } = res;
      setItems((prev) => {
        const next = syncLikeInArray(prev, postId, liked, likes);
        return sort === "popular"
          ? [...next].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0) || new Date(b.createdAt) - new Date(a.createdAt))
          : next;
      });
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
    }
  };

  // 수정/삭제는 토스트 유지
  const handleEdit = (post) => {
    if (!requireLoginToast()) return;
    navigate("/community/write", { state: { mode: "edit", post } });
  };

  const handleDelete = async (post) => {
    if (!requireLoginToast()) return;
    if (!post?._id) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(post._id, userId);
      await load();
      showToast("삭제되었습니다!", "success");
    } catch (e) {
      console.error(e);
      showToast("삭제 실패: 백엔드 라우트를 확인해 주세요.", "error");
    }
  };

  return (
    <Container>
      {toast && (
        <Toast
          key={toast.id ?? toastId} // 같은 메시지도 반복 노출
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
          duration={2000}
        />
      )}

      <TopRow>
        <Left>
          <Title>전체 글</Title>
          <SortMenu>
            <button className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>
              인기순
            </button>
            <span className="divider">|</span>
            <button className={sort === "recent" ? "active" : ""} onClick={() => setSort("recent")}>
              최신순
            </button>
          </SortMenu>
        </Left>
        <RightControls>
          <WriteButton onClick={goWrite}>나만의 글 쓰기</WriteButton>
        </RightControls>
      </TopRow>

      <CardList>
        {items.map((item) => {
          const isMine = !!userId && (item.userId === userId || item.userId?._id === userId);
          return (
            <CommunityCard
              key={item._id || item.id}
              data={item}
              onClick={() => navigate(`/community/${item._id || item.id}`, { state: { post: item } })}
              showMenu={isMine}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
              onToggleLike={handleToggleLike}
            />
          );
        })}
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
  gap: 14px;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    font-size: 14px;
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;

    &.active {
      font-weight: 600;
      color: #000;
    }
  }

  .divider {
    color: #ccc;
    font-size: 14px;
  }
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

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #131313;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default CommunityList;
