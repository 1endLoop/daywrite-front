import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
// import S from './bookmarkFolderStyle';
import BookmarkCard from './BookmarkCard';
import HistoryCard from './HistoryCard';
import useClickOutside from "../../modules/hooks/useClickOutside";
import S from "./bookmark.typed.style";
import BookmarkDetail from "./BookmarkDetail";

const BookmarkNewFolder = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (item) => {
        setSelectedCard(item); // 클릭한 카드 데이터 저장
    };

  const handleClose = () => {
    setSelectedCard(null); // 닫기
  };



    const items = [
        {
        date: "2025.06.28",
        title: "끝내주는 인생",
        content:
            "영원히 멋진 타인 같은 건 없을 테지만 어느 시절 우리가 좋은 이야기 속에 있었다는 사실만은 잘 변하지 않는다. 최고의 순간을 같이 겪어준 누군가에게 권위를 부여하는 것이 나는 좋다. 그와 주고받은 시선과 언어가 자의식 천국의 건축 자재다. 천국은 지옥보다 터가 넓다. 거기선 평소처럼 굴어도 좋고 평소와 다르게 굴어도 좋고 끼 부려도 좋고 실수해도 좋고 세상에 없는 노래를 즉석에서 지어 불러도 좋다. ",
        author: "이슬아",
        publisher: "디플롯",
        publishedDate: "2023.07.03",
        music: "Love on Top",
        artist: "John Canada",
        coverUrl: "/assets/images/book-img.jpeg",
        },
        {
        date: "2025.06.28",
        title: "끝내주는 인생",
        content:
            "영원히 멋진 타인 같은 건 없을 테지만 어느 시절 우리가 좋은 이야기 속에 있었다는 사실만은 잘 변하지 않는다. 최고의 순간을 같이 겪어준 누군가에게 권위를 부여하는 것이 나는 좋다. 그와 주고받은 시선과 언어가 자의식 천국의 건축 자재다. 천국은 지옥보다 터가 넓다. 거기선 평소처럼 굴어도 좋고 평소와 다르게 굴어도 좋고 끼 부려도 좋고 실수해도 좋고 세상에 없는 노래를 즉석에서 지어 불러도 좋다. ",
        author: "이슬아",
        publisher: "디플롯",
        publishedDate: "2023.07.03",
        music: "Love on Top",
        artist: "John Canada",
        coverUrl: "/assets/images/book-img.jpeg",
        },
        {
        date: "2025.06.28",
        title: "끝내주는 인생",
        content:
            "영원히 멋진 타인 같은 건 없을 테지만 어느 시절 우리가 좋은 이야기 속에 있었다는 사실만은 잘 변하지 않는다. 최고의 순간을 같이 겪어준 누군가에게 권위를 부여하는 것이 나는 좋다. 그와 주고받은 시선과 언어가 자의식 천국의 건축 자재다. 천국은 지옥보다 터가 넓다. 거기선 평소처럼 굴어도 좋고 평소와 다르게 굴어도 좋고 끼 부려도 좋고 실수해도 좋고 세상에 없는 노래를 즉석에서 지어 불러도 좋다. ",
        author: "이슬아",
        publisher: "디플롯",
        publishedDate: "2023.07.03",
        music: "Love on Top",
        artist: "John Canada",
        coverUrl: "/assets/images/book-img.jpeg",
        },
    ];

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

    // 파일 업로드 함수
    const handleThumbnailUpload = async () => {
        if(!thumbnail){
            alert("파일을 선택해주세요.")
            return;
        }

        const formData = new FormData();
        formData.append("thumbnail", thumbnail)

        try {
            // const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/images/thumbnail', {
            //     method : 'POST',
            //     headers : {
            //         "Authorization" : `Bearer ${localStorage.getItem("jwtToken")}`
            //         // "Content-Type": "multipart/form-data",
            //     },
            //     body : formData
            // })
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/images/thumbnail`, {
                method: 'POST',
                body: formData, // headers는 안 붙여도 됨
            });


            if(!response.ok){ alert("이미지 업로드 실패!"); return;}

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log("handleThumbnailUpload error")
            console.error(error)            
        }

    }

    return (
        <div>
            {/* 상단 타이틀 영역 */}
            <S.TopRow>
                <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
                <S.PageTitle>New Folder</S.PageTitle>
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
                    <S.ImgUpload onClick={handleThumbnailUpload}>이미지 업로드</S.ImgUpload>
                </S.ImgWrapper>
                <S.NewFolderTextCount>{items.length}개의 글</S.NewFolderTextCount>
                </S.ThumbnailBox>

                {/* 북마크 카드 리스트 */}
                <S.CardColumn>
                {items.map((item, idx) => (
                    <HistoryCard key={idx} data={item} onClick={() => handleCardClick(item)} />
                ))}
                </S.CardColumn>
                {/* 팝업 */}
                {/* {selectedCard && <BookmarkDetail data={selectedCard} onClose={handleClose} />} */}
            </S.ContentWrapper>

        </div>
    );
};

export default BookmarkNewFolder;