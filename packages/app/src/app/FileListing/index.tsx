import {
  FC,
  ReactChild,
  useCallback,
  useEffect,
  useState,
  Fragment,
} from 'react';
import fetchFiles from '../../api/fetchFiles';
import renameFile from '../../api/renameFile';
import FileListingDetails, {
  FileListingDetailsUpdate,
} from '../../types/FileListingDetails';
import Card from './components/Card';
import FileDetails from './components/FileDetails';

const FileListing: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [files, setFiles] = useState<FileListingDetails[]>([]);

  const fetch = useCallback(async () => {
    const { files } = await fetchFiles();
    setFiles(files);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleSave = async (
    previousFile: FileListingDetails,
    file: FileListingDetailsUpdate
  ) => {
    //we are using fileName as Id. But it can also change
    //So we need to get the fileName from previousFile
    const id = previousFile.fileName;
    await renameFile(id, file.fileName, file.extension);
    await fetch();
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {files
            .slice(startIndex)
            .sort((a, b) => {
              if (a.msAdded > b.msAdded) return -1;
              else return 1;
            })
            .map((file) => (
              <Fragment key={file.msAdded}>
                <Card>{file.fileName}</Card>
                <Card>
                  <FileDetails
                    details={file}
                    onSave={async (fileUpdate) => {
                      await handleSave(file, fileUpdate);
                    }}
                  />
                </Card>
              </Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

export default FileListing;
