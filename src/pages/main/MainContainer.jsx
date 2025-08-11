import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import M from "./main.form.style";
import MainPopup from "./MainPopup";
import MainPlaylistPopup from "./MainPlaylistPopup";
import Toast from "../../components/Toast";
import { fetchRecommendedMusic } from "../../api/musicApi";
// import { parse } from "@fortawesome/fontawesome-svg-core"; // 미사용 시 제거

const MainContainer = ({ isUpdate, setIsUpdate }) => {
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

  // ✅ 로그인 상태를 견고하게 계산 (slice/키 이름이 달라도 동작)
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSettingClick = () => {
    setPopupType(isAuthed ? "member" : "guest");
    setShowPopup(true);
  };

  // fontsize, fontweight
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);
  const getLineHeight = (fontSize) => {
    if (fontSize < 18) return Math.round(fontSize * 1.38);
    if (fontSize < 24) return Math.round(fontSize * 1.4);
    if (fontSize < 32) return Math.round(fontSize * 1.42);
    return Math.round(fontSize * 1.45);
  };

  const lineHeight = getLineHeight(fontSize);

  useEffect(() => {
    const savedSize = parseInt(localStorage.getItem("fontSize"), 10);
    const savedWeight = parseInt(localStorage.getItem("fontWeight"), 10);
    if (!isNaN(savedSize)) setFontSize(savedSize);
    if (!isNaN(savedWeight)) setFontWeight(savedWeight);
  }, []);

  // 플레이리스트
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); // ✅ 초기값 null로 (배열 아님)
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
          img: isDefault ? "/assets/images/album_cover/smiley.ori.jpg" : img,
          title: track.name,
          artist: track.artist,
          liked: false,
        };
      });

      setMusicList(parsed);
      setCurrentSong(parsed[0] || null); // ✅ 안전

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
    if (!isAuthed || !userId) {
      alert("로그인 시 사용 가능한 기능입니다!");
      return;
    }

    if (!currentData || inputValue.trim() === "") {
      alert("필사 내용이 비어 있어요!");
      return;
    }

    const historyData = {
      userId, // ✅ 로그인한 사용자
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "", // 이미지 없으면 빈 문자열
      music: currentSong?.title || "",
      artist: currentSong?.artist || "",
      keyword: selectedKeywords,
      genre: selectedGenres, // ✅ 배열 유지
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
  };

  // 북마크 핸들러 (히스토리 저장 후 북마크 저장까지 연계)
  const handleBookmark = async () => {
    // 1) 로그인/입력 가드
    if (!isAuthed || !userId) {
      alert("로그인 시 사용 가능한 기능입니다!");
      return;
    }
    if (!currentData || isBookmarked || inputValue.trim() === "") {
      alert("필사 내용을 입력한 후 북마크할 수 있어요!");
      return;
    }

    // 2) 히스토리 저장 payload (userId 포함)
    const historyData = {
      userId, // ✅ 로그인한 사용자
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "",
      music: currentSong?.title || "",
      artist: currentSong?.artist || "",
      keyword: selectedKeywords,
      genre: selectedGenres, // 배열 유지
    };

    try {
      // 3) 히스토리 저장 (프록시 상대경로)
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

      // 4) 북마크 저장 (userId로)
      const bookmarkRes = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, historyId, folderId }),
      });
      if (!bookmarkRes.ok) {
        const errorRes = await bookmarkRes.json();
        throw new Error(errorRes.message || "북마크 저장 실패");
      }

      // 5) 상태/UI 갱신
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
            navigate(isAuthed ? "/mypage" : "/login"); // ✅ isAuthed 사용
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
                    <h5 style={{ color: "#282828" }}>{currentSong?.title || ""}</h5>
                    <h6 style={{ color: "#787878" }}>{currentSong?.artist || ""}</h6>
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
                      {/* <small style={{ color: "#787878" }}>{currentData?.publisher ?? "-"}</small> */}
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
