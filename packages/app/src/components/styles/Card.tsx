import { FC, ReactChild } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  margin: 1rem;
  background-color: aliceblue;
  border: 0.2rem solid black;
  .details-card {
    margin-top: 0.5rem;
  }
`;

const Card: FC<{ children: ReactChild }> = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Card;
