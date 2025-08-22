import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCommunityPublic, deletePost } from "../../api/communityApi";
import Toast from "../../components/Toast";

const CommunityList = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("popular"); 
  const [items, setItems] = useState([]);

  // 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // 토스트
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });
  const hideToast = () => setToast(null);

  const load = async () => {
    try {
      const res = await fetchCommunityPublic(sort);
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
  }, [sort]);

  const handleEdit = (post) => {
    navigate("/community/write", { state: { mode: "edit", post } });
  };

  const handleDelete = async (post) => {
    if (!post?._id) return;
    const ok = window.confirm("정말 삭제할까요?");
    if (!ok) return;

    try {
      await deletePost(post._id, userId); // 서버 삭제
      await load();                      // 재조회로 반영
      showToast("삭제되었습니다!", "success");
    } catch (e) {
      console.error(e);
      showToast("삭제 실패: 백엔드 라우트를 확인해 주세요.", "error");
    }
  };

  return (
    <Container>
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} duration={2000} />}

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
        <WriteButton onClick={() => navigate("/community/write")}>나만의 글 쓰기</WriteButton>
      </TopRow>

      <CardList>
        {items.map((item) => {
          const isMine = !!userId && (item.userId === userId || item.userId?._id === userId);
          return (
            <CommunityCard
              key={item._id}
              data={item}
              onClick={() => navigate(`/community/${item._id}`, { state: { post: item } })}
              showMenu={isMine}                 // 내 글에만 더보기 표시
              onEdit={() => handleEdit(item)}   // 수정하기
              onDelete={() => handleDelete(item)} // 삭제하기
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
  font-family: Pretendard;
  font-weight: 500;
  background-color: #ff6f3f;
  width: 110px;
  height: 36px;
  color: white;
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
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