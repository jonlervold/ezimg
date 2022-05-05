export type FileListingDetailsUpdate = {
  fileName: string;
  extension: string;
  description: string;
};

type FileListingDetails = FileListingDetailsUpdate & {
  msAdded: number;
};

export default FileListingDetails;
