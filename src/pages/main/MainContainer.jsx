import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "./main.form.style";
import MainPopup from "./MainPopup";
import MainPlaylistPopup from "./MainPlaylistPopup";
import Toast from "../../components/Toast";

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
  const isLoggedIn = false;

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSettingClick = () => {
    setPopupType(isLoggedIn ? "member" : "guest");
    setShowPopup(true);
  };

  // 플레이리스트
  const [showPlaylist, setShowPlaylist] = useState(false);
  const dummyPlaylist = [
    { img: "/assets/images/album_cover/love-on-top.jpg", title: "Love on Top", artist: "Beyonce", liked: true },
    {
      img: "/assets/images/album_cover/love-sick-girls.jpg",
      title: "Love Sick Girls",
      artist: "BlackPink(블랙핑크)",
      liked: false,
    },
    { img: "/assets/images/album_cover/smiley.ori.jpg", title: "Smiley", artist: "YENA(최예나)", liked: false },
    { img: "/assets/images/album_cover/summernignt.lyn.jpg", title: "한여름 밤", artist: "Lyn(린)", liked: true },
    { img: "/assets/images/album_cover/the-winning.jpg", title: "the winning", artist: "IU(아이유)", liked: true },
  ];
  const [currentSong, setCurrentSong] = useState(dummyPlaylist[0]);

  const fetchRandomScript = async () => {
    try {
      const response = await fetch("/api/main/random");

      if (!response.ok) throw new Error("서버 응답 오류");

      const data = await response.json();

      setCurrentData({
        typing: data.content,
        title: data.book,
        author: data.author,
        publisher: data.publisher || "unknown",
        publishedDate: data.publishedDate ?? "unknown",
        bookCover: data.bookCover ?? "",
      });

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
      const nextSong = dummyPlaylist[Math.floor(Math.random() * dummyPlaylist.length)];
      setCurrentSong(nextSong);
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
    if (!currentData || inputValue.trim() === "") {
      alert("필사 내용이 비어 있어요!");
      return;
    }

    const historyData = {
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "", // 이미지 없으면 빈 문자열
      music: currentSong.title,
      artist: currentSong.artist,
    };

    try {
      const res = await fetch("http://localhost:8000/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historyData),
      });

      if (res.ok) {
        alert("히스토리 저장 완료!");
        setInputValue("");
      } else {
        const err = await res.json();
        alert("저장 실패: " + err.message);
      }
    } catch (err) {
      console.error("히스토리 저장 실패:", err);
      alert("에러 발생: " + err.message);
    }
  };

  // 북마크 핸들러 (히스토리 저장 후 북마크 저장까지 연계)
  const handleBookmark = async () => {
    if (!currentData || isBookmarked || inputValue.trim() === "") {
      alert("필사 내용을 입력한 후 북마크할 수 있어요!");
      return;
    }

    const historyData = {
      content: inputValue,
      book: currentData.title,
      author: currentData.author,
      publisher: currentData.publisher ?? "unknown",
      publishedDate: currentData.publishedDate ?? "unknown",
      bookCover: currentData.bookCover ?? "",
      music: currentSong.title,
      artist: currentSong.artist,
    };

    try {
      // 1. 히스토리 저장
      const historyRes = await fetch("http://localhost:8000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyData),
      });

      const historyJson = await historyRes.json();
      const historyId = historyJson.data?._id;

      if (!historyRes.ok || !historyId) {
        console.error("히스토리 저장 응답:", historyJson);
        throw new Error("히스토리 저장 실패");
      }

      // 2. 북마크 저장
      const bookmarkData = {
        userId: "user1",
        historyId,
        folderId: 1,
      };

      const bookmarkRes = await fetch("http://localhost:8000/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookmarkData),
      });

      if (!bookmarkRes.ok) {
        const errorRes = await bookmarkRes.json();
        console.error("북마크 저장 실패 응답:", errorRes);
        throw new Error(errorRes.message || "북마크 저장 실패");
      }

      // 3. 상태 및 UI 갱신
      setIsBookmarked(true);
      setShowBookmark(true);
      setToast("북마크에 저장되었습니다!");
      setTimeout(() => setToast(null), 2000);

      // 4. 북마크 폴더로 이동
      navigate("/archive/bookmark/typed/1");
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
            navigate(isLoggedIn ? "/mypage" : "/login");
          }}
        />
      )}

      {showPlaylist && <MainPlaylistPopup onClose={() => setShowPlaylist(false)} data={dummyPlaylist} />}

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
                <M.TypingOverlay aria-hidden>
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
                      <span key={index} style={{ whiteSpace: "pre-wrap", color }}>
                        {typedChar ?? char}
                      </span>
                    );
                  })}
                </M.TypingOverlay>
              )}

              <M.HiddenInput
                // onKeyDown={onKeyDownAddTodo}
                value={inputValue}
                spellCheck={false}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log("입력된 값:", newValue);
                  if (currentData && newValue.length <= currentData.typing.length) {
                    setInputValue(newValue);
                  }
                }}
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
                  <M.AlbumImg src={currentSong.img} />
                  <M.AlbumInfo>
                    <h5 style={{ color: "#282828" }}>{currentSong.title}</h5>
                    <h6 style={{ color: "#787878" }}>{currentSong.artist}</h6>
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
                  <M.IconButton
                    onClick={handleBookmark} // 북마크 저장 실행
                  >
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
