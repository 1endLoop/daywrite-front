import S from "./bookmarkPlayStyle";

const BookmarkPlayCard = ({ data, selectedItems, setSelectedItems}) => {

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id) // 이미 선택돼 있으면 제거
        : [...prev, id] // 아니면 추가
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

        {data.map((item, index) => (
          <S.PlayedCardBox
            key={item._id}
            className={selectedItems.includes(item._id) ? 'selected' : ''}
            onClick={() => toggleSelect(item._id)}
          >
            <div className="num"><p>{index + 1}</p></div>
            <div className="album">
              <img
                src={item.imageUrl || "/assets/images/default-album.png"}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="singName"><p>{item.title}</p></div>
            <div className="artistName"><p>{item.artist}</p></div>
            <div className='like'>
              <img src="/assets/images/icons/like-on-color.png" alt="좋아요" />
            </div>
            <div className='play'>
              <img src="/assets/images/icons/play.png" alt="재생" />
            </div>
          </S.PlayedCardBox>
        ))}
      </S.PlayBox>
    </div>
  );
};

export default BookmarkPlayCard;