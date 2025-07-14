import React, { useRef, useState } from 'react';
import S from './bookmark.style';

  const dummyData = [
    {
      id: 1,
      date: "2025. 05. 27",
      content:
        "진정한 사랑이란, 반드시 두 사람의 자유가 서로 상대방을 인정하는 기초 위에 세워져야 한다. 이때 두 사람은 서로를 자기 자신처럼 또는 타자처럼 느끼면서, 어느 한편에서도 자기 초월을 포기하지 않고 또 자기를 불구로 만드는 일 없이 함께 세계 속에서 가치와 목적을 발견할 것이다. 또한 자기를 줌으로써 자기 자신을 찾고 세계를 풍요롭게 할 것이다.",
      title: "제2의 성",
      author: "시몬느 드 보부아르",
      music: "Love on Top",
      artist: "John Canada",
    },
    {
      id: 2,
      date: "2025. 05. 26",
      content: "살아남은 자들이 부끄러워하던 시대는 가고, 곧 1등이든 2등이든 무조건 살아남는 것이 최선이라는 시대가 왔다. 지금은 너를 떨어뜨리지 않으면 내가 죽는다는, 오직 단 한명만이 살아남는다는 ‘오징어 게임’, 서바이벌 게임의 세계관이 스크린을 지배하는 세상이 되었다. 그러나 나는 은밀히 믿고 있다. 액정화면 밖 진짜 세상은 다르다고, 거기에는 조용히, 그러나 치열하게, 자기만의 방식으로 살아남아 어떻게든 삶의 의미를 찾기 위해 싸우는 이들이 있다는 것을.",
      title: "단 한 번의 삶",
      author: "김영하",
      music: "Rainy Days",
      artist: "Lee Moon",
    },
        {
      id: 3,
      date: "2025. 05. 27",
      content:
        "진정한 사랑이란, 반드시 두 사람의 자유가 서로 상대방을 인정하는 기초 위에 세워져야 한다. 이때 두 사람은 서로를 자기 자신처럼 또는 타자처럼 느끼면서, 어느 한편에서도 자기 초월을 포기하지 않고 또 자기를 불구로 만드는 일 없이 함께 세계 속에서 가치와 목적을 발견할 것이다. 또한 자기를 줌으로써 자기 자신을 찾고 세계를 풍요롭게 할 것이다.",
      title: "제2의 성",
      author: "시몬느 드 보부아르",
      music: "Love on Top",
      artist: "John Canada",
    },

  ]

const BookmarkPlyedList = () => {
  const [open, setOpen] = useState(false); 
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false); // 편집 모드 on/off
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목 id 배열
  const [bookmarkData, setBookmarkData] = useState(dummyData);

  return (
    <div>
      <S.HeaderWrap>
        <S.HeaderBox>
          <img src="" alt="" />
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
              <S.PlayedCardBox
                key={item.id}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                onClick={() => {
                  if (editMode) {
                    setSelectedItems(prev =>
                      prev.includes(item.id)
                        ? prev.filter(id => id !== item.id) // 선택 해제
                        : [...prev, item.id] // 선택 추가
                    );
                  } else {
                    setSelectedItem(item);
                    setOpen(true); // 팝업 열기
                  }
                }}
              >
                  <div className='num'><p>{index + 1}</p></div>
                  <div className='album'><img src="" alt="" /></div>
                  <div className='singName'><p>{item.music}</p></div>
                  <div className='artistName'><p>{item.artist}</p></div>
                  <div className='like'>
                    <img src="" alt="" />
                    <p></p>
                  </div>
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