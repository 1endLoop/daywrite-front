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
  const [pending, setPending] = useState(false); // 토글 시 스냅샷 롤백 + 중복 클릭 방지

  // 1) 팝업이 열릴 때 서버에서 liked 상태를 받아서 세팅
useEffect(() => {
  let ignore = false;
  const items = (data ?? []);

  const init = async () => {
    try {
      const urlBase = process.env.REACT_APP_BACKEND_URL;
      const res = await fetch(`${urlBase}/api/playList/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: uid,
          songs: items.map(({ title, artist }) => ({ title, artist }))
        })
      });
      const { statuses } = await res.json();
      const likedSet = new Set(
        (statuses || []).filter(s => s.liked).map(s => `${s.title}|${s.artist}`)
      );
      if (!ignore) {
        setPlaylist(items.map(it => ({
          ...it,
          liked: likedSet.has(`${it.title}|${it.artist}`)
        })));
      }
    } catch (e) {
      console.error(e);
      if (!ignore) setPlaylist(items.map(it => ({ ...it, liked: false })));
    }
  };

  init();
  return () => { ignore = true; };
}, [data, uid]);

  // ✅ data 프롭 바뀌면 state 동기화 (liked 기본값 false)
  useEffect(() => {
    setPlaylist((data ?? []).map(it => ({ liked: false, ...it })));
  }, [data]);

const toggleLike = async (index) => {
  if (!playlist[index] || pending) return;
  setPending(true);

  const snapshot = playlist.map(x => ({ ...x })); // 깊은 스냅샷
  const target = snapshot[index];
  const newLiked = !target.liked;
  const { title, artist, img } = target;

  // 낙관적 업데이트
  setPlaylist(p => p.map((it, i) => i === index ? { ...it, liked: newLiked } : it));

  try {
    const urlBase = process.env.REACT_APP_BACKEND_URL;
    if (newLiked) {
      const res = await fetch(`${urlBase}/api/playList/liked`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, songs: [{ title, artist, img }] })
      });
      if (!res.ok) throw new Error(await res.text());
    } else {
      const res = await fetch(`${urlBase}/api/playList/unlike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist, userId: uid })
      });
      if (!res.ok) throw new Error(await res.text());
    }
  } catch (err) {
    console.error('좋아요 처리 오류:', err);
    setPlaylist(snapshot); // 정확히 롤백
    alert('좋아요 처리에 실패했어요.');
  } finally {
    setPending(false);
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