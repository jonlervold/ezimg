import { FC, useCallback, useEffect, useState, Fragment } from 'react';
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
    await renameFile(id, file.fileName, file.description);
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
