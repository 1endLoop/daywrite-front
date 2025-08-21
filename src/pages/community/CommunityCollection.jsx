import React, { useRef, useState, useEffect } from 'react';
import S from './collectionStyle';
import { useNavigate } from 'react-router-dom';

const CommunityCollection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [playedFolders, setPlayedFolders] = useState([]);
  const [typedFolders, setTypedFolders] = useState([]);
  const navigate = useNavigate();

  // 정적 파일 origin (http://localhost:8000 등)
  const getAssetOrigin = () => {
    const raw = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };
  const buildImageSrc = (thumb = "") => {
    if (!thumb) return "";
    if (/^https?:\/\//i.test(thumb)) return thumb;
    const origin = getAssetOrigin();
    if (thumb.startsWith("/")) return `${origin}${thumb}`;
    if (thumb.startsWith("uploads/")) return `${origin}/${thumb}`;
    return `${origin}/uploads/${thumb}`;
  };

  // Top 5 Played
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders/top?limit=5`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json(); // [{id,title,type,thumbnailUrl,count,likeCount}]
        setPlayedFolders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Played Top 불러오기 실패:", err);
        setPlayedFolders([]);
      }
    })();
  }, []);

  // Top 5 Typed
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/bookmarkFolder/folders/top?limit=5`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json(); // [{id,title,type,thumbnailUrl,count,likeCount}]
        setTypedFolders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Typed Top 불러오기 실패:", err);
        setTypedFolders([]);
      }
    })();
  }, []);

  return (
    <div>
      {/* 인기 글 컬렉션 */}
      <S.TypedTitle>
        <h2>인기 글 컬렉션</h2>
        <p onClick={() => navigate(`/community/collection/collectionAllview`)}>전체보기 &gt;</p>
      </S.TypedTitle>

      <S.TypedWrapper>
        {typedFolders.map((folder, i) => (
          <S.TypedBox
            key={folder.id}
            onClick={() => navigate(`/archive/bookmark/typed/typedList/${folder.id}`, {
              state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl) }
            })}
          >
            <img
              src={buildImageSrc(folder.thumbnailUrl) || "/assets/images/book-img.jpeg"}
              alt={folder.title}
            />
            <S.LetterBox>
              <div>
                <h6>{folder.title}</h6>
                <p>{folder.count}개의 글</p>
              </div>
              <S.dd onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === i ? null : i); }}>
                <S.Wrapper ref={dropdownRef}>
                  {openDropdown === i && (
                    <S.Menu>
                      <S.Item onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.Item>
                      <S.Item onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.Item>
                      <S.Item onClick={() => alert("공유하겠습니다!")}>공유하기</S.Item>
                    </S.Menu>
                  )}
                </S.Wrapper>
                <S.LikeCount><p className='likeCount'>{folder.likeCount ?? 0} 좋아요</p></S.LikeCount>
              </S.dd>
            </S.LetterBox>
          </S.TypedBox>
        ))}
      </S.TypedWrapper>

      {/* 인기 음악 플레이리스트 */}
      <S.PlayedTitle>
        <h2>인기 음악 플레이리스트</h2>
        <p onClick={() => navigate(`/community/collection/collectionAllview`)}>전체보기 &gt;</p>
      </S.PlayedTitle>

      <S.TypedWrapper>
        {playedFolders.map((folder, i) => (
          <S.TypedBox
            key={folder.id}
            onClick={() => navigate(`/archive/bookmark/playedList/${folder.id}`, {
              state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl) }
            })}
          >
            <img
              src={buildImageSrc(folder.thumbnailUrl) || "/assets/images/album-image.png"}
              alt={folder.title}
            />
            <S.LetterBox>
              <div>
                <h6>{folder.title}</h6>
                <p>{folder.count}개의 곡</p>
              </div>
              <S.dd onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === i ? null : i); }}>
                <S.Wrapper ref={dropdownRef}>
                  {openDropdown === i && (
                    <S.Menu>
                      <S.Item onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.Item>
                      <S.Item onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.Item>
                      <S.Item onClick={() => alert("공유하겠습니다!")}>공유하기</S.Item>
                    </S.Menu>
                  )}
                </S.Wrapper>
                <S.LikeCount><p className='likeCount'>{folder.likeCount ?? 0} 좋아요</p></S.LikeCount>
              </S.dd>
            </S.LetterBox>
          </S.TypedBox>
        ))}
      </S.TypedWrapper>
    </div>
  );
};

export default CommunityCollection;
