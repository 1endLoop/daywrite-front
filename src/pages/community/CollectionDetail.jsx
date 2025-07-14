import React, { useRef, useState } from 'react';
import S from './CollectionDetailStyle';

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

  ];

const CollectionDetail = () => {

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
          <img src="/assets/images/icons/left.png" alt="" />
          <h2>컬렉션명</h2>
          {/* <p>{bookmarkData.length}개의 글</p> */}
        </S.HeaderBox>
        <S.EditBox>
        <p className='detailEdit'
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
        </S.EditBox>
      </S.HeaderWrap>
      <S.BodyWrap>
        <S.BookBox>
          <img src="/assets/images/profiles/cat.JPG" alt="" />
          <S.BookInfo>
            <div id='title'>
              <h4>폴더 이름</h4>
              <p>닉네임</p>
            </div>
            <div id='imgEditBox'>
              <div id='imgEdit' onClick={() => setOpenDropdown((prev) => !prev)}>
                <img src="" alt="" />
              </div>
              <p
                onClick={() => {
                  setEditMode((prev) => !prev);
                  setSelectedItems([]); // 편집 모드 꺼질 때 초기화
                }}
              >
              {/* {editMode ? `${selectedItems.length}개 선택됨` : ""} */}
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
        <S.DetailSolid></S.DetailSolid>
        <S.TypeInfo>
          {/* <S.TypedCard>
            북마크 정보
          </S.TypedCard> */}
          {bookmarkData.map((item) => (
              <S.TypedCard
                onClick={() => {
                  if (editMode) {
                    setSelectedItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    );
                  } else {
                    setSelectedItem(item);
                    setOpen(true);
                  }
                }}
                key={item.id}
                style={{
                  border: editMode
                    ? selectedItems.includes(item.id)
                      ? '1px solid #F96F3D'
                      : '1px solid #e0e0e0'
                    : '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
              <S.TypedCardTitle>
                <h3>{item.title}</h3>
                <p><strong>Author:</strong> {item.author}</p>
              </S.TypedCardTitle>
              <S.TypedCardDetail>
                <p>{item.content}</p>
              </S.TypedCardDetail>
              <S.BlankSolid></S.BlankSolid>
              <S.CardAuthor>
                <img src="" alt="" />
                <p><strong>Music:</strong> {item.music} - {item.artist}</p>
              </S.CardAuthor>
            </S.TypedCard> 
          ))}
        </S.TypeInfo>
      </S.BodyWrap>

    <S.PopupContainer>
      {/* 팝업  setOpen(true)*/}
      {open && selectedItem && (
        <div className="popup"
          // onClick={(e) => {
          //   if (e.target.className === 'popup') {
          //     setOpen(false); // 배경 클릭 시 팝업 닫기
          //   }
          // }}
        >
          <div className="popup-box">
            <div className='popupHeader'>
              <span className='PopupBook'>책 정보</span>
              <span className="close-btn" onClick={() => setOpen(false)}>
                &times;
              </span>
            </div>
            <div className='popBody'>
              <div className='bookImg'>
                <img src="/assets/images/profiles/cat.JPG" alt="" />
              </div>
              {/* 팝업 내용 */}
              <div className='bookDetail'>
                <div className='detailTitle'>
                  <h3 className=''>{selectedItem.title}</h3>
                  <p className='subTitle'>부제목</p>
                </div>
                <div className='author'>
                  <div className='popupTitleBox'>
                  <strong>저자</strong>
                  <p>{selectedItem.author}</p>
                  </div>
                  <div className='popupTitleBox'>
                  <strong>출판사</strong>
                  <p>{selectedItem.author}</p>
                  </div>
                </div>
                <div className='bookDate'>
                  <div className='popupTitleBox'>
                  <strong>발행</strong>
                  <p>{selectedItem.date}</p>
                  </div>
                  <div className='popupTitleBox'>
                  <strong>편곡</strong>
                  <p>{selectedItem.author}</p>
                  </div>
                </div>
                <p className='con'>{selectedItem.content}</p>
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

export default CollectionDetail;