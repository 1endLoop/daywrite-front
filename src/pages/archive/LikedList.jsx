import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLikedByUser,
  toggleLike,
  subscribeLikeChanged,
} from "../../api/communityApi";
import CommunityCard from "../community/CommunityCard";
import Toast from "../../components/Toast";

const LikedList = ({ showHeader = true, title = "Liked", autoFocus = false }) => {
  const navigate = useNavigate();

  // 로그인 사용자
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser =
    auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 상태
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [toastId, setToastId] = useState(0);
  const showToast = (message, type = "success") => {
    setToastId((v) => v + 1);
    setToast({ id: Date.now() + Math.random(), message, type });
  };
  const hideToast = () => setToast(null);

  // 서버 → 카드 데이터 맵핑
  const mapPost = (it) => ({
    ...it,
    author: it.nickname || "익명", // 작성자=닉네임
    musicTitle: it.musicTitle || it.music || "",
    musicArtist: it.musicArtist || it.artist || "",
    profileImg:
      it.profileImg ||
      it.profileImageUrl ||
      "/assets/images/profiles/profile.jpg",
    comments: it.comments ?? 0,
  });

  // 목록 로드
  const load = async (q = "") => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetchLikedByUser(userId, q);
      const mapped = (res.items || []).map(mapPost);
      setItems(mapped);
    } catch (e) {
      console.error(e);
      setItems([]);
      showToast("Liked 목록을 불러오지 못했어요.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 초기/사용자 변경 시 로드
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // 다른 화면에서 좋아요 변경 시 반영
  useEffect(() => {
    const unsub = subscribeLikeChanged(({ postId, liked }) => {
      setItems((prev) => {
        if (!liked) return prev.filter((p) => (p._id || p.id) !== postId); // 해제 → 제거
        return prev; // 새로 누른 건 검색/리로드로 반영
      });
    });
    return unsub;
  }, [keyword, userId]);

  // 검색
  const onSearch = (e) => {
    const v = e.target.value;
    setKeyword(v);
    load(v);
  };

  // 좋아요 토글
  const handleToggleLike = async (postId) => {
    if (!userId) {
      window.alert("로그인 시 사용할 수 있어요!");
      return;
    }
    try {
      const res = await toggleLike(postId, userId);
      const { liked } = res;
      if (!liked) {
        setItems((prev) => prev.filter((p) => (p._id || p.id) !== postId));
      }
      showToast(liked ? "좋아요!" : "좋아요 해제", "success");
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
    }
  };

  const list = useMemo(() => items, [items]);

  return (
    <Container $compact={!showHeader}>
      {toast && (
        <Toast
          key={toast.id ?? toastId}
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
          duration={1600}
        />
      )}

      {showHeader && (
        <TopRow>
          <Title>{title}</Title>
          <SearchBarWrapper>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={onSearch}
              autoFocus={autoFocus}
              aria-label="좋아요 목록 검색"
            />
          </SearchBarWrapper>
        </TopRow>
      )}

      {loading ? (
        <InfoText>불러오는 중…</InfoText>
      ) : list.length === 0 ? (
        <InfoText>좋아요한 글이 아직 없어요.</InfoText>
      ) : (
        <CardList>
          {list.map((item) => (
            <CommunityCard
              key={item._id || item.id}
              data={item}
              onClick={() =>
                navigate(`/community/${item._id || item.id}`, {
                  state: { post: item, from: "archive-liked" },
                })
              }
              onToggleLike={handleToggleLike}
              showMenu={false} // LIKED에서는 수정/삭제 메뉴 숨김
            />
          ))}
        </CardList>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: ${(p) => (p.$compact ? "0" : "24px")}; /* 헤더 없으면 위 여백 제거 */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #131313;
`;

const SearchBarWrapper = styled.div`
  input {
    width: 260px;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoText = styled.div`
  color: #888;
  font-size: 14px;
  margin: 8px 0 20px;
`;

export default LikedList;