import styled from 'styled-components';

const S = {};

S.Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

S.HeaderContent = styled.div`
  width: 1250px;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.Logo = styled.img`
  height: 30px;
`;

S.Nav = styled.nav`
  display: flex;
  gap: 50px;

  a {
    font-size: 20px;
    font-weight: 400;
    color: #282828;
    text-decoration: none;

    &:hover {
      color: #f26c44;
    }
  }
`;

S.Login = styled.div`
  margin-right: 8px;
  a {
    font-size: 20px;
    font-weight: 400;
    color: #282828;
    text-decoration: none;

    &:hover {
      color: #f26c44;
    }
  }
`;

export default S;