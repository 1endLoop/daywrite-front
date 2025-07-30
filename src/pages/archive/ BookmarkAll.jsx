import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookmarkCard from "./BookmarkCard";
import S from "./bookmark.section.style";

const BookmarkAll = () => {
  const { type } = useParams(); // "typed" 또는 "played"
  const [items, setItems] = useState([]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const title = capitalize(type); // "Typed" 또는 "Played"
  const contentType = type === "typed" ? "글" : "곡";

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/playList/folders`);
        const data = await res.json();
        const filtered = data.filter(folder => folder.type === contentType);
        setItems(filtered);
      } catch (err) {
        console.error("폴더 목록 불러오기 실패:", err);
      }
    };

    fetchFolders();
  }, [type]);

  // 임시 북마크 목록 데이터
  // const allItems = [
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "니체 명언집",
  //     count: 10,
  //     type: "글",
  //     imageUrl: "/assets/images/book-img.jpeg",
  //   },
  //   {
  //     title: "사랑에 빠졌을 때",
  //     count: 8,
  //     type: "곡",
  //     imageUrl: "/assets/images/album-image.png",
  //   },
  //   {
  //     title: "포근한",
  //     count: 8,
  //     type: "곡",
  //     imageUrl: "/assets/images/profiles/cat.JPG",
  //   },
  // ];

  // const filteredItems = allItems.filter((item) => item.type === contentType);

  return (
    <S.Container>
      {/* <S.AllTitle>{title}</S.AllTitle>
      <S.AllCardGrid>
        {filteredItems.map((item, idx) => (
          <BookmarkCard key={idx} {...item} />
        ))}
      </S.AllCardGrid> */}
      <S.AllTitle>{title}</S.AllTitle>
      <S.AllCardGrid>
        {items.map((item) => (
          <BookmarkCard 
          key={item._id}                    // MongoDB 기본 키 사용
          title={item.title}
          count={item.playlistIds?.length || 0}
          type={item.type}
          imageUrl={item.thumbnailUrl}     
          onClick={() => console.log(item)} // 필요 시 상세 페이지로 이동 등
          />
        ))}
      </S.AllCardGrid>
    </S.Container>
  );
};

export default BookmarkAll;
