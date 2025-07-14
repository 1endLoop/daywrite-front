import React, { useState } from 'react';
import S from './style';
import ProfileHomePopup from './ProfileHomePopup';
import LevelPopup from './LevelPopup'; // ✅ 레벨 팝업 컴포넌트 import
import { useNavigate } from 'react-router-dom';

const ProfileHome = () => {
  const navigate = useNavigate(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTab, setPopupTab] = useState('following');
  const [isLevelPopupOpen, setIsLevelPopupOpen] = useState(false); // ✅ 레벨 팝업 상태

  const openPopup = (tab) => {
    setPopupTab(tab);
    setIsPopupOpen(true);
  };

  return (
    <S.ProfileContainer>
      <S.SectionTitle>내 프로필</S.SectionTitle>

      <S.ProfileTopRow>
        <S.ProfileHeader>
          <S.Avatar src="/assets/images/profiles/profile.JPG" />
          <div>
            <S.Nickname>
              예닮
              <img
                src="/assets/images/icons/edit_2.png"
                alt="수정"
                width="24"
                style={{ marginLeft: '6px', cursor: 'pointer', verticalAlign: 'middle' }}
                onClick={() => navigate('/mypage/user-info')} 
              />
            </S.Nickname>
            <S.Email>yedam@email.com</S.Email>
          </div>
        </S.ProfileHeader>

        <S.StatsRow>
          <S.StatBox onClick={() => openPopup('shared')} style={{ cursor: 'pointer' }}>
            <span>5</span>
            <label>공유한 글</label>
          </S.StatBox>
          <S.StatBox onClick={() => openPopup('followers')} style={{ cursor: 'pointer' }}>
            <span>1000</span>
            <label>팔로워</label>
          </S.StatBox>
          <S.StatBox onClick={() => openPopup('following')} style={{ cursor: 'pointer' }}>
            <span>100</span>
            <label>팔로잉</label>
          </S.StatBox>
        </S.StatsRow>
      </S.ProfileTopRow>

      <S.InfoGrid>
        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/keyboard.png" alt="keyboard" width="24" />
            <span>필사 125개</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/fire.png" alt="fire" width="24" />
            <span>연속 15일</span>
          </div>
        </S.InfoCard>

        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/star.png" alt="star" width="24" />
            <span>레벨 10</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/equalizer.png" alt="exp" width="24" />
            <span>Exp 1,810</span>
          </div>
        </S.InfoCard>

        <S.InfoCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/like.png" alt="heart" width="24" />
            <span>좋아요 352</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/assets/images/icons/comment2_filled.png" alt="comment" width="24" />
            <span>댓글 283</span>
          </div>
        </S.InfoCard>
      </S.InfoGrid>

      <S.LevelBarWrapper>
        <S.LevelTopRow>
          <S.LevelText>
            <img
              src="/assets/images/icons/lv10.png"
              alt="level"
              width="25"
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
            />
            레벨 10
          </S.LevelText>
          <S.LevelButton onClick={() => setIsLevelPopupOpen(true)}>모든 레벨 보기</S.LevelButton>
        </S.LevelTopRow>

        <S.LevelBar>
          <S.LevelProgress style={{ width: '80%' }} />
        </S.LevelBar>
        <S.LevelLabel>1,810 / 2,250</S.LevelLabel>
      </S.LevelBarWrapper>

      {isPopupOpen && (
        <ProfileHomePopup
          onClose={() => setIsPopupOpen(false)}
          initialTab={popupTab}
        />
      )}

      {/* ✅ 레벨 팝업 */}
      {isLevelPopupOpen && <LevelPopup onClose={() => setIsLevelPopupOpen(false)} />}
    </S.ProfileContainer>
  );
};

export default ProfileHome;





