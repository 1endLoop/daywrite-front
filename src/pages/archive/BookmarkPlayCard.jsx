import S from "./bookmarkPlayStyle";

const BookmarkPlayCard = () => {
    return (
        <div>
            <S.PlayBox>
                {/* No.	앨범	곡명/앨범명		아티스트 명		좋아요 수		재생 */}
                <S.PlayInfo>
                <p className='num'>No.</p>
                <p className='album'>앨범</p>
                <p className='singName'>곡명/앨범명</p>
                <p className='artistName'>아티스트 명</p>
                <p className='like'>좋아요 수</p>
                <p className='play'>재생</p>
                </S.PlayInfo>
                <S.PlayedCardBox>
                    {/* 1. 번호 */}
                    <div className="num"><p>{index + 1}</p></div>
                    {/* 2. 앨범 이미지 */}
                    <div className="album">
                    <img
                        src={item.imageUrl || "/assets/images/default-album.png"}
                        // alt="앨범"
                        style={{ width: "100%", height: "100%" }}
                    />
                    </div>
                    {/* 3. 곡명 */}
                    <div className="singName"><p></p></div>
                    {/* 4. 아티스트 */}
                    <div className="artistName"><p></p></div>
                    {/* 좋아요 */}
                    <div className='like'><img src="/assets/images/icons/like-on-color.png" alt="" /></div>
                    {/* 재생 */}
                    <div className='play'>
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </S.PlayedCardBox>
            </S.PlayBox>
        </div>
    );
};

export default BookmarkPlayCard;