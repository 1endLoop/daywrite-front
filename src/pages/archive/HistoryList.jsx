import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import HistoryDetail from "./HistoryDetail";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toast, setToast] = useState(null);

  const USER_ID = "user1";

  // ✅ 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 모든 history 불러오기
        const historyRes = await fetch("http://localhost:8000/api/history");
        const histories = await historyRes.json();

        // 2. 북마크 목록 불러오기
        const bookmarkRes = await fetch(`http://localhost:8000/api/bookmarks?userId=${USER_ID}`);
        const bookmarks = await bookmarkRes.json(); // [{ _id, ...history, bookmarkId }]
        const bookmarkedIds = bookmarks.map((item) => item._id); // history._id 기준

        const likedMusicKeys = JSON.parse(localStorage.getItem("likedMusicIds") || "[]");

        const merged = histories.map((item) => {
          const key = `${item.music}___${item.artist}`;
          return {
            ...item,
            bookmarked: bookmarkedIds.includes(item._id),
            liked: likedMusicKeys.includes(key),
          };
        });

        setHistoryList(merged);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ 북마크 토글
  const toggleBookmark = async (item) => {
    const isBookmarked = item.bookmarked;
    const url = "http://localhost:8000/api/bookmarks";

    try {
      if (isBookmarked) {
        await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, historyId: item._id }),
        });
        setToast("북마크에서 삭제되었습니다!");
      } else {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: USER_ID, historyId: item._id, folderId: 1 }),
        });
        setToast("북마크에 저장되었습니다!");
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
