import { FC, SetStateAction } from 'react';
import { database } from '../types/Database';
import SingleFileTable from './SingleFileTable';
import styled from 'styled-components';

type Props = {
  database: database;
  fileKeys: Array<string>;
  setChange: React.Dispatch<SetStateAction<string>>;
  perPage: number;
  firstImage: number;
};

const OneFile = styled.div`
  margin-bottom: 3rem;
`;

const FileDisplay: FC<Props> = ({
  database,
  fileKeys,
  setChange,
  perPage,
  firstImage,
}) => {
  const tables = fileKeys.map((key: string, index: number) => (
    <OneFile key={index}>
      <SingleFileTable
        database={database}
        setChange={setChange}
        id={key}
        perPage={perPage}
        firstImage={firstImage}
      />
    </OneFile>
  ));
  return <div>{tables}</div>;
};

export default FileDisplay;
