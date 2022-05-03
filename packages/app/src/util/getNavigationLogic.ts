const getNavigationLogic = (
  firstImage: number,
  perPage: number,
  itemTotal: number
) => {
  // disable back button if on first image
  let backDisable = false;
  if (firstImage === 0) {
    backDisable = true;
  }

  // set x - x second number not to exceed total images in db
  let highDisplay = 0;
  if (firstImage + perPage < itemTotal) {
    highDisplay = firstImage + perPage;
  } else {
    highDisplay = itemTotal;
  }

  // disable forward if no more left to go
  let forwardDisable = false;
  if (highDisplay === itemTotal) {
    forwardDisable = true;
  }

  // wording of image vs images etc
  let imageLine = `Images ${firstImage + 1} to ${highDisplay}`;
  if (perPage === 1) {
    imageLine = `Image ${firstImage + 1}`;
  }

  return { backDisable, highDisplay, forwardDisable, imageLine };
  //
};

export default getNavigationLogic;
