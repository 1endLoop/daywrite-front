import React, { useState } from 'react';
import styled from 'styled-components';

// 팝업 래퍼: 중앙 고정, 그림자, 스크롤 가능
const Popup = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 700px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 24px 40px;
  overflow-y: auto;
`;

// 뒤로가기 버튼: 팝업 내 절대 위치
const BackButton = styled.img`
  position: absolute;
  top: 24px;
  left: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

// 제목 스타일: 중앙 정렬, 볼드
const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 24px;
`;

// 탭 메뉴: flex, 전체 밑줄, 탭별 밑줄 강조
const TabMenu = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;

  div {
    flex: 1;
    padding: 12px 0;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    position: relative;
    cursor: pointer;
    z-index: 1;
  }

  .underline::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #f96f3d;
    border-radius: 1px;
  }
`;

// 검색창 래퍼: relative 지정, input 공간 확보
const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;     /* 팝업 내부 너비(600px) - 좌우 패딩(40px *2) = 520px */
  margin: 0 auto 24px;  /* 가운데 정렬 + 아래 여백 */
  background: #f5f5f5;
  border-radius: 12px;
  padding: 8px 12px;

  input {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 14px;
    padding: 6px 36px 6px 8px;
    outline: none;
  }
`;

// 검색 아이콘: 절대 위치로 우측 중앙 배치
const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

// 공유 글 카드 스타일링
const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  /* 고정 높이 제거: 카드 크기를 콘텐츠에 맞게 유지 */
`;


const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  img { width: 40px; height: 40px; border-radius: 50%; }
  div { font-size: 15px; font-weight: 600; }
`;
const CardBody = styled.div`
  font-size: 13px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.6;
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 12px;

  span { display: flex; align-items: center; gap: 6px; }
`;

// 팔로워 / 팔로잉 리스트 스타일
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #f26c44;
  }
  div {
    display: flex;
    flex-direction: column;
    span:first-child { font-size: 17px; font-weight: 500; }
    span:last-child  { font-size: 12px; color: #9f9f9f; }
  }
`;
const FollowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90px;             /* 고정 너비 */
  height: 35px;            /* 고정 높이 */
  background: #5d2c17;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;


const ProfileHomePopup = ({ onClose, initialTab = 'shared' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'shared':
        return (
          <>
            <Card>
              <CardHeader>
                <img src="/assets/images/profiles/profile.JPG" alt="user" />
                <div>잡곡 없는 포케 · 5일 전</div>
              </CardHeader>
              <CardBody>
                언제가 내가 말했었지. 몇 년 전일 수도 몇 개월 전일 수도 있지만 나는 언제나 꿈을 꾸고 있어. 내 장례 희망은 늘 푸른 수목장임! 한 그루, 언제 이루어질지 모르는 꿈이지만 그를 향해 달려가고 있을만한 도구가 굳이 내가 알지, 뭘 모는 거야.
              </CardBody>
              <CardFooter>
                <span>❤️ Love on Top</span>
                <span>🗨 36 · 👍 121</span>
              </CardFooter>
            </Card>
          </>
        );
      case 'followers':
        return (
          <List>
            <UserItem>
              <ProfileInfo>
                <img src="/assets/images/profiles/cat.JPG" alt="user" />
                <div><span>고양이</span><span>cat@gmail.com</span></div>
              </ProfileInfo>
              <FollowButton>맞팔로우</FollowButton>
            </UserItem>
          </List>
        );
      case 'following':
      default:
        return (
          <List>
            <UserItem>
              <ProfileInfo>
                <img src="/assets/images/profiles/profile.JPG" alt="pochaco" />
                <div><span>pochaco</span><span>yedalmi@gmail.com</span></div>
              </ProfileInfo>
              <FollowButton>팔로우</FollowButton>
            </UserItem>
          </List>
        );
    }
  };

  return (
    <Popup>
      <BackButton src="/assets/images/icons/back.png" alt="뒤로가기" onClick={onClose} />
      <Title>예닮</Title>
      <TabMenu>
        <div className={activeTab === 'shared' ? 'underline' : ''} onClick={() => setActiveTab('shared')}>5 공유한 글</div>
        <div className={activeTab === 'followers' ? 'underline' : ''} onClick={() => setActiveTab('followers')}>1000 팔로워</div>
        <div className={activeTab === 'following' ? 'underline' : ''} onClick={() => setActiveTab('following')}>100 팔로잉</div>
      </TabMenu>
      {/* 검색창 */}
      <SearchWrapper>
        <input placeholder="검색" />
        <SearchIcon src="/assets/images/icons/search.png" alt="검색" />
      </SearchWrapper>
      {renderContent()}
    </Popup>
  );
};

export default ProfileHomePopup;









