import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: auto;
  width: 1100px;
  @media (max-width: 1100px) {
    width: 100%;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

export default Container;
