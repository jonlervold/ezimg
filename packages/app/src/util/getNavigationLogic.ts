const getNavigationLogic = (
  startIndex: number,
  perPage: number,
  itemTotal: number
) => {
  // disable back button if on first image
  let backDisable = false;
  if (startIndex === 0) {
    backDisable = true;
  }

  // set x - x second number not to exceed total images in db
  let highDisplay = 0;
  if (startIndex + perPage < itemTotal) {
    highDisplay = startIndex + perPage;
  } else {
    highDisplay = itemTotal;
  }

  // disable forward if no more left to go
  let forwardDisable = false;
  if (highDisplay === itemTotal) {
    forwardDisable = true;
  }

  // wording of image vs images etc
  let imageLine = `Images ${startIndex + 1} to ${highDisplay}`;
  if (perPage === 1) {
    imageLine = `Image ${startIndex + 1}`;
  }

  return { backDisable, highDisplay, forwardDisable, imageLine };
  //
};

export default getNavigationLogic;
