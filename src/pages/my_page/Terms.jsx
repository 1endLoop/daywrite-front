import React from 'react';
import styled from 'styled-components';

const Terms = () => {
  return (
    <Wrapper>
      <Title>약관</Title>
      <TermsBox>
        <Section>
          <h3>제1조 (목적)</h3>
          <p>
            이 약관은 endloop(이하 "회사")가 운영하는 필사 웹사이트(이하 "서비스")에서 제공하는 모든 기능의 이용과 관련하여, 회사와 회원 간의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </Section>

        <Section>
          <h3>제2조 (정의)</h3>
          <ul>
            <li>“서비스”란 회사가 온라인 웹사이트를 통해 제공하는 필사 작성, 열람, 공유 등 일체의 기능을 의미합니다.</li>
            <li>“회원”은 본 약관에 동의하고 회원가입을 완료한 자로서, 서비스에 지속적으로 접근하여 이용할 수 있는 자를 말합니다.</li>
            <li>“비회원”은 회원가입 없이 서비스를 일시적으로 이용하는 자입니다.</li>
            <li>“콘텐츠”란 회원이 서비스 내에 작성, 저장, 공유한 모든 글·필사·노트 등의 창작물을 말합니다.</li>
            <li>“유료 서비스”란 일정 비용을 지불해야만 사용할 수 있는 기능을 말하며, 예: 무제한 필사 저장, PDF 다운로드, 구독형 기능 등이 이에 해당합니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제3조 (약관의 게시 및 개정)</h3>
          <ol>
            <li>1. 본 약관은 서비스 초기 화면 및 회원가입 시 연결된 페이지에 게시됩니다.</li>
            <li>2. 회사는 관계법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있으며, 변경 시 적용일자 및 개정사유를 명시하여 사전 공지합니다.</li>
            <li>3. 회원은 개정된 약관에 동의하지 않을 경우, 이용계약을 해지할 수 있습니다.</li>
          </ol>
        </Section>

        <Section>
          <h3>제4조 (서비스 내용 및 제공)</h3>
          <ul>
            <li>• 필사 작성, 저장, 열람, 공유 기능</li>
            <li>• 추천 콘텐츠 및 필사 글 제공</li>
            <li>• 타인의 글에 댓글 또는 좋아요 기능</li>
            <li>• 유료 기능 (PDF 출력, 개인보관함 확대 등)</li>
            <li>• 회사는 콘텐츠의 품질 향상 또는 운영상 필요에 따라 서비스 내용을 변경할 수 있으며, 변경 시 사전 공지합니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제5조 (회원가입 및 탈퇴)</h3>
          <ul>
            <li>• 회원가입은 본인의 이메일 또는 SNS 계정을 통해 인증하여야 합니다.</li>
            <li>• 회원은 언제든지 “마이페이지 &gt; 탈퇴하기”를 통해 서비스 해지를 요청할 수 있습니다.</li>
            <li>• 탈퇴 시 회원이 작성한 콘텐츠는 삭제되거나 익명화 처리될 수 있습니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제6조 (유료 서비스 및 결제)</h3>
          <ul>
            <li>1. 회사는 유료 구독 및 유료 기능(예: 배경화면 변경, 폰트 선택, 무제한 필사)을 제공할 수 있으며, 가격은 서비스 내 별도 고지합니다.</li>
            <li>2. 환불은 결제일로부터 7일 이내이며, 콘텐츠 이용 이력이 없는 경우에만 가능합니다.</li>
            <li>3. 환불 신청은 고객센터를 통해 진행합니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제7조 (콘텐츠 권리 및 책임)</h3>
          <ul>
            <li>1. 회원이 작성한 콘텐츠의 저작권은 해당 회원에게 있으며, 회사는 비상업적 목적의 서비스 운영에 한하여 이를 사용할 수 있습니다.</li>
            <li>2. 공유 설정을 한 콘텐츠는 서비스 내에 노출될 수 있습니다.</li>
            <li>3. 타인의 콘텐츠를 무단으로 복제, 배포, 캡처하는 행위는 금지됩니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제8조 (개인정보 보호)</h3>
          <ul>
            <li>1. 회사는 회원의 개인정보 보호를 위해 관련 법령을 준수하며, 별도의 개인정보처리방침을 수립·공개합니다.</li>
            <li>2. 회사는 서비스 제공에 필요한 최소한의 정보만 수집하며, 수집 시 동의를 받습니다.</li>
            <li>3. 회원은 언제든지 본인의 개인정보를 열람, 수정, 삭제 요청할 수 있습니다.</li>
          </ul>
        </Section>

        <Section>
          <h3>제9조 (이용자의 의무)</h3>
          <ul>
            <li>1. 허위 정보 입력 또는 타인의 개인정보 도용</li>
            <li>2. 저작권 침해 콘텐츠 게시</li>
            <li>3. 욕설, 선정적 표현, 혐오, 광고성 콘텐츠 등록</li>
            <li>4. 서비스의 기술적 운영을 방해하는 행위</li>
          </ul>
        </Section>

        <Section>
          <h3>제10조 (서비스 이용 제한 및 해지)</h3>
          <ul>
            <li>1. 운영 정책 위반 또는 불법 행위</li>
            <li>2. 명백한 저작권 침해 또는 신고 누적</li>
            <li>3. 회원의 요청에 따른 자발적 해지</li>
          </ul>
        </Section>

        <Section>
          <h3>제11조 (분쟁해결 및 준거법)</h3>
          <p>회사는 회원이 제기하는 정당한 의견이나 민원에 대해 신속히 처리합니다. 서비스 이용과 관련된 분쟁 발생 시 관련법 및 민사소송법에 따라 해결합니다. 본 약관은 대한민국 법률에 따라 해석됩니다.</p>
        </Section>
      </TermsBox>
    </Wrapper>
  );
};

export default Terms;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -40px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;

`;

const TermsBox = styled.div`
  background: white;
  padding: 32px;
  /* border-left: 2px solid #ccc;
  line-height: 1.6; */
`;

const Section = styled.section`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    margin: 4px 0;
  }

  ul, ol {
    padding-left: 18px;
    font-size: 14px;
  }

  li {
    margin-bottom: 4px;
  }
`;
