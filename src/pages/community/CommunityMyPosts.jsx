// src/pages/community/CommunityMyPosts.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "../../components/button/ToggleButton";
import { useSelector } from "react-redux";
import { fetchMyPosts } from "../../api/communityApi";

const CommunityMyPosts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  // URL 쿼리(tab=temp)로 임시저장 탭 진입 지원
  const initialTemp = new URLSearchParams(location.search).get("tab") === "temp";
  const [isTemp, setIsTemp] = useState(initialTemp); // true면 draft, false면 published
  const [items, setItems] = useState([]);

  const load = async () => {
    if (!userId) return;
    try {
      const status = isTemp ? "draft" : "published";
      const res = await fetchMyPosts(userId, status);
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTemp, userId]);

  return (
    <Container>
      <TopRow>
        <Left>
          <ToggleButton isTemp={isTemp} onToggle={setIsTemp} />
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
  gap: 20px;
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

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default CommunityMyPosts;