import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import M from "./typing.page.style";
import MainPopup from "../main/MainPopup";
import MainPlaylistPopup from "../main/MainPlaylistPopup";
import CategoryPopup from "./CategoryPopup";
import MoodSelect from "./MoodSelect";
import { fetchRecommendedMusic } from "../../api/musicApi";

const TypingPage = () => {
  const [writingData, setWritingData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [fade, setFade] = useState(true);

  const navigate = useNavigate();
  const isLoggedIn = false;

  const location = useLocation();
  const { keywords = [], genres = [] } = location.state || {};
  const [selectedKeywords, setSelectedKeywords] = useState(keywords);
  const [selectedGenres, setSelectedGenres] = useState(genres);

  // 추천 음악 리스트

  const [musicList, setMusicList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); 
 
  // 글 데이터 가져오기 함수
const fetchWriting = async () => {
  try {
    console.log("요청 중:", selectedKeywords, selectedGenres);

    const res = await axios.post("/api/writing/random", {
      keywords: selectedKeywords,
      genres: selectedGenres,
    });

    console.log("응답데이터:", res.data);

    if (!res?.data) {
      alert("조건에 맞는 글이 없습니다.");
      return;
    }

    setWritingData(res.data);

    // 음악 API도 같은 함수 내에서 호출
    const music = await fetchRecommendedMusic(selectedKeywords, selectedGenres);
    // const parsed = music.map((track) => ({
    //   img: track.image?.[2]?.["#text"] || "/assets/images/album_cover/default.jpg", // 기본 이미지 fallback
    //   title: track.name,
    //   artist: track.artist,
    //   liked: false,
    // }));

    const DEFAULT_LASTFM_IMAGE ="https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";

    const parsed = music.map((track) => {
      const img = track.image?.[3]?.['#text']
      const isDefault = img === DEFAULT_LASTFM_IMAGE

      return {
        img: isDefault ? "C:\daywrite-front\public\assets\images\album_cover\smiley.ori.jpg" : img,
        title: track.name,
        artist: track.artist,
        liked: false,
      }
    })


    setMusicList(parsed);
    setCurrentSong(parsed[0]); // 첫 곡을 현재 곡으로 설정
    console.log("추천음악:", music)

  } catch (error) {
    console.error("글 불러오기 실패:", error);
  }
};


  useEffect(() => {
    fetchWriting();
  }, [selectedKeywords, selectedGenres]);

  if (!writingData) {
    console.log("아직 데이터 없음");
    return <p>로딩 중...</p>;
  }
  console.log("WritingData 있음!! : ", writingData);

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
    setPopupType(isLoggedIn ? "member" : "guest");
    setShowPopup(true);
  };

  return (
    <div>
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

      {showPlaylist && (
        <MainPlaylistPopup onClose={() => setShowPlaylist(false)} data={musicList} />
      )}

      <M.OuterWrap>
        <M.Container>
          <M.Content01>
            <M.TopHeader>
              <M.IconButton onClick={() => setShowBookmark(!showBookmark)}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    (showBookmark
                      ? "/assets/images/icons/bookmark-on-color.png"
                      : "/assets/images/icons/bookmark-off-color.png")
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
                  <img src="/assets/images/icons/settings.png" alt="설정" />
                </M.IcBtn>
                <M.IcBtn>
                  <img src="/assets/images/icons/link2.png" alt="링크 복사" />
                </M.IcBtn>
                <M.IcBtn onClick={() => setInputValue("")}>
                  <img src="/assets/images/icons/eraser.png" alt="필사글 전체 지우기" />
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
                        (showLike
                          ? "/assets/images/icons/like-on-color.png"
                          : "/assets/images/icons/like-off-color.png")
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
                      <img src="/assets/images/icons/skip_previous.png" alt="이전" />
                    </M.PlayIcon>
                    <M.PlayIcon onClick={handlePlayToggle}>
                      <img
                        src={isPlaying ? "/assets/images/icons/music-pause.png" : "/assets/images/icons/music-play.png"}
                        alt={isPlaying ? "일시정지" : "재생"}
                      />
                    </M.PlayIcon>
                    <M.PlayIcon>
                      <img src="/assets/images/icons/skip_next.png" alt="다음" />
                    </M.PlayIcon>
                  </M.PlayIconWrap>
                  <M.PlayListWrap onClick={() => setShowPlaylist(!showPlaylist)}>
                    <h4>PLAY LIST</h4>
                    <M.IcBtn>
                      <img src="/assets/images/icons/list.png" alt="플레이리스트" />
                    </M.IcBtn>
                  </M.PlayListWrap>
                </M.PlayListIconWrap>
              </M.StyledUnder01>

              <M.Line />
              <M.StyledUnder02>
                <M.CategoryInfoWrap>
                  <M.ReplayBtn onClick={fetchWriting}>
                    <img src="/assets/images/icons/replay.png" alt="새로고침" />
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

                <M.SaveBtn onClick={() => setShowMoodPopup(true)}>저장</M.SaveBtn>
                {showMoodPopup && (
                  <MoodSelect
                    onClose={() => setShowMoodPopup(false)}
                    onSave={async (mood) => {
                      setSelectedMood(mood);
                      setShowMoodPopup(false);

                      // 히스토리 데이터 구성
                      const historyData = {
                        content: inputValue,
                        book: writingData.book,
                        author: writingData.author,
                        publisher: writingData.publisher ?? "unknown",
                        publishedDate: writingData.publishedDate ?? "unknown",
                        bookCover: writingData.bookCover ?? "",
                        keyword: selectedKeywords,
                        genre: selectedGenres[0] ?? "",
                        music: currentSong.title,
                        artist: currentSong.artist,
                        mood: mood, // 선택된 기분
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
                          setInputValue(""); // 입력값 초기화
                        } else {
                          const err = await res.json();
                          alert("저장 실패: " + err.message);
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
