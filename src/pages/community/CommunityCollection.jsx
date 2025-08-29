// CommunityCollection.jsx
import React, { useState, useEffect } from 'react';
import S from './collectionStyle';
import { useNavigate } from 'react-router-dom';

const HEART_ON = '/assets/images/icons/svg/like=on.svg';
const HEART_OFF = '/assets/images/icons/svg/like=off.svg';

const CommunityCollection = () => {
  const [playedFolders, setPlayedFolders] = useState([]);
  const [typedFolders, setTypedFolders] = useState([]);

  // 내 좋아요 여부 맵
  const [playedLiked, setPlayedLiked] = useState({}); // { [id]: true }
  const [typedLiked, setTypedLiked] = useState({});   // { [id]: true }

  const navigate = useNavigate();
  const uid   = localStorage.getItem('uid') || localStorage.getItem('userId');
  const token = localStorage.getItem('jwtToken');
  const BE    = process.env.REACT_APP_BACKEND_URL;

  // 정적 파일 origin
  const getAssetOrigin = () => {
    const raw = (BE || '').replace(/\/+$/, '');
    return raw.replace(/\/api$/i, '') || 'http://localhost:8000';
  };

  // 썸네일 경로 보정
  const buildImageSrc = (thumb = '') => {
    if (!thumb) return '';
    const clean = String(thumb).trim().replace(/\\/g, '/');
    if (/^https?:\/\//i.test(clean)) return clean;
    const origin = getAssetOrigin();
    if (clean.startsWith('/uploads/')) return `${origin}${clean}`;
    if (clean.startsWith('uploads/'))  return `${origin}/${clean}`;
    return `${origin}/uploads/${clean.replace(/^\/+/, '')}`;
  };

  // Top 5 가져오기
  useEffect(() => {
    (async () => {
      try {
        const [playedRes, typedRes] = await Promise.all([
          fetch(`${BE}/api/playList/folders/top?limit=5`),
          fetch(`${BE}/api/bookmarkFolder/folders/top?limit=5`),
        ]);
        const played = playedRes.ok ? await playedRes.json() : [];
        const typed  = typedRes.ok ? await typedRes.json()  : [];
        setPlayedFolders(Array.isArray(played) ? played : []);
        setTypedFolders(Array.isArray(typed) ? typed : []);
      } catch (e) {
        console.error(e);
        setPlayedFolders([]);
        setTypedFolders([]);
      }
    })();
  }, [BE]);

  // 내 좋아요 목록(로그인 시)
  useEffect(() => {
    if (!uid) return; // 비로그인은 스킵
    (async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [mineTypedRes, minePlayedRes] = await Promise.all([
          fetch(`${BE}/api/likes/mine?type=typed&userId=${encodeURIComponent(uid)}`, { headers }),
          fetch(`${BE}/api/likes/mine?type=played&userId=${encodeURIComponent(uid)}`, { headers }),
        ]);
        const mineTyped  = mineTypedRes.ok  ? await mineTypedRes.json()  : { ids: [] };
        const minePlayed = minePlayedRes.ok ? await minePlayedRes.json() : { ids: [] };

        setTypedLiked(Object.fromEntries((mineTyped.ids  || []).map(id  => [id, true])));
        setPlayedLiked(Object.fromEntries((minePlayed.ids || []).map(id => [id, true])));
      } catch (e) {
        console.error('getMyLikes 실패:', e);
        setTypedLiked({});
        setPlayedLiked({});
      }
    })();
  }, [BE, uid, token]);

  // 서버에 좋아요 토글 요청 공통 함수
  const toggleLikeOnServer = async (type, id) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(`${BE}/api/likes/toggle/${id}?type=${type}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId: uid }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('toggleLike error:', data);
      throw new Error(data?.message || 'like toggle 실패');
    }
    // console.log('toggleLike ok:', { type, id, data });
    return data; // { liked, likeCount }
  };


  // 리스트 안에서 해당 아이템의 likeCount를 갱신하고, likeCount desc로 재정렬
  const patchList = (list, id, likeCount) => {
    const idStr = String(id);
    const next = list.map(f =>
      String(f.id) === idStr ? { ...f, likeCount } : f
    );
    // likeCount 내림차순, 동률이면 최신 생성 우선(원하면 유지)
    next.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
    return next;
  };

  // 하트 토글 핸들러
  const onTypedHeart = async (e, id) => {
    e.stopPropagation();
    if (!uid) return alert('로그인 후 이용해주세요.');

    try {
      const { liked, likeCount } = await toggleLikeOnServer('typed', id);

      // 서버 응답에 likeCount가 없을 수도 있으니, 로컬에서 보정
      const prev = typedFolders.find(f => String(f.id) === String(id));
      const safeCount = typeof likeCount === 'number'
        ? likeCount
        : Math.max(0, (prev?.likeCount ?? 0) + (liked ? 1 : -1));

      setTypedLiked(prevLiked => ({ ...prevLiked, [id]: liked }));
      setTypedFolders(prev => patchList(prev, id, safeCount));
    } catch (err) {
      console.error(err);
      alert('좋아요 처리에 실패했어요.');
    }
  };

  const onPlayedHeart = async (e, id) => {
    e.stopPropagation();
    if (!uid) return alert('로그인 후 이용해주세요.');

    try {
      const { liked, likeCount } = await toggleLikeOnServer('played', id);

      const prev = playedFolders.find(f => String(f.id) === String(id));
      const safeCount = typeof likeCount === 'number'
        ? likeCount
        : Math.max(0, (prev?.likeCount ?? 0) + (liked ? 1 : -1));

      setPlayedLiked(prevLiked => ({ ...prevLiked, [id]: liked }));
      setPlayedFolders(prev => patchList(prev, id, safeCount));
    } catch (err) {
      console.error(err);
      alert('좋아요 처리에 실패했어요.');
    }
  };


  return (
    <div>
      {/* 인기 글 컬렉션 */}
      <S.TypedTitle>
        <h2>인기 글 컬렉션</h2>
        <p onClick={() => navigate('/community/collection/collectionAllview?type=typed')}>전체보기</p>
      </S.TypedTitle>

      <S.TypedWrapper>
        {typedFolders.map(folder => {
          const liked = !!typedLiked[folder.id];
          return (
            <S.TypedBox
              key={folder.id}
              onClick={() =>
                navigate(`/archive/bookmark/typed/typedList/${folder.id}`, {
                 state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl), readOnly: true },
              })
              }
            >
              <img
                src={buildImageSrc(folder.thumbnailUrl) || '/assets/images/book-img.jpeg'}
                alt={folder.title}
                onError={(e) => { e.currentTarget.src = '/assets/images/book-img.jpeg'; }}
              />
              <S.LetterBox>
                <div>
                  <h6>{folder.title}</h6>
                  <p>{folder.count}개의 글</p>
                </div>

                {/* 하트 */}
                <S.HeartBox
                  role="button"
                  tabIndex={0}
                  aria-label={liked ? '좋아요 취소' : '좋아요'}
                  onClick={(e) => onTypedHeart(e, folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onTypedHeart(e, folder.id);
                  }}
                >
                  <img src={liked ? HEART_ON : HEART_OFF} alt="" />
                </S.HeartBox>

                <S.LikeCount>
                  <p className="likeCount">{folder.likeCount ?? 0} 좋아요</p>
                </S.LikeCount>
              </S.LetterBox>
            </S.TypedBox>
          );
        })}
      </S.TypedWrapper>

      {/* 인기 음악 플레이리스트 */}
      <S.PlayedTitle>
        <h2>인기 음악 플레이리스트</h2>
        <p onClick={() => navigate('/community/collection/collectionAllview?type=played')}>전체보기</p>
      </S.PlayedTitle>

      <S.TypedWrapper>
        {playedFolders.map(folder => {
          const liked = !!playedLiked[folder.id];
          return (
            <S.TypedBox
              key={folder.id}
              onClick={() =>
                navigate(`/archive/bookmark/playedList/${folder.id}`, {
                  state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl), readOnly: true },
                })
              }
            >
              <img
                src={buildImageSrc(folder.thumbnailUrl) || '/assets/images/album-image.png'}
                alt={folder.title}
                onError={(e) => { e.currentTarget.src = '/assets/images/album-image.png'; }}
              />
              <S.LetterBox>
                <div>
                  <h6>{folder.title}</h6>
                  <p>{folder.count}개의 곡</p>
                </div>

                {/* 하트 */}
                <S.HeartBox
                  role="button"
                  tabIndex={0}
                  aria-label={liked ? '좋아요 취소' : '좋아요'}
                  onClick={(e) => onPlayedHeart(e, folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onPlayedHeart(e, folder.id);
                  }}
                >
                  <img src={liked ? HEART_ON : HEART_OFF} alt="" />
                </S.HeartBox>

                <S.LikeCount>
                  <p className="likeCount">{folder.likeCount ?? 0} 좋아요</p>
                </S.LikeCount>
              </S.LetterBox>
            </S.TypedBox>
          );
        })}
      </S.TypedWrapper>
    </div>
  );
};

export default CommunityCollection;