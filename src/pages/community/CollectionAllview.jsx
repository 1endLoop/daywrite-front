import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import S from "./collectionAllviewStyle";

const HEART_ON  = "/assets/images/icons/svg/like=on.svg";
const HEART_OFF = "/assets/images/icons/svg/like=off.svg";

const CollectionAllview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = (searchParams.get("type") === "played") ? "played" : "typed"; // 기본 typed
  const [folders, setFolders] = useState([]);
  const [likedMap, setLikedMap] = useState({}); // { [id]: true }
  const navigate = useNavigate();

  const BE    = process.env.REACT_APP_BACKEND_URL;
  const uid   = localStorage.getItem("uid") || localStorage.getItem("userId");
  const token = localStorage.getItem("jwtToken");

  // 정적 파일 origin
  const getAssetOrigin = () => {
    const raw = (BE || "").replace(/\/+$/, "");
    return raw.replace(/\/api$/i, "") || "http://localhost:8000";
  };

  // 썸네일 경로 보정
  const buildImageSrc = (thumb = "") => {
    if (!thumb) return "";
    const clean = String(thumb).trim().replace(/\\/g, "/");
    if (/^https?:\/\//i.test(clean)) return clean;
    const origin = getAssetOrigin();
    if (clean.startsWith("/uploads/")) return `${origin}${clean}`;
    if (clean.startsWith("uploads/"))  return `${origin}/${clean}`;
    return `${origin}/uploads/${clean.replace(/^\/+/, "")}`;
  };

  // 페이지 타이틀/라벨
  const labels = useMemo(() => ({
    title: type === "typed" ? "Typed" : "Played",
    itemUnit: type === "typed" ? "글" : "곡",
    topEndpoint: type === "typed"
      ? `${BE}/api/bookmarkFolder/folders/top?limit=50`
      : `${BE}/api/playList/folders/top?limit=50`,
  }), [type, BE]);

  // 목록 로드 (커뮤니티 전체 Top N)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(labels.topEndpoint);
        const data = res.ok ? await res.json() : [];
        // likeCount desc로 이미 정렬돼있겠지만 한 번 더 안전하게
        data.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
        setFolders(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("전체보기 목록 실패:", e);
        setFolders([]);
      }
    })();
  }, [labels.topEndpoint]);

  // 내 좋아요 목록
  useEffect(() => {
    if (!uid) { setLikedMap({}); return; }
    (async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`${BE}/api/likes/mine?type=${type}&userId=${encodeURIComponent(uid)}`, { headers });
        const json = res.ok ? await res.json() : { ids: [] };
        setLikedMap(Object.fromEntries((json.ids || []).map(id => [id, true])));
      } catch (e) {
        console.error("getMyLikes 실패:", e);
        setLikedMap({});
      }
    })();
  }, [BE, type, uid, token]);

  // 서버에 좋아요 토글
  const toggleLikeOnServer = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(`${BE}/api/likes/toggle/${id}?type=${type}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ userId: uid }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "like toggle 실패");
    return data; // { liked, likeCount }
  };

  // 목록에서 해당 아이템 likeCount 갱신 + 정렬 유지
  const patchList = (list, id, likeCount) => {
    const idStr = String(id);
    const next = list.map(f => (String(f.id) === idStr ? { ...f, likeCount } : f));
    next.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
    return next;
  };

  const onHeartClick = async (e, id) => {
    e.stopPropagation();
    if (!uid) return alert("로그인 후 이용해주세요.");
    try {
      const { liked, likeCount } = await toggleLikeOnServer(id);
      setLikedMap(prev => ({ ...prev, [id]: liked }));
      setFolders(prev => patchList(prev, id, likeCount));
    } catch (err) {
      console.error(err);
      alert("좋아요 처리에 실패했어요.");
    }
  };

  // 상단에서 탭처럼 전환하고 싶다면:
  const switchType = (next) => setSearchParams({ type: next });

  return (
    <div>
      <S.AllViewTitle>
        <h2>{labels.title}</h2>

        {/* 탭 전환 (선택사항) */}
        {/* <div style={{ display: "flex", gap: 8 }}>
          <S.Tab $active={type === "typed"}  onClick={() => switchType("typed")}>글</S.Tab>
          <S.Tab $active={type === "played"} onClick={() => switchType("played")}>곡</S.Tab>
        </div> */}
      </S.AllViewTitle>

      <S.AllViewWrapper>
        {folders.map((folder) => {
          const liked = !!likedMap[folder.id];
          return (
            <S.AllViewBox
              key={folder.id}
              onClick={() =>
                type === "typed"
                  ? navigate(`/archive/bookmark/typed/typedList/${folder.id}`, {
                      state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl), readOnly: true },
                    })
                  : navigate(`/archive/bookmark/playedList/${folder.id}`, {
                      state: { title: folder.title, thumbnailUrl: buildImageSrc(folder.thumbnailUrl), readOnly: true },
                    })
              }
            >
              <img
                src={buildImageSrc(folder.thumbnailUrl) || (type === "typed" ? "/assets/images/book-img.jpeg" : "/assets/images/album-image.png")}
                alt={folder.title}
                className="folderImg"
                onError={(e) => {
                  e.currentTarget.src = type === "typed" ? "/assets/images/book-img.jpeg" : "/assets/images/album-image.png";
                }}
              />

              <div className="ViewBoxTitle">
                <strong>{folder.title}</strong>
                <p>{folder.count}개의 {labels.itemUnit}</p>

                {/* 하트 & 카운트 */}
                <div
                  className="heart"
                  role="button"
                  aria-label={liked ? "좋아요 취소" : "좋아요"}
                  onClick={(e) => onHeartClick(e, folder.id)}
                >
                  <img src={liked ? HEART_ON : HEART_OFF} alt="" />
                </div>
                <span className="likeCount">{folder.likeCount ?? 0} 좋아요</span>
              </div>
            </S.AllViewBox>
          );
        })}
      </S.AllViewWrapper>
    </div>
  );
};

export default CollectionAllview;
