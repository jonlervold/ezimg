export interface database {
  [index: string]: {
    fileName: string;
    extension: string;
    description: string;
    dateAdded: string;
    msAdded: number;
  };
}
