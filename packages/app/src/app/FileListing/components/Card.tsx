import { FC, ReactChild } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  border: 2px solid gray;
`;

const Card: FC<{ children: ReactChild }> = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Card;
