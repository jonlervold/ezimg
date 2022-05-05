export type FileListingDetailsUpdate = {
  fileName: string;
  description: string;
};

type FileListingDetails = FileListingDetailsUpdate & {
  msAdded: number;
  extension: string;
};

export default FileListingDetails;
