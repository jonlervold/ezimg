export type UpdatableFileInfo = {
  fileName: string;
  description: string;
};

type CompleteFileInfo = UpdatableFileInfo & {
  msAdded: number;
  extension: string;
};

export default CompleteFileInfo;
