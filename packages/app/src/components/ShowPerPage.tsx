import { FC, SetStateAction } from 'react';
import styled from 'styled-components';

type Props = {
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
};

const Container = styled.div`
  padding: 0.6rem;
  padding-bottom: 0;
`;

const ShowPerPage: FC<Props> = ({ perPage, setPerPage }) => {
  return (
    <Container>
      <div>Show Per Page: {perPage}</div>
      <div>
        <button onClick={() => setPerPage(1)}>1</button>
        <button onClick={() => setPerPage(5)}>5</button>
        <button onClick={() => setPerPage(10)}>10</button>
        <button onClick={() => setPerPage(20)}>20</button>
      </div>
    </Container>
  );
};

export default ShowPerPage;
