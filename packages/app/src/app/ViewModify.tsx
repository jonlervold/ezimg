import { FC, SetStateAction, useState } from 'react';
import FileDisplay from '../components/FileDisplay';
import Navigation from '../components/Navigation';
import useViewModify from '../hooks/useViewModify';
import { database } from '../types/Database';

type Props = {
  database: database;
  setChange: React.Dispatch<SetStateAction<string>>;
};

const ViewModify: FC<Props> = ({ database, setChange }) => {
  const { perPage, setPerPage, firstImage, setFirstImage } = useViewModify();

  // HOW TO ORDER THE KEYS BY msAdded PROPERTY?
  const fileKeys: Array<string> = Object.keys(database).reverse();
  const currentKeys = fileKeys.slice(firstImage, firstImage + perPage);

  return (
    <div>
      <Navigation
        perPage={perPage}
        setPerPage={setPerPage}
        itemTotal={fileKeys.length}
        firstImage={firstImage}
        setFirstImage={setFirstImage}
      />
      <FileDisplay
        database={database}
        fileKeys={currentKeys}
        setChange={setChange}
      />
      <Navigation
        perPage={perPage}
        setPerPage={setPerPage}
        itemTotal={fileKeys.length}
        firstImage={firstImage}
        setFirstImage={setFirstImage}
      />
    </div>
  );
};

export default ViewModify;
