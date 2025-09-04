import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../modules/user/user";
import M from "./main.form.style";
import MainPopup from "./MainPopup";
import MainPlaylistPopup from "./MainPlaylistPopup";
import Toast from "../../components/Toast";
import { fetchRecommendedMusic } from "../../api/musicApi";

const MainContainer = ({ isUpdate, setIsUpdate }) => {
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null); // 토스트
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fade, setFade] = useState(true);
  const [inputValue, setInputValue] = useState(""); // 입력 값
  const [currentData, setCurrentData] = useState(null);

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");

  const folderId = 1;

  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? "guest";
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : userId !== "guest";

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSettingClick = () => {
    setPopupType(isAuthed ? "member" : "guest");
    setShowPopup(true);
  };

  // =========================
  //  폰트 사이즈/웨이트
  // =========================
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);

  // 계정별 로컬스토리지 키 함수
  const nsKey = useMemo(() => (k) => `pref:${userId}:${k}`, [userId]);

  const getLineHeight = (fs) => {
    if (fs < 18) return Math.round(fs * 1.38);
    if (fs < 24) return Math.round(fs * 1.4);
    if (fs < 32) return Math.round(fs * 1.42);
    return Math.round(fs * 1.45);
  };
  const lineHeight = getLineHeight(fontSize);

  // ✅ 계정별 키에서 로드 (초기/유저 변경 시)
  useEffect(() => {
    const s = Number(localStorage.getItem(nsKey("fontSize")) ?? 24);
    const w = Number(localStorage.getItem(nsKey("fontWeight")) ?? 600);
    if (!Number.isNaN(s)) setFontSize(s);
    if (!Number.isNaN(w)) setFontWeight(w);
  }, [nsKey]);

  // (옵션) 다른 탭/창에서 값 바뀌면 동기화
  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || !e.key.startsWith(`pref:${userId}:`)) return;
      if (e.key.endsWith(":fontSize")) setFontSize(Number(e.newValue ?? 24));
      if (e.key.endsWith(":fontWeight")) setFontWeight(Number(e.newValue ?? 600));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [userId]);

  // =========================
  //  플레이리스트
  // =========================
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [musicList, setMusicList] = useState([]);

  const fetchRandomScript = async () => {
    try {
      const response = await fetch("/api/main/random");
      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();

      const keywords = data.keyword ?? [];
      const genres = data.genre ?? [];

      setCurrentData({
        typing: data.content,
        title: data.book,
        author: data.author,
        publisher: data.publisher || "unknown",
        publishedDate: data.publishedDate ?? "unknown",
        bookCover: data.bookCover ?? "",
      });

      setSelectedKeywords(keywords);
      setSelectedGenres(genres);

      const music = await fetchRecommendedMusic(keywords, genres);
      const DEFAULT_LASTFM_IMAGE = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";

      const parsed = music.map((track) => {
        const img = track.image?.[3]?.["#text"];
        const isDefault = img === DEFAULT_LASTFM_IMAGE;

        return {
          img: isDefault ? "/assets/images/album_cover/defaultAlbumCover.jpg" : img,
          title: track.name,
          artist: track.artist,
          liked: false,
        };
      });

      setMusicList(parsed);
      setCurrentSong(parsed[0] || null);

      setInputValue("");
      setFade(true);
    } catch (err) {
      console.error("랜덤 스크립트 불러오기 실패:", err);
    }
  };

  // 새로고침 버튼
  const handleRefresh = () => {
    setFade(false);
    setTimeout(() => {
      fetchRandomScript();
    }, 300);
  };

  // 마운트 시 자동 호출
  useEffect(() => {
    fetchRandomScript();
  }, []);

  // 진행률 계산
  const totalWidth = 1126;
  const tickWidth = 1.5;
  const pointWidth = 7;
  const gap = 20;
  const cycleWidth = tickWidth * 3 + pointWidth + gap * 3;
  const maxCycles = Math.floor(totalWidth / cycleWidth);
  const visibleCount = maxCycles * 4.5;

  const current = inputValue.length;
  const total = currentData?.typing.length ?? 0;
  const percent = total > 0 ? Math.floor((current / total) * 100) : 0;
  const filledCount = Math.floor((percent / 100) * visibleCount);

  // 필사글 저장
  const handleSave = async () => {
    if (!isAuthed || !userId || userId === "guest") {
      alert("로그인 시 사용 가능한 기능입니다!");
      return;
    }
    if (!currentData || inputValue.trim() === "") {
      alert("필사 내용이 비어 있어요!");
      return;
    }

    const historyData = {
      userId,
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "",
      music: currentSong?.title || "",
      artist: currentSong?.artist || "",
      keyword: selectedKeywords,
      genre: selectedGenres,
    };

    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyData),
      });

      if (res.ok) {
        const data = await res.json();
        alert("히스토리 저장 완료!");
        setInputValue("");
        
        // Redux store 업데이트 - 서버에서 계산된 최신 값으로 업데이트
        if (data.reward && rawUser) {
          const updatedUser = {
            ...rawUser,
            exp: data.reward.newTotalExp,  // 서버에서 계산된 총 경험치
            level: data.reward.newLevel    // 서버에서 계산된 새 레벨
          };
          dispatch(setUser(updatedUser));
          
          // 레벨업 시 추가 알림
          if (data.reward.levelUp) {
            setToast(`🎉 ${data.reward.expMessage}`);
          } else {
            setToast(`💰 +${data.reward.totalExp}XP 획득!`);
          }
        }
      } else {
        const err = await res.json();
        alert("저장 실패: " + (err.message || "서버 오류"));
      }
    } catch (err) {
      console.error("히스토리 저장 실패:", err);
      alert("에러 발생: " + err.message);
    }
  };

  // 북마크 핸들러
  const handleBookmark = async () => {
    if (!isAuthed || !userId || userId === "guest") {
      alert("로그인 시 사용 가능한 기능입니다!");
      return;
    }
    if (!currentData || isBookmarked || inputValue.trim() === "") {
      alert("필사 내용을 입력한 후 북마크할 수 있어요!");
      return;
    }

    const historyData = {
      userId,
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "",
      music: currentSong?.title || "",
      artist: currentSong?.artist || "",
      keyword: selectedKeywords,
      genre: selectedGenres,
    };

    try {
      const historyRes = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyData),
      });
      const historyJson = await historyRes.json();
      const historyId = historyJson.data?._id;

      if (!historyRes.ok || !historyId) {
        console.error("히스토리 저장 응답:", historyJson);
        throw new Error(historyJson?.message || "히스토리 저장 실패");
      }

      const bookmarkRes = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, historyId, folderId }),
      });
      if (!bookmarkRes.ok) {
        const errorRes = await bookmarkRes.json();
        throw new Error(errorRes.message || "북마크 저장 실패");
      }

      setIsBookmarked(true);
      setShowBookmark(true);
      setToast("북마크에 저장되었습니다!");
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("북마크 저장 에러:", err);
      alert("에러: " + err.message);
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

      <M.Container>
        <M.Content01>
          <M.TitleWrap>
            <div style={{ color: "#282828", fontSize: 26, fontFamily: "Pretendard", fontWeight: "500" }}>오늘의</div>
            <div style={{ color: "#282828", fontSize: 26, fontFamily: "Pretendard", fontWeight: "700" }}>추천글</div>
          </M.TitleWrap>
          <M.TitleIconWrap>
            <M.IcBtn onClick={handleSettingClick}>
              <img src="/assets/images/icons/svg/settings.svg" alt="필사 테마 설정" />
            </M.IcBtn>
            <M.IcBtn onClick={() => setInputValue("")}>
              <img src="/assets/images/icons/svg/eraser.svg" alt="필사글 전체 지우기" />
            </M.IcBtn>
          </M.TitleIconWrap>
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
              {currentData && (
                <M.TypingOverlay $fontSize={fontSize} $fontWeight={fontWeight} $lineHeight={lineHeight}>
                  {currentData.typing.split("").map((char, index) => {
                    const typedChar = inputValue[index];
                    let color = "#BFBFBF";
                    if (typedChar !== undefined) {
                      color = typedChar === char ? "#282828" : "red";
                      if (index === inputValue.length - 1 && inputValue.length === index + 1) {
                        color = "#282828";
                      }
                    }
                    return (
                      <span key={index} style={{ color }}>
                        {typedChar ?? char}
                      </span>
                    );
                  })}
                </M.TypingOverlay>
              )}

              <M.HiddenInput
                value={inputValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (currentData && newValue.length <= currentData.typing.length) {
                    setInputValue(newValue);
                  }
                }}
                spellCheck={false}
                $fontSize={fontSize}
                $fontWeight={fontWeight}
                $lineHeight={lineHeight}
              />
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
                <M.Album>
                  <M.AlbumImg src={currentSong?.img || ""} />
                  <M.AlbumInfo>
                    <h5>{currentSong?.title || ""}</h5>
                    <h6>{currentSong?.artist || ""}</h6>
                  </M.AlbumInfo>
                </M.Album>
              </M.StyledMusic>
              <M.PlayListIconWrap>
                <M.PlayIconWrap>
                  <M.PlayIcon>
                    <img src="/assets/images/icons/svg/music_prev.svg" alt="재생 이전" />
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
                    <img src="/assets/images/icons/svg/music_next.svg" alt="재생 다음" />
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

            <M.Line style={{ backgroundColor: "#282828" }} />

            <M.StyledUnder02>
              <M.ReplayBookIconWrap>
                <M.ReplayBtn onClick={handleRefresh}>
                  <img src="/assets/images/icons/svg/replay.svg" alt="필사 새로고침" />
                </M.ReplayBtn>
                <M.BookmarkInfoWrap>
                  <M.IconButton onClick={handleBookmark}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        (showBookmark
                          ? "/assets/images/icons/svg/bookmark=on.svg"
                          : "/assets/images/icons/svg/bookmark=off.svg")
                      }
                      alt="bookmark"
                    />
                  </M.IconButton>
                  <M.BookInfoWrapper>
                    <h4>{currentData?.title ?? "-"}</h4>
                    <M.BookInfoWrap>
                      <h5>{currentData?.author ?? "-"}</h5>
                    </M.BookInfoWrap>
                  </M.BookInfoWrapper>
                </M.BookmarkInfoWrap>
              </M.ReplayBookIconWrap>
              <M.SaveBtn onClick={handleSave}>저장</M.SaveBtn>
            </M.StyledUnder02>
          </M.UnderContent>
        </M.Content02>
      </M.Container>
    </div>
  );
};

export default MainContainer;

