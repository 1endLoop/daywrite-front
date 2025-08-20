import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./bookmarkPlayStyle";
import BookmarkPlayCard from "./BookmarkPlayCard";

const BookmarkPlayedNewFolder = () => {
  const navigate = useNavigate();
  const [likedData, setLikedData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);     // 미리보기
  const [thumbnail, setThumbnail] = useState(null);   // 파일
  const [folderTitle, setFolderTitle] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // uid 통일 (없으면 userId 폴백)
  const uid = localStorage.getItem("uid") || localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");

  // 파일 선택
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
    setThumbnail(file);
  };

  // 내 좋아요 리스트만 가져오기
  useEffect(() => {
    (async () => {
      try {
        if (!uid) {
          console.warn("uid 없음 (로그인 필요)");
          setLikedData([]);
          return;
        }
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/playList/liked?userId=${encodeURIComponent(uid)}`,
          { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
        );
        if (!res.ok) {
          console.error("좋아요 목록 실패:", await res.text());
          setLikedData([]);
          return;
        }
        const data = await res.json();
        setLikedData(data);
      } catch (err) {
        console.error("좋아요 불러오기 에러:", err);
        setLikedData([]);
      }
    })();
  }, [uid, token]);

  // 폴더 저장
  const handleSaveFolder = async () => {
    if (!folderTitle.trim()) return alert("폴더 제목을 입력해주세요.");
    if (selectedItems.length === 0) return alert("저장할 플레이리스트를 하나 이상 선택해주세요.");
    if (!thumbnail) return alert("썸네일 이미지를 선택해주세요.");
    if (!uid) return alert("로그인 정보가 없습니다.");

    // 선택한 playlist _id만 추출
    // const playlistIds = selectedItems
    //   .map(item => item?._id || item?.id || null)
    //   .filter(Boolean);
    // 선택한 playlist _id만 추출 (문자열/객체 모두 대응)
    const playlistIds = selectedItems
    .map(it => (typeof it === 'string' ? it : (it?._id || it?.id)))
    .filter(Boolean);

    console.log('playlistIds ->', playlistIds); // 디버깅용


    try {
      // 1) 썸네일 업로드
      const fd = new FormData();
      fd.append("thumbnail", thumbnail);
      const thumbRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/images/thumbnail`, {
        method: "POST",
        body: fd,
      });
      if (!thumbRes.ok) {
        console.error("썸네일 업로드 실패:", await thumbRes.text());
        return alert("썸네일 업로드 실패");
      }
      const { url: thumbnailUrl, imageId } = await thumbRes.json();

      // 2) 폴더 생성 (JSON)
      const payload = {
        title: folderTitle,
        type: "곡",
        playlistIds,
        thumbnailUrl,
        imageUpload: imageId,
        ownerId: uid, // 서버에서 ownerId || userId 둘 다 받도록 해둠
      };

      const folderRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });

      const result = await folderRes.json();
      if (!folderRes.ok) {
        console.error("폴더 생성 실패:", result);
        return alert(result?.message || "폴더 생성 실패");
      }

      alert("폴더 생성 완료!");
      // 플레이드 목록으로 이동 (라우팅에 맞게 경로 조정)
      navigate("/archive/bookmark/played");
    } catch (err) {
      console.error("폴더 생성 에러:", err);
      alert("알 수 없는 오류로 생성에 실패했어요.");
    }
  };

  return (
    <div>
      <S.TopRow>
        <S.BackBtn onClick={() => navigate(-1)}>◀</S.BackBtn>
        <S.PageTitle>Played New Folder</S.PageTitle>
        <S.NewFodler onClick={handleSaveFolder}>+ 폴더 생성</S.NewFodler>
      </S.TopRow>

      <S.ContentWrapper>
        <S.ThumbnailBox>
          <S.ImgWrapper>
            <S.Label htmlFor="profile">
              {imageSrc ? <S.Profile src={imageSrc} /> : <S.Profile />}
            </S.Label>
            <input id="profile" type="file" placeholder="썸네일" onChange={handleImageChange} />
            <S.FolderName
              placeholder="폴더 이름"
              value={folderTitle}
              onChange={(e) => setFolderTitle(e.target.value)}
            />
          </S.ImgWrapper>
          <S.NewFolderTextCount>{likedData.length}개의 playList</S.NewFolderTextCount>
        </S.ThumbnailBox>

        {/* 카드 목록 + 선택 상태는 그대로 사용 */}
        <BookmarkPlayCard
          data={likedData}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </S.ContentWrapper>
    </div>
  );
};

export default BookmarkPlayedNewFolder;