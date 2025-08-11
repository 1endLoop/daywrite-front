import React, { useEffect, useRef, useState } from 'react';
import S from './bookmark.style';
import { useNavigate } from 'react-router-dom';

const BookmarkPlyedList = () => {
  const [open, setOpen] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false); // 편집 모드 on/off
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목 id 배열
  // const [bookmarkData, setBookmarkData] = useState(dummyData);
  const [bookmarkData, setBookmarkData] = useState([]);
  const navigate = useNavigate()
  
  // ✅ 좋아요한 곡 목록 불러오기
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playlist/liked`);
        const data = await res.json();
        setBookmarkData(data);
      } catch (err) {
        console.error("좋아요 목록 불러오기 실패:", err);
      }
    };

    fetchLikedSongs();
  }, []);

  return (
    <div>
      <S.HeaderWrap>
        <S.HeaderBox>
          {/* <img src="" alt="" /> */}
          <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
          <h2>음악</h2>
          <p>{bookmarkData.length}개의 글</p>
        </S.HeaderBox>
        <S.Search>
          <input type="text" />
          <img src="/assets/images/icons/search.png" alt="" />
          <p></p>
        </S.Search>
      </S.HeaderWrap>
      <S.BodyWrap>
        <S.BookBox>
          <img src="" alt="" />
          <S.BookInfo>
            <div id='title'>
              <h4>제목</h4>
              <p
                onClick={() => {
                  if (editMode) {
                    // 편집 종료: 선택된 항목 삭제
                    setBookmarkData((prev) =>
                      prev.filter((item) => !selectedItems.includes(item.id))
                    );
                    setSelectedItems([]); // 선택 초기화
                  }
                  setEditMode((prev) => !prev);
                }}
              >
                {editMode ? "삭제" : "편집"}
              </p>

            </div>
            <div id='imgEditBox'>
              <div id='imgEdit' onClick={() => setOpenDropdown((prev) => !prev)}></div>
              <p
                onClick={() => {
                  setEditMode((prev) => !prev);
                  setSelectedItems([]); // 편집 모드 꺼질 때 초기화
                }}
              >
              {editMode ? `${selectedItems.length}개 선택됨` : ""}
              </p> 
            </div>           
          </S.BookInfo>
          {/* 북마크 리스트 이름변경, 폴더삭제 드롭다운 */}
          <S.DropdownWrapper ref={dropdownRef}>
            {openDropdown && (
              <S.TypedMenu>
                <S.TypedItem onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.TypedItem>
                <S.TypedItem onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.TypedItem>
              </S.TypedMenu>
            )}
          </S.DropdownWrapper>
        </S.BookBox>
        {/* plaed 정보 */}
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
              {bookmarkData.map((item, index) => (
              // <S.PlayedCardBox
              //   key={item.id}
              //   className={selectedItems.includes(item.id) ? 'selected' : ''}
              //   onClick={() => {
              //     if (editMode) {
              //       setSelectedItems(prev =>
              //         prev.includes(item.id)
              //           ? prev.filter(id => id !== item.id) // 선택 해제
              //           : [...prev, item.id] // 선택 추가
              //       );
              //     } else {
              //       setSelectedItem(item);
              //       setOpen(true); // 팝업 열기
              //     }
              //   }}
              // >
              //     <div className='num'><p>{index + 1}</p></div>
              //     <div className='album'><img src="" alt="" /></div>
              //     <div className='singName'><p>{item.music}</p></div>
              //     <div className='artistName'><p>{item.artist}</p></div>
              //     <div className='like'>
              //       <img src="" alt="" />
              //       <p></p>
              //     </div>
              //     <div className='play'>
              //       <img src="" alt="" />
              //       <img src="" alt="" />
              //       <img src="" alt="" />
              //     </div>
              //   </S.PlayedCardBox>
              <S.PlayedCardBox
                key={item._id}
                className={selectedItems.includes(item._id) ? 'selected' : ''}
                onClick={() => {
                  if (editMode) {
                    setSelectedItems(prev =>
                      prev.includes(item._id)
                        ? prev.filter(id => id !== item._id)
                        : [...prev, item._id]
                    );
                  } else {
                    setSelectedItem(item);
                    setOpen(true);
                  }
                }}
              >
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
                <div className="singName"><p>{item.title}</p></div>
                {/* 4. 아티스트 */}
                <div className="artistName"><p>{item.artist}</p></div>
                {/* 좋아요 */}
                <div className='like'><img src="/assets/images/icons/like-on-color.png" alt="" /></div>
                {/* 재생 */}
                <div className='play'>
                  <img src="" alt="" />
                  <img src="" alt="" />
                  <img src="" alt="" />
                </div>
              </S.PlayedCardBox>

              ))}
        </S.PlayBox>
      </S.BodyWrap>

    <S.PopupContainer>
      {/* 팝업 setOpen(true)*/}
      {open && selectedItem && (
        <div className="popup">
          <div className="popup-box">
            <div className='popupHeader'>
              <span className='PopupBook'>책 정보</span>
              <span className="close-btn" onClick={() => setOpen(false)}>
                &times;
              </span>
            </div>
            <div className='popBody'>
              <div className='bookImg'>
                <img src="" alt="" />
              </div>
              <div className='bookDetail'>
                <h3 className='detailTitle'>{selectedItem.title}</h3>
                <p>{selectedItem.content}</p>
                <p><strong>Author:</strong> {selectedItem.author}</p>
                <p><strong>Music:</strong> {selectedItem.music} - {selectedItem.artist}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </S.PopupContainer>

    </div>
  );
};

export default BookmarkPlyedList;