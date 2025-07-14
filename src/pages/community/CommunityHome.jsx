import React from 'react';
import styled from 'styled-components';
import CommunityList from "./CommunityList";
import CommunityCard from "./CommunityCard";
import CommunityPopularCard from './CommunityPopularCard';
import { useNavigate } from "react-router-dom";

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
  {
    id: 3,
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
    id: 4,
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
  {
    id: 5,
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

const CommunityHome = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TopRow>
        <Left>
          <Title>인기 글</Title>
        </Left>
          <SearchBarWrapper>
          <input type="text" placeholder="검색어를 입력하세요" />
          </SearchBarWrapper>
        <WriteButton onClick={()=>navigate(`/community/write`)}>나만의 글 쓰기</WriteButton>
      </TopRow>
      <CardPopularList>
        {dummyData.map((item) => (
          <CommunityPopularCard 
          key={item.id} 
          data={item} 
          onClick={() => navigate(`/community/${item.id}`, { state: { post: item } })}
          />
        ))}
      </CardPopularList>

      <TopRow>
        <Left>
          <Title>전체 글</Title>
          <SortMenu>
            <button className="active">인기순</button>
            <span className="divider">|</span>
            <button>최신순</button>
          </SortMenu>
        </Left>
        <AllViewBtn>
          <button onClick={()=>{navigate(`/community/list`)}}>전체보기</button>
          <img src="assets/images/icons/right.png" alt="" />
        </AllViewBtn>
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
const SearchBarWrapper = styled.div`
  input {
    width: 260px;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
`;

const WriteButton = styled.button`
  background-color: #ff6f3f;
  color: white;
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
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

const CardPopularList= styled.div`
  display: flex;
  gap: 40px;
  margin-bottom:50px;
  overflow:hidden;
`;

const AllViewBtn=styled.div`
  display:flex;
  align-items: center;
  text-align:center;
  cursor: pointer;
  height:25px;
  
  button{
    font-size: 14px;
    background: none;
    border: none;
    padding : 0px;
    display: flex;
    align-items: center;
    line-height: 1
    justify-content: center;
    top: -3px; /* 또는 -1px: 글씨가 너무 아래에 있으면 */
  }

  img{
    width:25px;
    height:25px;
    display: block;
  }
`

export default CommunityHome;