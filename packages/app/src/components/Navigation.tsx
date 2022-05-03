import { FC, SetStateAction } from 'react';
import getNavigationLogic from '../util/getNavigationLogic';
import BackForward from './BackForward';
import ShowPerPage from './ShowPerPage';

type Props = {
  perPage: number;
  setPerPage: React.Dispatch<SetStateAction<number>>;
  itemTotal: number;
  firstImage: number;
  setFirstImage: React.Dispatch<SetStateAction<number>>;
};

const Navigation: FC<Props> = ({
  perPage,
  setPerPage,
  itemTotal,
  firstImage,
  setFirstImage,
}) => {
  return (
    <div>
      <BackForward
        itemTotal={itemTotal}
        perPage={perPage}
        firstImage={firstImage}
        setFirstImage={setFirstImage}
      />
      <ShowPerPage perPage={perPage} setPerPage={setPerPage} />
    </div>
  );
};

export default Navigation;
