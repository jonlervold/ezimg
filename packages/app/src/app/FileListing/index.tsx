import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import fetchFiles from '../../api/fetchFiles';
import removeFile from '../../api/removeFile';
import updateFile from '../../api/updateFile';
import useFileNavigation from '../../hooks/useFileNavigation';
import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../types/CompleteFileInfo';
import Card from './components/Card';
import FileDetails from './components/FileDetails';
import Navigation from './components/Navigation';
import Uploader from './components/Uploader';

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

  const { perPage, setPerPage, startIndex, setStartIndex } =
    useFileNavigation();

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
      <Uploader fetch={fetch} />
      <Card>
        <Navigation
          perPage={perPage}
          setPerPage={setPerPage}
          itemTotal={files.length}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
        />
      </Card>

      {isLoading ? (
        <Card>Loading...</Card>
      ) : (
        <div>
          {files
            .sort((a, b) => {
              if (a.msAdded > b.msAdded) return -1;
              else return 1;
            })
            .slice(startIndex, startIndex + perPage)
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
      <Card>
        <Navigation
          perPage={perPage}
          setPerPage={setPerPage}
          itemTotal={files.length}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
        />
      </Card>
    </div>
  );
};

export default FileListing;
