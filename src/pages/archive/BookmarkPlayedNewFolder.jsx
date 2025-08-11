import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./bookmarkPlayStyle";
import BookmarkPlayCard from "./BookmarkPlayCard";

const BookmarkPlayedNewFolder = () => {

    const navigate = useNavigate();
    const [likedData, setLikedData] = useState([]);
    const [imageSrc, setImageSrc] = useState(null); // 썸네일
    const [thumbnail, setThumbnail] = useState(null); // 썸네일
    const [folderTitle, setFolderTitle] = useState(""); // 폴더 이름
    const [selectedItems, setSelectedItems] = useState([]);
    const loginUserId = localStorage.getItem("userId"); //


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

    useEffect(() => {
        const fetchLiked = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/liked`);
            const data = await res.json();
            setLikedData(data); // 배열로 저장
        } catch (err) {
            console.error("좋아요 데이터 불러오기 실패:", err);
        }
        };

        fetchLiked();
    }, []);

    // 파일 저장
    const handleSaveFolder = async () => {
    // const idsOnly = selectedItems.map(item => item._id || item.id);
    const idsOnly = selectedItems.map(item => {
    if (item && item._id) return item._id;
    if (item && item.id) return item.id;
    return null;
    }).filter(id => id); 
    const formData = new FormData();

    console.log("selectedItems 내용 확인:", selectedItems);

    // 🔽 [콘솔 로그] 여기 추가
    console.log("✅ 저장 시도 중");
    console.log("title:", folderTitle);
    console.log("userId:", loginUserId);
    console.log("selectedIds:", idsOnly);
    console.log("thumbnail:", thumbnail);

    formData.append("title", folderTitle); // ✅ 폴더 제목
    formData.append("thumbnail", thumbnail); // ✅ 썸네일 이미지
    formData.append("selectedIds", JSON.stringify(idsOnly));
    formData.append("userId", loginUserId);
    // formData.append("selectedIds", JSON.stringify(selectedItems));

    // ✅ validation: 제목이 비었는지 확인
    if (!folderTitle.trim()) {
        alert("폴더 제목을 입력해주세요.");
        return;
    }

    // ✅ validation: 선택된 카드가 없을 경우
    if (selectedItems.length === 0) {
        alert("저장할 플레이리스트를 하나 이상 선택해주세요.");
        return;
    }

    // ✅ validation: 썸네일 파일이 선택되지 않은 경우 (선택사항)
    if (!thumbnail) {
        alert("썸네일 이미지를 선택해주세요.");
        return;
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folder`, {
        method: "POST",
        body: formData,
        });

        if (res.ok) {
        alert("폴더 저장 완료!");
        } else {
        alert("저장 실패");
        }
    } catch (err) {
        console.error("저장 에러:", err);
    }
    };


    return (
        <div>
            {/* 상단 타이틀 영역 */}
            <S.TopRow>
                <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
                <S.PageTitle>Played New Folder</S.PageTitle>
                <S.NewFodler onClick={handleSaveFolder}>+ 폴더 생성</S.NewFodler>
                {/* <S.SearchBar placeholder="검색어를 입력하세요" /> */}
            </S.TopRow>
            <S.ContentWrapper>
                <S.ThumbnailBox>
                    <S.ImgWrapper>
                        <S.Label htmlFor='profile'>
                            {imageSrc ? (
                                <S.Profile src={imageSrc} />
                            ) : (
                                <S.Profile />
                            )}
                        </S.Label>
                        <input id='profile' type='file' placeholder='썸네일' onChange={handleImageChange}></input>
                        <S.FolderName placeholder="폴더 이름" value={folderTitle} onChange={(e) => setFolderTitle(e.target.value)}></S.FolderName>
                    </S.ImgWrapper>
                    <S.NewFolderTextCount>{likedData.length}개의 playList</S.NewFolderTextCount>
                </S.ThumbnailBox>
                {/* 플레이리스트 카드 */}
                <BookmarkPlayCard data={likedData} selectedItems={selectedItems} setSelectedItems={setSelectedItems} /> 
            </S.ContentWrapper>
        </div>
    );
};

export default BookmarkPlayedNewFolder;