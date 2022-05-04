import { FC, SetStateAction } from 'react';
import styled from 'styled-components';
import getNavigationLogic from '../util/getNavigationLogic';

type Props = {
  itemTotal: number;
  firstImage: number;
  perPage: number;
  setFirstImage: React.Dispatch<SetStateAction<number>>;
};

const Container = styled.div`
  padding: 0.6rem;
`;

const BackForward: FC<Props> = ({
  itemTotal,
  perPage,
  firstImage,
  setFirstImage,
}) => {
  const navigationLogic = getNavigationLogic(firstImage, perPage, itemTotal);
  return (
    <Container>
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
    </Container>
  );
};

export default BackForward;
