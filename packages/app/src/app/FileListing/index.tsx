import { FC, useCallback, useEffect, useState, Fragment } from 'react';
import fetchFiles from '../../api/fetchFiles';
import updateFile from '../../api/updateFile';
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

  const handleSaveEdits = async (
    previousFile: FileListingDetails,
    file: FileListingDetailsUpdate
  ) => {
    // fileName is used as id
    // to change requires fileName from previousFile
    const id = previousFile.fileName;
    await updateFile(id, file.fileName, file.description);
    await fetch();
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {files
            .sort((a, b) => {
              if (a.msAdded > b.msAdded) return -1;
              else return 1;
            })
            .slice(startIndex)
            .map((file) => (
              <Fragment key={file.msAdded}>
                <Card>
                  {/* <img
                    src={`http://localhost:3333/images/${file.fileName}.${file.extension}`}
                    alt={`${file.fileName}`}
                  /> */}
                  <>
                    {file.fileName}.{file.extension}
                  </>
                </Card>
                <Card>
                  <FileDetails
                    details={file}
                    onSave={async (fileUpdate) => {
                      await handleSaveEdits(file, fileUpdate);
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
