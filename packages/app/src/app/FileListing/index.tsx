import { FC, useCallback, useEffect, useState, Fragment } from 'react';
import fetchFiles from '../../api/fetchFiles';
import removeFile from '../../api/removeFile';
import updateFile from '../../api/updateFile';
import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../types/CompleteFileInfo';
import Card from './components/Card';
import FileDetails from './components/FileDetails';

type Props = {
  fetch: () => Promise<void>;
  isLoading: boolean;
  files: CompleteFileInfo[];
};

const FileListing: FC<Props> = ({ fetch, isLoading, files }) => {
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

  const handleDelete = async (fileName: string, extension: string) => {
    await removeFile(fileName, extension);
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
                    onDelete={handleDelete}
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
