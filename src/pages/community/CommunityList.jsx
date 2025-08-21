// src/pages/community/CommunityList.jsx
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCommunityPublic } from "../../api/communityApi";

const CommunityList = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("popular"); // 'popular' | 'recent'
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const res = await fetchCommunityPublic(sort);
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <Container>
      <TopRow>
        <Left>
          <Title>전체 글</Title>
          <SortMenu>
            <button
              className={sort === "popular" ? "active" : ""}
              onClick={() => setSort("popular")}
            >
              인기순
            </button>
            <span className="divider">|</span>
            <button
              className={sort === "recent" ? "active" : ""}
              onClick={() => setSort("recent")}
            >
              최신순
            </button>
          </SortMenu>
        </Left>
        <WriteButton onClick={() => navigate("/community/write")}>나만의 글 쓰기</WriteButton>
      </TopRow>

      <CardList>
        {items.map((item) => (
          <CommunityCard
            key={item._id}
            data={item}
            onClick={() => navigate(`/community/${item._id}`, { state: { post: item } })}
          />
        ))}
      </CardList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-top: 24px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const SortMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    font-size: 14px;
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;

    &.active {
      font-weight: 600;
      color: #000;
    }
  }

  .divider {
    color: #ccc;
    font-size: 14px;
  }
`;

const WriteButton = styled.button`
  font-family: Pretendard;
  font-weight: 500;
  background-color: #ff6f3f;
  width: 110px;
  height: 36px;
  color: white;
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #131313;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default CommunityList;