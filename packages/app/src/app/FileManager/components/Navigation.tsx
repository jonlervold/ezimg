import getNavigationLogic from '../../../util/getNavigationLogic';
import { FC, SetStateAction } from 'react';

type Props = {
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
  itemTotal: number;
  startIndex: number;
  setStartIndex: React.Dispatch<SetStateAction<number>>;
};

const Navigation: FC<Props> = ({
  perPage,
  setPerPage,
  itemTotal,
  startIndex,
  setStartIndex,
}) => {
  const navigationLogic = getNavigationLogic(startIndex, perPage, itemTotal);
  return (
    <div>
      <div className="show-per-page">
        <div>Show Per Page: {perPage}</div>
        <div>
          <button onClick={() => setPerPage(1)}>1</button>
          <button onClick={() => setPerPage(5)}>5</button>
          <button onClick={() => setPerPage(10)}>10</button>
          <button onClick={() => setPerPage(20)}>20</button>
        </div>
      </div>
      <div>
        {navigationLogic.imageLine} of {itemTotal}
      </div>
      <div>
        <button
          disabled={navigationLogic.backDisable}
          onClick={() => setStartIndex(startIndex - perPage)}
        >
          Back
        </button>
        <button
          disabled={navigationLogic.forwardDisable}
          onClick={() => setStartIndex(startIndex + perPage)}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default Navigation;
