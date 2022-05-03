import { useState } from 'react';

const useViewModify = () => {
  const [perPage, setPerPage] = useState(5);
  const [firstImage, setFirstImage] = useState(0);

  // if change perPage, set firstImage to nearest multiple below it
  if (firstImage % perPage !== 0) {
    setFirstImage(Math.floor(firstImage / perPage) * perPage);
  }

  return { perPage, setPerPage, firstImage, setFirstImage };
};

export default useViewModify;
