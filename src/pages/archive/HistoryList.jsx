import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import { useSelector } from "react-redux";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toast, setToast] = useState(null);

  // 로그인 유저
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  // ✅ 데이터 가져오기
  useEffect(() => {
    if (!isAuthed || !userId) return; // 로그인 준비되면 호출

    const fetchData = async () => {
      try {
        // 1) 사용자 히스토리 조회 (백엔드 라우트: GET /api/history/user/:userId)
        const historyRes = await fetch(`/api/history/user/${userId}`);
        if (!historyRes.ok) throw new Error("히스토리 조회 실패");
        const histories = await historyRes.json(); // [{ _id, userId, ... }]

        // 2) 사용자 북마크 조회 (백엔드 구현에 따라 다를 수 있음)
        //    - Case A: [{ _id: bookmarkId, userId, historyId }]
        //    - Case B: [{ _id: bookmarkId, ...historyFields, bookmarkId }]
        const bookmarkRes = await fetch(`/api/bookmarks?userId=${userId}`);
        let bookmarks = [];
        if (bookmarkRes.ok) {
          bookmarks = await bookmarkRes.json();
        }

        // 북마크된 히스토리 _id 집합 만들기
        // A: historyId만 존재
        const idsFromHistoryId = new Set(bookmarks.filter((b) => b.historyId).map((b) => String(b.historyId)));

        // B: 조인되어 history 자체의 _id가 들어온 경우(주석처럼 서버가 돌려주는 형태)
        const idsFromJoined = new Set(
          bookmarks
            .filter((b) => b._id && !b.historyId) // 주: 서버 설계에 따라 조건 조정
            .map((b) => String(b._id))
        );

        // 로컬 음악 좋아요 키
        const likedMusicKeys = JSON.parse(localStorage.getItem("likedMusicIds") || "[]");

        const merged = histories.map((item) => {
          const key = `${item.music}___${item.artist}`;
          const isBookmarked = idsFromHistoryId.has(String(item._id)) || idsFromJoined.has(String(item._id));
          return {
            ...item,
            bookmarked: isBookmarked,
            liked: likedMusicKeys.includes(key),
          };
        });

        setHistoryList(merged);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [isAuthed, userId]);

  // ✅ 북마크 토글
  const toggleBookmark = async (item) => {
    if (!isAuthed || !userId) {
      setToast("로그인 시 사용 가능한 기능입니다!");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    const isBookmarked = item.bookmarked;
    const url = `/api/bookmarks`;

    try {
      if (isBookmarked) {
        await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId: item._id }),
        });
      } else {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId: item._id, folderId: 1 }),
        });
      }

      // 상태 업데이트
      setHistoryList((prev) => prev.map((el) => (el._id === item._id ? { ...el, bookmarked: !isBookmarked } : el)));

      // 디테일 팝업 상태도 함께 반영
      if (selectedCard && selectedCard._id === item._id) {
        setSelectedCard({ ...item, bookmarked: !isBookmarked });
      }

      setToast(isBookmarked ? "북마크에서 삭제되었습니다!" : "북마크에 저장되었습니다!");
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("북마크 처리 실패:", err);
    }
  };

  // 음악 좋아요 토글 (LocalStorage 활용)
  const toggleMusicLike = (item) => {
    const key = `${item.music}___${item.artist}`;
    const likedMusics = JSON.parse(localStorage.getItem("likedMusicIds") || "[]");

    const updated = item.liked ? likedMusics.filter((k) => k !== key) : [...likedMusics, key];

    localStorage.setItem("likedMusicIds", JSON.stringify(updated));

    setHistoryList((prev) => prev.map((el) => (el._id === item._id ? { ...el, liked: !item.liked } : el)));

    if (selectedCard && selectedCard._id === item._id) {
      setSelectedCard({ ...item, liked: !item.liked });
    }
  };

  // 삭제 함수
  // ✅ 삭제 함수 내부로 이동
  const deleteHistory = async (item) => {
    try {
      await fetch(`http://localhost:8000/api/history/${item._id}`, {
        method: "DELETE",
      });

      setHistoryList((prev) => prev.filter((el) => el._id !== item._id));
      setToast("삭제되었습니다!");
      setTimeout(() => setToast(null), 2000);

      if (selectedCard && selectedCard._id === item._id) {
        setSelectedCard(null);
      }
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <Container>
      {toast && <Toast message={toast} />}
      <TopRow>
        <Title>History</Title>
        <SearchBarWrapper>
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchBarWrapper>
      </TopRow>

      <CardList>
        {historyList.map((item) => (
          <HistoryCard
            key={item._id}
            data={item}
            onClick={() => setSelectedCard(item)}
            onToggleBookmark={() => toggleBookmark(item)}
            onToggleLike={() => toggleMusicLike(item)}
            onDelete={() => deleteHistory(item)}
            selected={false}
            isEditMode={false}
          />
        ))}
      </CardList>

      {selectedCard && (
        <HistoryDetail
          data={selectedCard}
          onClose={() => setSelectedCard(null)}
          onToggleBookmark={() => toggleBookmark(selectedCard)}
          onToggleLike={() => toggleMusicLike(selectedCard)}
        />
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

export default HistoryList;
