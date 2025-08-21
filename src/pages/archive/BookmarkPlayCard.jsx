import S from "./bookmarkPlayStyle";

const BookmarkPlayCard = ({
  data = [],                         // ✅ 기본값
  selectedItems = [],                // ✅ 기본값
  setSelectedItems = () => {},       // ✅ 기본값
  selectable = true,                 // 선택 토글을 쓸지 여부
}) => {
  const list = Array.isArray(data) ? data : []; // ✅ 더 안전

  const toggleSelect = (id) => {
    if (!selectable) return; // 읽기 전용이면 무시
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <S.PlayBox>
        <S.PlayInfo>
          <p className='num'>No.</p>
          <p className='album'>앨범</p>
          <p className='singName'>곡명/앨범명</p>
          <p className='artistName'>아티스트 명</p>
          <p className='like'>좋아요 수</p>
          <p className='play'>재생</p>
        </S.PlayInfo>

        {list.length === 0 ? (
          <div style={{ padding: 16, color: "#888" }}>표시할 곡이 없어요.</div>
        ) : (
          list.map((item, index) => {
            const id = item._id || item.id || `${item.title}-${item.artist}-${index}`;
            const isSelected = Array.isArray(selectedItems) && selectedItems.includes(id);

            return (
              <S.PlayedCardBox
                key={id}
                className={isSelected ? "selected" : ""}
                onClick={() => toggleSelect(id)}
              >
                <div className="num"><p>{index + 1}</p></div>
                <div className="album">
                  <img
                    src={item.img || item.imageUrl || "/assets/images/defaultAlbumCover.jpg"}
                    alt={item.title || "album"}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="singName"><p>{item.title || item.songTitle || "-"}</p></div>
                <div className="artistName"><p>{item.artist || item.singer || "-"}</p></div>
                <div className='like'>
                  <img src="/assets/images/icons/like-on-color.png" alt="좋아요" />
                </div>
                <div className='play'>
                  <img src="/assets/images/icons/play.png" alt="재생" />
                </div>
              </S.PlayedCardBox>
            );
          })
        )}
      </S.PlayBox>
    </div>
  );
};

export default BookmarkPlayCard;
