import { FC, SetStateAction } from 'react';

type Props = {
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
};

const ShowPerPage: FC<Props> = ({ perPage, setPerPage }) => {
  return (
    <div>
      <div>Show Per Page: {perPage}</div>
      <div>
        <button onClick={() => setPerPage(1)}>1</button>
        <button onClick={() => setPerPage(5)}>5</button>
        <button onClick={() => setPerPage(10)}>10</button>
        <button onClick={() => setPerPage(20)}>20</button>
      </div>
    </div>
  );
};

export default ShowPerPage;
