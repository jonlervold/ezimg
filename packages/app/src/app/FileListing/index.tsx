import { FC, useCallback, useEffect, useState, Fragment } from 'react';
import fetchFiles from '../../api/fetchFiles';
import updateFile from '../../api/updateFile';
import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../types/CompleteFileInfo';
import Card from './components/Card';
import FileDetails from './components/FileDetails';

const FileListing: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<CompleteFileInfo[]>([]);

  const fetch = useCallback(async () => {
    const { files } = await fetchFiles();
    setFiles(files);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const [startIndex, setStartIndex] = useState(0);

  const handleSaveEdits = async (
    previousFile: CompleteFileInfo,
    file: UpdatableFileInfo
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
                  <img
                    src={`http://localhost:3333/images/${file.fileName}.${file.extension}`}
                    alt={`${file.fileName}`}
                  />
                </Card>
                <Card>
                  <FileDetails
                    originalFileInfo={file}
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
