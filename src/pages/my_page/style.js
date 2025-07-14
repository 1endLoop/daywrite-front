import styled from 'styled-components';

const S = {};

S.Wrapper = styled.div`
  width: 1250px;
  min-height: calc(100vh - 30px);
  margin: 30px auto 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 16px;
  padding-bottom: 0;
`;

S.Sidebar = styled.aside`
  width: 220px;
  padding: 100px 24px;
  font-size: 20px;
  margin-top: -60px;
  margin-left: -14px;

  
`;

S.Title = styled.h5`
  font-size: 30px;
  border-bottom: 2px solid black;
  padding-bottom: 8px;
  margin-bottom: 24px;
  
`;

S.MenuSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
  text-align: center; // 물어보기 가운데 정렬
`;

S.MenuItem = styled.div`
  font-size: 18px;
  padding: 8px 0;
  cursor: pointer;
  color: ${({ active }) => (active ? '#f26c44' : '#000000')};
  font-weight: ${({ active }) => (active ? '700' : 'normal')};
`;

S.Divider = styled.hr`
  border: none;
  border-top: 1px solid black;
  margin: 24px 0;
`;

S.Content = styled.main`
  flex: 1;
  padding: 80px 40px 48px;
  background: white;
  overflow-y: auto;
`;

S.Bottom = styled.hr`
  border: none;
  border-top: 2px solid black;
  margin: 24px 0;
`;

S.ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: -40px;
`;

S.SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

S.ProfileTopRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 200px;
  margin-top: -10px;
`;

S.ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

S.Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
`;

S.Nickname = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

S.Email = styled.div`
  font-size: 15px;
  color: #9F9F9F;
  margin-top: 8px;
`;

S.StatsRow = styled.div`
  display: flex;
  gap: 100px;
  justify-content: flex-start;
`;

S.StatBox = styled.div`
  text-align: center;

  span {
    font-size: 20px;
    font-weight: bold;
    display: block;
  }

  label {
    font-size: 14px;
    color: #666;
  }
`;

S.InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

S.InfoCard = styled.div`
  background: #f2f2f2;
  padding: 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 18px;
`;

S.LevelBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.LevelText = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;

S.LevelButton = styled.button`
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 117px;
  color: #000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
    border-color: #999;
  }
`;

S.LevelTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.LevelBar = styled.div`
  width: 100%;
  max-width: 800px;  
  height: 12px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

S.LevelProgress = styled.div`
  width: 100%;
  height: 100%;
  background: #FF00BB;      
  border-radius: 4px;     
`;

S.LevelLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

// TypingSetting Style

S.TypingSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: -40px;
`;

S.TypingSettingTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

S.PreviewText = styled.p`
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
  text-align: center;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

S.SliderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

S.Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

S.Slider = styled.div`
  background: #f2f2f2;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 770px;
  justify-content: space-between;
`;

S.ControlButton = styled.button`
  font-size: 20px;            // 아이콘/텍스트가 큼
  border: none;               // 테두리 제거
  background: none;           // 배경 제거
  cursor: pointer;            // 마우스 오버 시 포인터 표시
 
`;

S.BackgroundSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.BackgroundHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ImageGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

S.Thumbnail = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: ${({ selected, confirmed }) => {
    if (confirmed) return '2px solid #F86F3D'; // ✅ 최종 확정
    if (selected) return '2px solid #5E4237'; // 선택
    return 'none';
  }};
`;


S.ActionButton = styled.button`
  font-size: 12px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #f26c44;
  }
`;

S.BackgroundButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateX(-110px);

`;

S.VerticalDivider = styled.div`
  width: 1px;
  height: 16px;
  background-color: #ccc;
`;


// EditUserInfo Setting

// 전체 컨테이너
S.EditUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: -40px;
`;

S.Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
`;

S.InputRow = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
`;

S.Input = styled.input`
  flex: 0.5;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  max-width: 600px;
  width: 90%;
`;

S.ConfirmButton = styled.button`
  padding: 10px 24px;
  background: #888;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

S.OrangeButton = styled.button`
  padding: 10px 24px;
  background: #f86f3d;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #e85c2e;
  }
`;

S.BlackButton = styled.button`
  padding: 10px 24px;
  background: #1e1e1e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #000;
  }
`;

S.PhotoButton = styled.button`
  padding: 10px 24px;
  background: white;
  outline: 1px solid black;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: skyblue;
  }
`;

S.OutlinedButton = styled.button`
  padding: 10px 24px;
  border: 1px solid #1e1e1e;
  color: #1e1e1e;
  background: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

S.Email = styled.div`
  font-size: 14px;
  color: #111;
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-size: 12px;
    color: #f86f3d;
  }
`;

S.ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 100px;
  flex-wrap: wrap;
  transform: translateX(300px);
`;

S.ButtonGroup2 = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
  flex-wrap: wrap;
  transform: translate(680px, -70px);
`;

S.Withdraw = styled.span`
  font-size: 12px;
  color: #888;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 2px;
`;
export default S;
