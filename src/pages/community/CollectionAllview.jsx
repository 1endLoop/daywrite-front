import { useEffect, useState } from "react";
import S from './collectionAllviewStyle';

const CollectionAllview = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders`);
        const data = await res.json();
        const playedFolders = data.filter(folder => folder.type === "곡"); // played만
        setFolders(playedFolders);
      } catch (err) {
        console.error("플레이드 폴더 가져오기 실패:", err);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div>
      <S.AllViewTitle>
        <h2>Played</h2>
      </S.AllViewTitle>
      <S.AllViewWrapper>
        {folders.map((folder) => (
          <S.AllViewBox key={folder.id}>
            <img src={folder.thumbnailUrl} alt={folder.title} className="folderImg" />
            <div className="ViewBoxTitle">
              <strong>{folder.title}</strong>
              <p>{folder.count}개의 곡</p>
              {/* 하트 이미지가 있다면 추가 */}
              <img src="../assets/icons/like-on-color.png" alt="좋아요" className="heart" />
            </div>
          </S.AllViewBox>
        ))}
      </S.AllViewWrapper>
    </div>
  );
};

export default CollectionAllview;