import { FC, SetStateAction } from 'react';
import getNavigationLogic from '../util/getNavigationLogic';

type Props = {
  itemTotal: number;
  firstImage: number;
  perPage: number;
  setFirstImage: React.Dispatch<SetStateAction<number>>;
};

const BackForward: FC<Props> = ({
  itemTotal,
  perPage,
  firstImage,
  setFirstImage,
}) => {
  const navigationLogic = getNavigationLogic(firstImage, perPage, itemTotal);
  return (
    <div>
      <div>
        {navigationLogic.imageLine} of {itemTotal}
      </div>
      <div>
        <button
          disabled={navigationLogic.backDisable}
          onClick={() => setFirstImage(firstImage - perPage)}
        >
          Back
        </button>
        <button
          disabled={navigationLogic.forwardDisable}
          onClick={() => setFirstImage(firstImage + perPage)}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default BackForward;
