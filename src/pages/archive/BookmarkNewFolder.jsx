import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import HistoryCard from './HistoryCard';
import useClickOutside from "../../modules/hooks/useClickOutside";
import S from "./bookmark.typed.style";


const BookmarkNewFolder = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [items, setItems] = useState([]);  
  const [folderTitle, setFolderTitle] = useState("");
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const dropdownInfo = dropdownOpen && {
    x: dropdownOpen.x,
    y: dropdownOpen.y,
  };

  const handleMoreClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownOpen({
      x: rect.left,
      y: rect.bottom,
    });
  };

      // 데이터 조회
    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch("http://localhost:8000/api/bookmarkFolder/newFolder");
            const result = await res.json();
            setItems(result.bookmarkFolder); // 응답 데이터의 배열
        } catch (err) {
            console.error("데이터 조회 실패:", err);
        }
        }

        fetchData();
    }, []);

    const [selectedCards, setSelectedCards] = useState([]);
    // 클릭한 카드 데이터 저장
    const handleCardClick = (item) => {
        const alreadySelected = selectedCards.some(card => card._id === item._id);
        if (alreadySelected) {
            setSelectedCards(selectedCards.filter(card => card._id !== item._id)); // 해제
        } else {
            setSelectedCards([...selectedCards, item]); // 추가
        }
    };

    // 썸네일
    const [imageSrc, setImageSrc] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    // 파일 선택했을 때 실행하는 함수
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader()

            reader.onloadend = () => {
                setImageSrc(reader.result)
            }

            reader.readAsDataURL(file)
            setThumbnail(file);
        }
    }

    // ==============================
    const handleCreateFolder = async () => {
    if (!thumbnail) {
        alert("썸네일 이미지를 먼저 업로드하세요.");
        return;
    }
    if (selectedCards.length === 0) {
        alert("카드를 하나 이상 선택해주세요.");
        return;
    }
    if (!folderTitle.trim()) {
    alert("폴더 이름을 입력해주세요.");
    return;
    }

    try {
        // 썸네일 먼저 업로드
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        const thumbRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/images/thumbnail`, {
        method: "POST",
        body: formData,
        });

        const data = await thumbRes.json(); // ✅ 한 번만 호출
        const { url: thumbnailUrl, filename, imageId } = data;

        // 폴더 생성 요청
        const folderRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookmarkFolder/folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: folderTitle, // 따로 인풋 받을 수도 있음
            type: "글", // 혹은 "곡"
            historyIds: selectedCards.map(card => card._id),
            thumbnailUrl,
            imageUpload: imageId,
        }),
        });

        const result = await folderRes.json();
        if (folderRes.ok) {
        alert("폴더 생성 완료!");
        navigate("/archive/bookmark"); // 리스트로 이동
        } else {
        alert("폴더 생성 실패");
        }

    } catch (err) {
        console.error("폴더 생성 중 오류:", err);
    }
    };


    return (
        <div>
            {/* 상단 타이틀 영역 */}
            <S.TopRow>
                <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
                <S.PageTitle>New Folder</S.PageTitle>
                <S.NewFodler onClick={handleCreateFolder}>+ 폴더 생성</S.NewFodler>
                <S.SearchBar placeholder="검색어를 입력하세요" />
            </S.TopRow>

            <S.ContentWrapper>
                {/* 왼쪽: 썸네일 & 폴더 정보 */}
                <S.ThumbnailBox>
                {/* <S.Thumbnail src="/assets/images/book-img.jpeg" /> */}
                <S.ImgWrapper>
                    <S.Label htmlFor='profile'>
                        {imageSrc ? (
                            <S.Profile src={imageSrc} />
                        ) : (
                            <S.Profile />
                        )}
                    </S.Label>
                    <input 
                        id='profile' type='file' placeholder='썸네일'
                        onChange={handleImageChange}
                    />
                    <S.FolderName placeholder="폴더 이름" value={folderTitle} onChange={(e) => setFolderTitle(e.target.value)} ></S.FolderName>
                </S.ImgWrapper>
                <S.NewFolderTextCount>{items.length}개의 글</S.NewFolderTextCount>
                </S.ThumbnailBox>

                {/* 북마크 카드 리스트 */}
                <S.CardColumn>
                {items.map((item, idx) => (
                    <HistoryCard
                    key={item._id || idx}
                    data={item}
                    onClick={() => handleCardClick(item)} 
                    selected={selectedCards.some(card => card._id === item._id)} // 주황색 테두리 적용 조건
                    // onToggleBookmark={(data) => console.log("북마크 클릭:", data)}
                    // onToggleLike={(data) => console.log("좋아요 클릭:", data)}
                    // isEditMode={false} // 예: 편집모드 아닐 때 false
                    // selected={false}
                    />
                ))}
                </S.CardColumn>
                {/* 팝업 */}
                {/* {selectedCard && <BookmarkDetail data={selectedCard} onClose={handleClose} />} */}
            </S.ContentWrapper>

        </div>
    );
};

export default BookmarkNewFolder;