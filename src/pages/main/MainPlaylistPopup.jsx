import React, { useEffect, useRef, useState } from 'react';
import P from './main.playlist.popup.style';

const MainPlaylistPopup = ({ onClose, data }) => {
    // 좋아요 상태
  const [playlist, setPlaylist] = useState(data);
  const toggleLike = (index) => {
    const updated = [...playlist];
    updated[index].liked = !updated[index].liked;
    setPlaylist(updated);
  };

  // 드래그 관련 상태
  const popupRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <P.PopupContainer
      ref={popupRef}
      style={{ left: position.x, top: position.y, position: 'absolute' }}
    >
      <P.Header onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
        <P.Title>
          <span data-layer="추천" style={{color: '#282828', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '500', wordWrap: 'break-word'}}>추천 </span>
          <span data-layer="플레이리스트" style={{color: '#282828', fontSize: 20, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word'}}>플레이리스트</span>
        </P.Title>
        <P.CloseBtn onClick={onClose}>
          <img src="/assets/images/icons/close.png" alt="닫기" style={{width: 28, height: 28}} />
        </P.CloseBtn>
      </P.Header>

      <P.Separator />

      <P.List>
        {data.map((item, index) => (
          <P.Item key={index}>
            <P.ArtistWrap>
              <img src={item.img} style={{width: 39, height: 39, marginRight: 12}} alt="앨범커버" />
              <P.TitleWrap>
                <P.SongTitle>{item.title}</P.SongTitle>
                <P.Artist>{item.artist}</P.Artist>
              </P.TitleWrap>
            </P.ArtistWrap>
            <P.HeartBtn onClick={() => toggleLike(index)}>
              <img
                src={
                  item.liked
                    ? "/assets/images/icons/like-on-color.png"
                    : "/assets/images/icons/like-off-color.png"
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