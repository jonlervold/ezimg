import { useState } from 'react';

const useFileNavigation = () => {
  const [perPage, setPerPage] = useState(5);
  const [startIndex, setStartIndex] = useState(0);

  // if change perPage, set firstImage to nearest multiple below it
  if (startIndex % perPage !== 0) {
    setStartIndex(Math.floor(startIndex / perPage) * perPage);
  }

  return { perPage, setPerPage, startIndex, setStartIndex };
};

export default useFileNavigation;
