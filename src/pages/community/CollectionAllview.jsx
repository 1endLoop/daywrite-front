import { useEffect, useState } from "react";
import S from './collectionAllviewStyle';
import { useNavigate } from "react-router-dom";

const CollectionAllview = () => {
  const [folders, setFolders] = useState([]);
  const [likedFolders, setLikedFolders] = useState({}); // 좋아요
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders`);
        const data = await res.json();
        console.log("폴더 데이터:", data);
        const playedFolders = data.filter(folder => folder.type === "곡"); // played만
        setFolders(playedFolders);
      } catch (err) {
        console.error("플레이드 폴더 가져오기 실패:", err);
      }
    };

    fetchFolders();
  }, []);

  const toggleLike = (folderId) => {
    setLikedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div>
      <S.AllViewTitle>
        <h2>Played</h2>
      </S.AllViewTitle>
      <S.AllViewWrapper>
        {folders.map((folder) => ( 
          <S.AllViewBox key={folder.id} onClick={() => navigate(`/community/collection/detail/${folder.id}`, {state: folder})}>
            <img src={folder.thumbnailUrl} alt={folder.title} className="folderImg" />
            <div className="ViewBoxTitle">
              <strong>{folder.title}</strong>
              <p>{folder.count}개의 곡</p>
              {/* 하트 이미지가 있다면 추가 */}
              <img
              //  src="../assets/icons/like-on-color.png" alt="좋아요" className="heart" 
                src={
                  likedFolders[folder.id]
                    ? "../assets/images/icons/svg/like=on.svg"
                    : "../assets/images/icons/svg/like-off.svg"
                }
                alt="좋아요"
                className="heart"
                onClick={() => toggleLike(folder.id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </S.AllViewBox>
        ))}
      </S.AllViewWrapper>
    </div>
  );
};

export default CollectionAllview;