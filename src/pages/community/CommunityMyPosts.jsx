import React, { useState } from "react";
import styled from "styled-components";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../../components/button/ToggleButton";

const dummyData = [
  {
    id: 1,
    content:
      "여러 변덕스러운 우연이, 지쳐버린 타인이, 그리고 누구보다 자신이 자신에게 모질게 굴 수 있으니 마음 단단히 먹기 바랍니다. 나는 커서 어떻게 살까, 오래된 질문을 오늘부터의 매일이 대답해줍니다. 취업 준비, 결혼 준비, 육아, 교육, 승진, 은퇴, 노후 준비를 거쳐 어느 병원 그럴듯한 1인실에서 사망하기 위한 준비에 산만해지지 않기를 바랍니다. 무례와 혐오와 경쟁과 분열과 비교와 나태와 허무의 달콤함에 길들지 말길, 의미와 무의미의 온갖 폭력을 이겨내고 하루하루를 온전히 경험하길, 그 끝에서 오래 기다리고 있는 낯선 나를 아무 아쉬움 없이 맞이하길 바랍니다.",
    title: "서울대학교 졸업식 축사",
    author: "허준이",
    music: "Love on Top",
    artist: "John Canada",
    profileImg: "",
    likes: 121,
    comments: 36,
  },
  {
    id: 2,
    content:
      "여러 변덕스러운 우연이, 지쳐버린 타인이, 그리고 누구보다 자신이 자신에게 모질게 굴 수 있으니 마음 단단히 먹기 바랍니다. 나는 커서 어떻게 살까, 오래된 질문을 오늘부터의 매일이 대답해줍니다. 취업 준비, 결혼 준비, 육아, 교육, 승진, 은퇴, 노후 준비를 거쳐 어느 병원 그럴듯한 1인실에서 사망하기 위한 준비에 산만해지지 않기를 바랍니다. 무례와 혐오와 경쟁과 분열과 비교와 나태와 허무의 달콤함에 길들지 말길, 의미와 무의미의 온갖 폭력을 이겨내고 하루하루를 온전히 경험하길, 그 끝에서 오래 기다리고 있는 낯선 나를 아무 아쉬움 없이 맞이하길 바랍니다.",
    title: "내가 틀릴 수도 있습니다",
    author: "조짱희",
    music: "Rainy Days",
    artist: "Lee Moon",
    profileImg: "",
    likes: 98,
    comments: 24,
  },
];

const CommunityMyPosts = () => {
  const [isTemp, setIsTemp] = useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <TopRow>
        <Left>
          <ToggleButton isTemp={isTemp} onToggle={setIsTemp} />
        </Left>
        <WriteButton onClick={() => navigate("/community/write")}>나만의 글 쓰기</WriteButton>
      </TopRow>
      <CardList>
        {dummyData.map((item) => (
          <CommunityCard
            key={item.id}
            data={item}
            onClick={() => navigate(`/community/${item.id}`, { state: { post: item } })}
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

const SortMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

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

export default CommunityMyPosts;
