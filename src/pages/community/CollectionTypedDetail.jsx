import S from './CollectionDetailStyle';
import { useLocation } from 'react-router-dom';

const CollectionTypedDetail = () => {

    const [open, setOpen] = useState(false); 
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editMode, setEditMode] = useState(false); // 편집 모드 on/off
    const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목 id 배열
    const [bookmarkData, setBookmarkData] = useState(dummyData);
    const { state: folder } = useLocation();

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
                <img 
                    src={
                    folder?.thumbnailUrl
                        ? `${process.env.REACT_APP_BACKEND_URL}${folder.thumbnailUrl}`
                        : "/assets/images/profiles/default-thumbnail.png"
                    }
                    alt={folder?.title || "썸네일"}
                    className="thumbnail"
                />
                <S.BookInfo>
                    <div id='title'>
                    <h4>{folder?.title || "폴더 이름 없음"}</h4>
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

export default CollectionTypedDetail;