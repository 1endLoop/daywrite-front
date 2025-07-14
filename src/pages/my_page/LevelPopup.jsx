import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex: 1;
  overflow-y: auto;
`;

const Table = styled.table`
  flex: 1.3;
  border-collapse: collapse;
  width: 100%;

  th {
    text-align: left;
    padding: 12px 0;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }

  td {
    padding: 12px 0;
    font-size: 14px;
    vertical-align: middle;
    border-bottom: 1px solid #eee;

    img {
      width: 22px;
      height: 22px;
      vertical-align: middle;
      margin-right: 8px;
    }
  }
`;

const InfoBox = styled.div`
  flex: 1;
  background: #f7f7f7;
  border-radius: 12px;
  padding: 20px 24px;
  font-size: 14px;
  line-height: 1.7;
  color: #333;

  strong {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  ul {
    padding-left: 18px;
    margin: 8px 0;
  }

  li {
    margin-bottom: 6px;
  }
`;

const levelData = [
  { icon: 'lv1.png', level: '레벨 1', total: '0', need: '-', count: '0개' },
  { icon: 'lv2.png', level: '레벨 2', total: '50 XP', need: '+50 XP', count: '약 5개' },
  { icon: 'lv3.png', level: '레벨 3', total: '150 XP', need: '+100 XP', count: '약 15개' },
  { icon: 'lv4.png', level: '레벨 4', total: '300 XP', need: '+150 XP', count: '약 30개' },
  { icon: 'lv5.png', level: '레벨 5', total: '500 XP', need: '+200 XP', count: '약 50개' },
  { icon: 'lv6.png', level: '레벨 6', total: '750 XP', need: '+250 XP', count: '약 75개' },
  { icon: 'lv7.png', level: '레벨 7', total: '1050 XP', need: '+300 XP', count: '약 105개' },
  { icon: 'lv8.png', level: '레벨 8', total: '1400 XP', need: '+350 XP', count: '약 140개' },
  { icon: 'lv9.png', level: '레벨 9', total: '1800 XP', need: '+400 XP', count: '약 180개' },
  { icon: 'lv10.png', level: '레벨 10', total: '2250 XP', need: '+450 XP', count: '약 225개' },
];

const LevelPopup = ({ onClose }) => {
  return (
    <Overlay>
      <Popup>
        <TitleRow>
          <Title>레벨 안내</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </TitleRow>

        <ContentWrapper>
          <Table>
            <thead>
              <tr>
                <th>레벨</th>
                <th>누적 경험치</th>
                <th>필요 경험치</th>
                <th>누적 필사수<br />(1개 = 10XP)</th>
              </tr>
            </thead>
            <tbody>
              {levelData.map(({ icon, level, total, need, count }, i) => (
                <tr key={i}>
                  <td><img src={`/assets/images/icons/${icon}`} alt={level} />{level}</td>
                  <td>{total}</td>
                  <td>{need}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <InfoBox>
            <strong>⭐️ 새로운 점수 부여 방식</strong>
            <div>✅ <b>기본 활동 점수</b></div>
            <ul>
              <li>· 필사 1회당: +10 XP</li>
            </ul>
            <div>✅ <b>연속 출석에 따른 보너스 점수</b></div>
            <ul>
              <li>· 1~2일: +5 XP</li>
              <li>· 3~6일: +10 XP</li>
              <li>· 7~14일: +15 XP</li>
              <li>· 15~29일: +20 XP</li>
              <li>· 30일 이상: +30 XP</li>
            </ul>
          </InfoBox>
        </ContentWrapper>
      </Popup>
    </Overlay>
  );
};

export default LevelPopup;

