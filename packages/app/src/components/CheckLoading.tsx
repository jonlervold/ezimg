import { FC, SetStateAction } from 'react';
import ViewModify from '../app/ViewModify';
import { database } from '../types/Database';
import ContentBox from './ContentBox';

type Props = {
  isLoading: boolean;
  database: database;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const CheckLoading: FC<Props> = ({ isLoading, database, setChange }) => {
  return (
    <>
      {isLoading && <ContentBox>Requesting Images</ContentBox>}
      {!isLoading && Object.keys(database).length > 0 && (
        <ViewModify database={database} setChange={setChange} />
      )}
      {!isLoading && Object.keys(database).length === 0 && (
        <p>Database currently empty! Add an image to display content.</p>
      )}
    </>
  );
};

export default CheckLoading;
