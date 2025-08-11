import React, { useState } from 'react';
import S from './style';
import ProfileHomePopup from './ProfileHomePopup';
import LevelPopup from './LevelPopup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileHome = () => {
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.user.currentUser); // ✅ 로그인한 유저 정보
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTab, setPopupTab] = useState('following');
  const [isLevelPopupOpen, setIsLevelPopupOpen] = useState(false);

  const openPopup = (tab) => {
    setPopupTab(tab);
    setIsPopupOpen(true);
  };

  if (!user || !user.email) {
    return <div>로그인한 사용자 정보를 불러오는 중입니다...</div>;
  }

  return (
    <S.ProfileContainer>
      <S.SectionTitle>내 프로필</S.SectionTitle>

      <S.ProfileTopRow>
        <S.ProfileHeader>
          <S.Avatar src={user.profileImageUrl || "/assets/images/profiles/profile.jpg"} />
          <div>
            <S.Nickname>
              {user.nickname}
              <img
                src="/assets/images/icons/edit_2.png"
                alt="수정"
                width="24"
                style={{ marginLeft: '6px', cursor: 'pointer', verticalAlign: 'middle' }}
                onClick={() => navigate('/mypage/user-info')} 
              />
            </S.Nickname>
            <S.Email>{user.email}</S.Email>
          </div>
        </S.ProfileHeader>

        <S.StatsRow>
          <S.StatBox onClick={() => openPopup('shared')} style={{ cursor: 'pointer' }}>
            <span>{user.sharedCount || 0}</span>
            <label>공유한 글</label>
          </S.StatBox>
          <S.StatBox onClick={() => openPopup('followers')} style={{ cursor: 'pointer' }}>
            <span>{user.followers || 0}</span>
            <label>팔로워</label>
          </S.StatBox>
          <S.StatBox onClick={() => openPopup('following')} style={{ cursor: 'pointer' }}>
            <span>{user.following || 0}</span>
            <label>팔로잉</label>
          </S.StatBox>
        </S.StatsRow>
      </S.ProfileTopRow>

      <S.InfoGrid>
        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/keyboard.png" alt="keyboard" width="24" />
            <span>필사 {user.writingCount || 0}개</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/fire.png" alt="fire" width="24" />
            <span>연속 {user.streak || 0}일</span>
          </div>
        </S.InfoCard>

        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/star.png" alt="star" width="24" />
            <span>레벨 {user.level || 1}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/equalizer.png" alt="exp" width="24" />
            <span>Exp {user.exp || 0}</span>
          </div>
        </S.InfoCard>

        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/like.png" alt="heart" width="24" />
            <span>좋아요 {user.likes || 0}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/comment2_filled.png" alt="comment" width="24" />
            <span>댓글 {user.comments || 0}</span>
          </div>
        </S.InfoCard>
      </S.InfoGrid>

      <S.LevelBarWrapper>
        <S.LevelTopRow>
          <S.LevelText>
            <img
              src={`/assets/images/icons/lv${user.level || 1}.png`}
              alt="level"
              width="25"
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
            />
            레벨 {user.level || 1}
          </S.LevelText>
          <S.LevelButton onClick={() => setIsLevelPopupOpen(true)}>모든 레벨 보기</S.LevelButton>
        </S.LevelTopRow>

        <S.LevelBar>
          <S.LevelProgress style={{ width: `${(user.exp / user.expMax) * 100 || 0}%` }} />
        </S.LevelBar>
        <S.LevelLabel>{user.exp || 0} / {user.expMax || 1000}</S.LevelLabel>
      </S.LevelBarWrapper>

      {isPopupOpen && (
        <ProfileHomePopup
          onClose={() => setIsPopupOpen(false)}
          initialTab={popupTab}
        />
      )}

      {isLevelPopupOpen && <LevelPopup onClose={() => setIsLevelPopupOpen(false)} />}
    </S.ProfileContainer>
  );
};

export default ProfileHome;





