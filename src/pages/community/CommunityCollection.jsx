import React, { useRef, useState, useEffect } from 'react';
import S from './collectionStyle';
import { useNavigate } from 'react-router-dom';

const CommunityCollection = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [playedFolders, setPlayedFolders] = useState([]);
  const [typedFolders, setTypedFolders] = useState([]);
  const navigate = useNavigate();

  // 백엔드에서 저장된 played 폴더 가져오기
  useEffect(() => {
    const fetchPlayedFolders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders`);
        const data = await res.json();
        const onlyPlayed = data.filter(item => item.type === "곡");
        setPlayedFolders(onlyPlayed);
      } catch (err) {
        console.error("Played 폴더 불러오기 실패:", err);
      }
    };

    fetchPlayedFolders();
  }, []);

  // typed folder 가져오기
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/folders`);
        const data = await res.json();

        const onlyTyped = data.filter(item => item.type === "글");
        const onlyPlayed = data.filter(item => item.type === "곡");

        setTypedFolders(onlyTyped);
      } catch (err) {
        console.error("폴더 불러오기 실패:", err);
      }
    };

    fetchFolders();
  }, []);


  return (
    <div>
      <S.TypedTitle>
        <h2>인기 글 컬렉션</h2>
        <p>전체보기 &gt;</p>
      </S.TypedTitle>
        <S.TypedWrapper>
          {typedFolders.map((folders, i) => (
            <S.TypedBox key={folders.id}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${folders.thumbnailUrl}`}
                alt={folders.title}
              />
              <S.LetterBox>
                <div>
                  <h6>{folders.title}</h6>
                  <p>{folders.count}개의 글</p>
                </div>
                <S.dd onClick={() => setOpenDropdown(openDropdown === i ? null : i)}>
                  <S.Wrapper ref={dropdownRef}>
                    {openDropdown === i && (
                      <S.Menu>
                        <S.Item onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.Item>
                        <S.Item onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.Item>
                        <S.Item onClick={() => alert("공유하겠습니다!")}>공유하기</S.Item>
                      </S.Menu>
                    )}
                  </S.Wrapper>
                </S.dd>
              </S.LetterBox>
            </S.TypedBox>
          ))}
          {/* 다른 TypedBox 요소들도 여기에 추가 */}
        </S.TypedWrapper>

      {/* Played */}
      <S.PlayedTitle>
        <h2>인기 음악 플레이리스트</h2>
        <p onClick={() => navigate(`/community/collection/collectionAllview`)}>전체보기 &gt;</p>
      </S.PlayedTitle>
        <S.TypedWrapper>
          {playedFolders.map((folder, i) => (
            <S.TypedBox key={folder.id}>
              <img src={folder.thumbnailUrl} alt={folder.title} />
              <S.LetterBox>
                <div>
                  <h6>{folder.title}</h6>
                  <p>{folder.count}개의 곡</p>
                </div>
                <S.dd onClick={() => setOpenDropdown(openDropdown === i ? null : i)}>
                  <S.Wrapper ref={dropdownRef}>
                    {openDropdown === i && (
                      <S.Menu>
                        <S.Item onClick={() => alert("이름을 변경하겠습니다!")}>이름변경</S.Item>
                        <S.Item onClick={() => alert("폴더를 삭제하겠습니다!")}>폴더삭제</S.Item>
                        <S.Item onClick={() => alert("공유하겠습니다!")}>공유하기</S.Item>
                      </S.Menu>
                    )}
                  </S.Wrapper>
                </S.dd>
              </S.LetterBox>
            </S.TypedBox>
          ))}
          {/* 다른 Played 박스도 추가 */}
        </S.TypedWrapper>
    </div>
  );
};

export default CommunityCollection;