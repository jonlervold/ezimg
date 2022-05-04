import { FC, SetStateAction } from 'react';
import styled from 'styled-components';
import getNavigationLogic from '../util/getNavigationLogic';
import BackForward from './BackForward';
import ShowPerPage from './ShowPerPage';
import ContentBox from './ContentBox';

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
    <ContentBox>
      <ShowPerPage perPage={perPage} setPerPage={setPerPage} />
      <BackForward
        itemTotal={itemTotal}
        perPage={perPage}
        firstImage={firstImage}
        setFirstImage={setFirstImage}
      />
    </ContentBox>
  );
};

export default Navigation;
