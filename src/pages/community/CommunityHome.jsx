import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import CommunityPopularCard from "./CommunityPopularCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchCommunityPublic,
  deletePost,
  toggleLike,
  syncLikeInArray,
} from "../../api/communityApi";
import Toast from "../../components/Toast";
import { notifyLikeChanged } from "../../modules/likeSync";

const CommunityHome = () => {
  const navigate = useNavigate();

  // 로그인 사용자
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 토스트
  const [toast, setToast] = useState(null);
  const [toastId, setToastId] = useState(0);
  const showToast = (message, type = "success") => {
    setToastId((v) => v + 1);
    setToast({ id: Date.now() + Math.random(), message, type });
  };
  const hideToast = () => setToast(null);

  // 가드
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
    if (!requireLoginAlert()) return;
    navigate(`/community/write`);
  };

  // 상단 인기 4
  const [popularTop, setPopularTop] = useState([]);
  const [popLoading, setPopLoading] = useState(true);
  const [popError, setPopError] = useState(null);

  // 전체 목록
  const [sort, setSort] = useState("popular");
  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  // 상단 인기 4 로드
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setPopLoading(true);
        const res = await fetchCommunityPublic("popular", userId);
        if (!alive) return;
        const arr = Array.isArray(res?.items) ? res.items.slice(0, 4) : [];
        setPopularTop(arr);
        setPopError(null);
      } catch (e) {
        setPopError("인기 글을 불러오지 못했습니다.");
        setPopularTop([]);
      } finally {
        if (alive) setPopLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [userId]);

  // Top4 재계산
  const recomputeTop4 = (currentTop, list) => {
    const map = new Map();
    [...currentTop, ...list].forEach((it) => {
      const key = it._id || it.id;
      if (!key) return;
      map.set(key, it);
    });
    const merged = Array.from(map.values());
    merged.sort(
      (a, b) =>
        (b.likes ?? 0) - (a.likes ?? 0) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return merged.slice(0, 4);
  };

  // 하단 전체 목록 로드
  const loadList = async () => {
    try {
      setListLoading(true);
      const res = await fetchCommunityPublic(sort, userId);
      setItems(Array.isArray(res?.items) ? res.items : []);
      setListError(null);
    } catch (e) {
      setItems([]);
      setListError("목록을 불러오지 못했습니다.");
    } finally {
      setListLoading(false);
    }
  };
  useEffect(() => {
    loadList(); // eslint-disable-next-line
  }, [sort, userId]);

  // 좋아요 토글
  const handleToggleLike = async (postId) => {
    if (!requireLoginToast()) return;
    try {
      const res = await toggleLike(postId, userId);
      const { liked, likes } = res;

      // 상단 동기화
      setPopularTop((prev) => syncLikeInArray(prev, postId, liked, likes));

      // 하단 동기화 + 인기순이면 재정렬 + Top4 재계산
      setItems((prev) => {
        const next = syncLikeInArray(prev, postId, liked, likes);
        if (sort === "popular") {
          next.sort(
            (a, b) =>
              (b.likes ?? 0) - (a.likes ?? 0) ||
              new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
        setPopularTop((topPrev) => recomputeTop4(topPrev, next));
        return [...next];
      });

      // 전역 알림
      notifyLikeChanged(postId, liked, likes);
    } catch (e) {
      console.error(e);
      showToast("좋아요 처리 실패", "error");
    }
  };

  // 상단 카드 안전 매핑
  const popularMapped = useMemo(
    () =>
      popularTop.map((item) => ({
        ...item,
        music: item.musicTitle ?? item.music ?? "",
        artist: item.musicArtist ?? item.artist ?? "",
        nickname: item.nickname ?? "익명",
        author: item.nickname ?? item.author ?? "익명",
        profileImg:
          item.profileImg ?? item.profileImageUrl ?? "/assets/images/profiles/profile.jpg",
      })),
    [popularTop]
  );

  return (
    <Container>
      {toast && (
        <Toast
          key={toast.id ?? toastId}
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
          duration={2000}
        />
      )}

      {/* 상단: 인기 글 4개 */}
      <TopRow>
        <Left>
          <Title>인기 글</Title>
        </Left>

        <RightControls>
          <WriteButton onClick={goWrite}>나만의 글 쓰기</WriteButton>
        </RightControls>
      </TopRow>

      {popError && <InfoText>{popError}</InfoText>}
      {popLoading ? (
        <InfoText>불러오는 중…</InfoText>
      ) : (
        <CardPopularList>
          {popularMapped.map((item) => (
            <CommunityPopularCard
              key={item._id || item.id}
              data={item}
              onClick={() =>
                navigate(`/community/${item._id || item.id}`, {
                  state: { post: item },
                })
              }
              onToggleLike={handleToggleLike}
            />
          ))}
        </CardPopularList>
      )}

      {/* 하단: 전체 글 목록 */}
      <TopRow>
        <Left>
          <Title>전체 글</Title>
          <SortMenu>
            <button
              className={sort === "popular" ? "active" : ""}
              onClick={() => setSort("popular")}
            >
              인기순
            </button>
            <span className="divider">|</span>
            <button
              className={sort === "recent" ? "active" : ""}
              onClick={() => setSort("recent")}
            >
              최신순
            </button>
          </SortMenu>
        </Left>
        <AllViewBtn onClick={() => navigate(`/community/list`)}>
          <button>전체보기</button>
          <img src="assets/images/icons/right.png" alt="전체보기" />
        </AllViewBtn>
      </TopRow>

      {listError && <InfoText>{listError}</InfoText>}
      {listLoading ? (
        <InfoText>불러오는 중…</InfoText>
      ) : (
        <CardList>
          {items.map((item) => {
            const isMine =
              !!userId && (item.userId === userId || item.userId?._id === userId);
            return (
              <CommunityCard
                key={item._id || item.id}
                data={item}
                onClick={() =>
                  navigate(`/community/${item._id || item.id}`, {
                    state: { post: item },
                  })
                }
                showMenu={isMine}
                onEdit={() => {
                  if (!requireLoginToast()) return;
                  navigate("/community/write", { state: { mode: "edit", post: item } });
                }}
                onDelete={async () => {
                  if (!requireLoginToast()) return;
                  if (!item?._id) return;
                  const ok = window.confirm("정말 삭제할까요?");
                  if (!ok) return;
                  try {
                    await deletePost(item._id, userId);
                    await loadList();
                    setPopularTop((prev) =>
                      prev.filter((p) => (p._id || p.id) !== (item._id || item.id))
                    );
                    showToast("삭제되었습니다!", "success");
                  } catch (e) {
                    console.error(e);
                    showToast("삭제 실패: 백엔드 라우트를 확인해 주세요.", "error");
                  }
                }}
                onToggleLike={handleToggleLike}
              />
            );
          })}
        </CardList>
      )}
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
const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const SortMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
const CardPopularList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  overflow: hidden;
`;
const AllViewBtn = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 25px;
  button {
    font-size: 14px;
    background: none;
    border: none;
    padding: 0px;
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: center;
  }
  img {
    width: 25px;
    height: 25px;
    display: block;
  }
`;
const InfoText = styled.div`
  color: #888;
  font-size: 14px;
  margin: 8px 0 20px;
`;

export default CommunityHome;