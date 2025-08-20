import React, { useEffect, useRef, useState } from 'react';
import P from './main.playlist.popup.style';

const MainPlaylistPopup = ({ onClose, data }) => {
  const [playlist, setPlaylist] = useState(data ?? []);
  const popupRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // ✅ uid 통일
  const uid = localStorage.getItem('uid') || localStorage.getItem('userId');

  // ✅ data 프롭 바뀌면 state 동기화 (liked 기본값 false)
  useEffect(() => {
    setPlaylist((data ?? []).map(it => ({ liked: false, ...it })));
  }, [data]);

  const toggleLike = async (index) => {
    if (!playlist[index]) return;
    const prev = playlist;
    const target = playlist[index];
    const newLiked = !target.liked;

    // 낙관적 업데이트
    setPlaylist(prev =>
      prev.map((it, i) => (i === index ? { ...it, liked: newLiked } : it))
    );

    const { title, artist } = target;

    try {
      const urlBase = process.env.REACT_APP_BACKEND_URL;

      if (newLiked) {
        // ✅ 좋아요 저장 (userId 포함, 배열 형태)
        const res = await fetch(`${urlBase}/api/playList/liked`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: uid,
            songs: [{ title, artist }],
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        console.log('좋아요 저장됨:', title);
      } else {
        // ✅ 좋아요 취소 (userId 포함)
        const res = await fetch(`${urlBase}/api/playList/unlike`, {
          method: 'POST', // (백엔드가 POST로 받도록 구현되어 있음)
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, artist, userId: uid }),
        });
        if (!res.ok) throw new Error(await res.text());
        console.log('좋아요 취소됨:', title);
      }
    } catch (err) {
      console.error('좋아요 처리 오류:', err);
      // 실패 시 롤백
      setPlaylist(prev);
      alert('좋아요 처리에 실패했어요.');
    }
  };

  // ===== 드래그 이동 =====
  const handleMouseDown = (e) => {
    if (!popupRef.current) return;
    setDragging(true);
    setOffset({
      x: e.clientX - popupRef.current.getBoundingClientRect().left,
      y: e.clientY - popupRef.current.getBoundingClientRect().top,
    });
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <P.PopupContainer
      ref={popupRef}
      style={{ left: position.x, top: position.y, position: 'absolute' }}
    >
      <P.Header onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
        <P.Title>
          <span style={{ color: '#282828', fontSize: 20, fontWeight: 400 }}>추천 </span>
          <span style={{ color: '#282828', fontSize: 20, fontWeight: 600 }}>플레이리스트</span>
        </P.Title>
        <P.CloseBtn onClick={onClose}>
          <img src="/assets/images/icons/close.png" alt="닫기" style={{ width: 28, height: 28 }} />
        </P.CloseBtn>
      </P.Header>

      <P.Separator />

      <P.List>
        {/* ✅ 렌더는 data가 아닌 playlist 사용 */}
        {playlist.map((item, index) => (
          <P.Item key={`${item.title}-${item.artist}-${index}`}>
            <P.ArtistWrap>
              <img src={item.img} alt="앨범커버" />
              <P.TitleWrap>
                <P.SongTitle>{item.title}</P.SongTitle>
                <P.Artist>{item.artist}</P.Artist>
              </P.TitleWrap>
            </P.ArtistWrap>
            <P.HeartBtn onClick={() => toggleLike(index)}>
              <img
                src={
                  item.liked
                    ? '/assets/images/icons/like-on-color.png'
                    : '/assets/images/icons/like-off-color.png'
                }
                alt="좋아요"
              />
            </P.HeartBtn>
          </P.Item>
        ))}
      </P.List>
    </P.PopupContainer>
  );
};

export default MainPlaylistPopup;