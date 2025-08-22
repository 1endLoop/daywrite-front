import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import CommunityPopularCard from "./CommunityPopularCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCommunityPublic, deletePost } from "../../api/communityApi";
import Toast from "../../components/Toast";

const CommunityHome = () => {
  const navigate = useNavigate();

  // 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 상단 인기 4개
  const [popularTop, setPopularTop] = useState([]);
  const [popLoading, setPopLoading] = useState(true);
  const [popError, setPopError] = useState(null);

  // 전체 목록 (정렬 토글)
  const [sort, setSort] = useState("popular"); // 'popular' | 'recent'
  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  // 토스트
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });
  const hideToast = () => setToast(null);

  // 상단 인기 4개: 항상 popular 기준
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setPopLoading(true);
        const res = await fetchCommunityPublic("popular");
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
  }, []);

  // 하단 전체 목록: 정렬 토글 반영
  const loadList = async () => {
    try {
      setListLoading(true);
      const res = await fetchCommunityPublic(sort);
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
    let alive = true;
    (async () => {
      await loadList();
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const handleEdit = (post) => {
    navigate("/community/write", { state: { mode: "edit", post } });
  };

  const handleDelete = async (post) => {
    if (!post?._id) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(post._id, userId);
      await loadList(); // 재조회 반영
      showToast("삭제되었습니다!", "success");
    } catch (e) {
      console.error(e);
      showToast("삭제 실패: 백엔드 라우트를 확인해 주세요.", "error");
    }
  };

  // 상단 카드용 안전 매핑 (music / artist, nickname, profileImg 호환)
  const popularMapped = useMemo(
    () =>
      popularTop.map((item) => ({
        ...item,
        music: item.musicTitle ?? item.music ?? "",
        artist: item.musicArtist ?? item.artist ?? "",
        nickname: item.nickname ?? "익명",
        author: item.nickname ?? item.author ?? "익명",
        profileImg: item.profileImg ?? item.profileImageUrl ?? "/assets/images/profiles/profile.jpg",
      })),
    [popularTop]
  );

  return (
    <Container>
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} duration={2000} />}

      {/* 상단: 인기 글 4개 */}
      <TopRow>
        <Left>
          <Title>인기 글</Title>
        </Left>
        <SearchBarWrapper>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchBarWrapper>
        <WriteButton onClick={() => navigate(`/community/write`)}>나만의 글 쓰기</WriteButton>
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
              onClick={() => navigate(`/community/${item._id || item.id}`, { state: { post: item } })}
            />
          ))}
        </CardPopularList>
      )}

      {/* 하단: 전체 글 목록 */}
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
            // 내 글 판단: 문자열/객체 케이스 모두 대응
            const isMine = !!userId && (item.userId === userId || item.userId?._id === userId);
            return (
              <CommunityCard
                key={item._id || item.id}
                data={item}
                onClick={() => navigate(`/community/${item._id || item.id}`, { state: { post: item } })}
                showMenu={isMine}                    // 내 글에만 더보기
                onEdit={() => handleEdit(item)}      // 수정하기
                onDelete={() => handleDelete(item)}  // 삭제하기
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

const SearchBarWrapper = styled.div`
  input {
    width: 260px;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
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
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
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