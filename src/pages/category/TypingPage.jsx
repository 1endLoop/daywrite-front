import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import M from "./typing.page.style";
import MainPopup from "../main/MainPopup";
import MainPlaylistPopup from "../main/MainPlaylistPopup";
import CategoryPopup from "./CategoryPopup";
import MoodSelect from "./MoodSelect";
import { fetchRecommendedMusic } from "../../api/musicApi";
import Toast from "../../components/Toast";

const TypingPage = () => {
  const [writingData, setWritingData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [selectedMood, setSelectedMood] = useState("#FFFFFF");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [fade, setFade] = useState(true);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  // 로그인 상태 파생 (slice/키 이름 달라도 견고)
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  // 폴더 기본값 (필요시 UI에서 선택으로 확장 가능)
  const folderId = 1;

  const location = useLocation();
  const { keywords = [], genres = [] } = location.state || {};
  const [selectedKeywords, setSelectedKeywords] = useState(keywords);
  const [selectedGenres, setSelectedGenres] = useState(genres);

  // 추천 음악
  const [musicList, setMusicList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  // 글 + 음악 가져오기
  const fetchWriting = async () => {
    try {
      const res = await axios.post("/api/writing/random", {
        keywords: selectedKeywords,
        genres: selectedGenres,
      });

      if (!res?.data) {
        alert("조건에 맞는 글이 없습니다.");
        return;
      }

      setWritingData(res.data);

      // 음악 API
      const music = await fetchRecommendedMusic(selectedKeywords, selectedGenres);
      const DEFAULT_LASTFM_IMAGE = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";

      const parsed = music.map((track) => {
        const img = track.image?.[3]?.["#text"];
        const isDefault = img === DEFAULT_LASTFM_IMAGE;
        return {
          img: isDefault ? "/assets/images/album_cover/smiley.ori.jpg" : img, // ✅ 로컬 퍼블릭 경로
          title: track.name,
          artist: track.artist,
          liked: false,
        };
      });

      setMusicList(parsed);
      setCurrentSong(parsed[0] || null);
      setFade(true);
    } catch (error) {
      console.error("글/음악 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchWriting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeywords, selectedGenres]);

  if (!writingData) return <p>로딩 중...</p>;

  // 진행률 계산
  const current = inputValue.length;
  const total = writingData.content.length;
  const percent = Math.floor((current / total) * 100);
  const totalWidth = 1126;
  const tickWidth = 1.5;
  const pointWidth = 7;
  const gap = 20;
  const cycleWidth = tickWidth * 3 + pointWidth + gap * 3;
  const maxCycles = Math.floor(totalWidth / cycleWidth);
  const visibleCount = maxCycles * 4.5;
  const filledCount = Math.floor((percent / 100) * visibleCount);

  const handlePlayToggle = () => setIsPlaying((prev) => !prev);
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= writingData.content.length) {
      setInputValue(newValue);
    }
  };
  const handleSettingClick = () => {
    setPopupType(isAuthed ? "member" : "guest");
    setShowPopup(true);
  };

  // 북마크 토글 (히스토리 저장 후 북마크 저장) — 로그인 필요
  const handleBookmarkToggle = async () => {
    if (!isAuthed || !userId) {
      alert("로그인 시 사용 가능한 기능입니다!");
      return;
    }
    if (!writingData || inputValue.trim() === "") {
      alert("먼저 필사를 완료해주세요!");
      return;
    }

    try {
      // 1) 히스토리 저장 (userId + 배열 형태의 genre)
      const historyData = {
        userId,
        content: inputValue,
        book: writingData.book,
        author: writingData.author,
        publisher: writingData.publisher ?? "unknown",
        publishedDate: writingData.publishedDate ?? "unknown",
        bookCover: writingData.bookCover ?? "",
        keyword: selectedKeywords,
        genre: selectedGenres, //배열 유지
        music: currentSong?.title ?? "",
        artist: currentSong?.artist ?? "",
        mood: selectedMood,
      };

      const historyRes = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyData),
      });
      const historyJson = await historyRes.json();
      const historyId = historyJson.data?._id;
      if (!historyRes.ok || !historyId) throw new Error(historyJson?.message || "히스토리 저장 실패");

      // 2) 북마크 토글
      if (isBookmarked) {
        await fetch("/api/bookmarks", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId }),
        });
        setIsBookmarked(false);
        setShowBookmark(false);
        setToast("북마크에서 삭제되었습니다!");
      } else {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, historyId, folderId }),
        });
        setIsBookmarked(true);
        setShowBookmark(true);
        setToast("북마크에 저장되었습니다!");
      }

      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("북마크 처리 실패:", err);
      alert("에러 발생: " + err.message);
    }
  };

  return (
    <div>
      {toast && <Toast message={toast} />}
      {showPopup && (
        <MainPopup
          type={popupType}
          onClose={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            navigate(isAuthed ? "/mypage" : "/login");
          }}
        />
      )}

      {showPlaylist && <MainPlaylistPopup onClose={() => setShowPlaylist(false)} data={musicList} />}

      <M.OuterWrap>
        <M.Container>
          <M.Content01>
            <M.TopHeader>
              <M.IconButton onClick={handleBookmarkToggle}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    (isBookmarked
                      ? "/assets/images/icons/svg/bookmark=on.svg"
                      : "/assets/images/icons/svg/bookmark=off.svg")
                  }
                  alt="bookmark"
                />
              </M.IconButton>

              <M.TextBlock>
                <M.Heading>
                  <strong>{writingData.book}</strong> <p>{writingData.author ?? "Unknown"}</p>
                  <span style={{ marginLeft: 8 }}>| Posted by AI</span>
                </M.Heading>
              </M.TextBlock>

              <M.TitleIconWrap>
                <M.IcBtn onClick={handleSettingClick}>
                  <img src="/assets/images/icons/svg/settings.svg" alt="설정" />
                </M.IcBtn>
                <M.IcBtn>
                  <img src="/assets/images/icons/svg/ic/link.svg" alt="링크 복사" />
                </M.IcBtn>
                <M.IcBtn onClick={() => setInputValue("")}>
                  <img src="/assets/images/icons/svg/eraser.svg" alt="필사글 전체 지우기" />
                </M.IcBtn>
              </M.TitleIconWrap>
            </M.TopHeader>
          </M.Content01>

          <M.Content02>
            <M.TypingSpeedWrap>
              <M.Line style={{ backgroundColor: "#282828" }} />
              <M.ProgressBarWrapper>
                <M.ProgressBarContainer>
                  <M.ProgressBar>
                    {Array.from({ length: visibleCount }, (_, i) =>
                      (i + 1) % 4 === 0 ? (
                        <M.ProgressPoint key={i} $active={i < filledCount} />
                      ) : (
                        <M.ProgressTick key={i} $active={i < filledCount} />
                      )
                    )}
                  </M.ProgressBar>
                </M.ProgressBarContainer>
                <M.ProgressPercentWrap>
                  <M.Bar />
                  <M.Triangle />
                  <M.PercentText>{percent}%</M.PercentText>
                </M.ProgressPercentWrap>
              </M.ProgressBarWrapper>
              <M.Line style={{ backgroundColor: "#282828" }} />
            </M.TypingSpeedWrap>

            <M.FadeWrapper $fade={fade}>
              <M.ContentBox>
                <M.TypingOverlay aria-hidden>
                  {writingData.content.split("").map((char, index) => {
                    const typedChar = inputValue[index];
                    let color = "#BFBFBF";
                    if (typedChar !== undefined) {
                      if (index === inputValue.length - 1 && inputValue.length === index + 1) {
                        color = "#282828";
                      } else {
                        color = typedChar === char ? "#282828" : "red";
                      }
                    }
                    return (
                      <span key={index} style={{ color }}>
                        {typedChar ?? char}
                      </span>
                    );
                  })}
                </M.TypingOverlay>
                <M.HiddenInput value={inputValue} onChange={handleChange} spellCheck={false} />
              </M.ContentBox>
            </M.FadeWrapper>

            <M.UnderContent>
              <M.Line />
              <M.StyledUnder01>
                <M.StyledMusic>
                  <M.IconButton onClick={() => setShowLike(!showLike)}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        (showLike ? "/assets/images/icons/svg/like=on.svg" : "/assets/images/icons/svg/like=off.svg")
                      }
                      alt="like"
                    />
                  </M.IconButton>
                  {currentSong && (
                    <M.Album>
                      <M.AlbumImg src={currentSong.img} />
                      <M.AlbumInfo>
                        <h5>{currentSong.title}</h5>
                        <h6>{currentSong.artist}</h6>
                      </M.AlbumInfo>
                    </M.Album>
                  )}
                </M.StyledMusic>
                <M.PlayListIconWrap>
                  <M.PlayIconWrap>
                    <M.PlayIcon>
                      <img src="/assets/images/icons/svg/music_prev.svg" alt="이전" />
                    </M.PlayIcon>
                    <M.PlayIcon onClick={handlePlayToggle}>
                      <img
                        src={
                          isPlaying
                            ? "/assets/images/icons/svg/music_stop.svg"
                            : "/assets/images/icons/svg/music_play.svg"
                        }
                        alt={isPlaying ? "일시정지" : "재생"}
                      />
                    </M.PlayIcon>
                    <M.PlayIcon>
                      <img src="/assets/images/icons/svg/music_next.svg" alt="다음" />
                    </M.PlayIcon>
                  </M.PlayIconWrap>
                  <M.PlayListWrap onClick={() => setShowPlaylist(!showPlaylist)}>
                    <h4>PLAY LIST</h4>
                    <M.IcBtn>
                      <img src="/assets/images/icons/svg/list.svg" alt="플레이리스트" />
                    </M.IcBtn>
                  </M.PlayListWrap>
                </M.PlayListIconWrap>
              </M.StyledUnder01>

              <M.Line />
              <M.StyledUnder02>
                <M.CategoryInfoWrap>
                  <M.ReplayBtn onClick={fetchWriting}>
                    <img src="/assets/images/icons/svg/replay.svg" alt="새로고침" />
                  </M.ReplayBtn>
                  <M.SelectedInfoBlock>
                    <M.SelectedTitle>
                      내가 선택한 카테고리
                      <M.EditIconWrap onClick={() => setShowCategoryPopup(true)}>
                        <M.EditIcon src="/assets/images/icons/edit.png" alt="수정" />
                        <span>Edit</span>
                      </M.EditIconWrap>
                    </M.SelectedTitle>
                    <M.KeywordList>
                      {selectedKeywords.concat(selectedGenres).map((kw, i) => (
                        <span key={i}>{kw}</span>
                      ))}
                    </M.KeywordList>
                  </M.SelectedInfoBlock>
                </M.CategoryInfoWrap>

                {/* 저장(무드 선택) → 로그인 필요 + userId 포함 */}
                <M.SaveBtn onClick={() => setShowMoodPopup(true)}>저장</M.SaveBtn>
                {showMoodPopup && (
                  <MoodSelect
                    onClose={() => setShowMoodPopup(false)}
                    onSave={async (mood) => {
                      if (!isAuthed || !userId) {
                        alert("로그인 시 사용 가능한 기능입니다!");
                        return;
                      }
                      setSelectedMood(mood?.color || mood || "#FFFFFF");
                      setShowMoodPopup(false);

                      const historyData = {
                        userId,
                        content: inputValue,
                        book: writingData.book,
                        author: writingData.author,
                        publisher: writingData.publisher ?? "unknown",
                        publishedDate: writingData.publishedDate ?? "unknown",
                        bookCover: writingData.bookCover ?? "",
                        keyword: selectedKeywords,
                        genre: selectedGenres, 
                        music: currentSong?.title || "",
                        artist: currentSong?.artist || "",
                        mood: mood?.color || mood || "#FFFFFF",
                      };

                      try {
                        const res = await fetch("/api/history", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(historyData),
                        });

                        if (res.ok) {
                          alert("히스토리 저장 완료!");
                          setInputValue("");
                        } else {
                          const err = await res.json();
                          alert("저장 실패: " + (err.message || "서버 오류"));
                        }
                      } catch (err) {
                        console.error("히스토리 저장 실패:", err);
                        alert("에러 발생: " + err.message);
                      }
                    }}
                  />
                )}
              </M.StyledUnder02>
            </M.UnderContent>
          </M.Content02>
        </M.Container>
      </M.OuterWrap>

      {showCategoryPopup && (
        <CategoryPopup
          onClose={() => setShowCategoryPopup(false)}
          onSave={(newKeywords, newGenres) => {
            setSelectedKeywords(newKeywords);
            setSelectedGenres(newGenres);
            setShowCategoryPopup(false);
          }}
          defaultKeywords={selectedKeywords}
          defaultGenres={selectedGenres}
        />
      )}
    </div>
  );
};

export default TypingPage;
