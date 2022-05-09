import { FC, Fragment } from 'react';
import Card from '../../components/styles/Card';
import useFetchRender from '../../hooks/useFetchRender';
import useFileModify from '../../hooks/useFileModify';
import useFileNavigation from '../../hooks/useFileNavigation';
import { serverUrl } from '../../serverUrl';
import FileDetails from './components/FileDetails';
import Navigation from './components/Navigation';
import Uploader from './components/Uploader';

const FileListing: FC = () => {
  const { isLoading, files, fetch } = useFetchRender();
  const { handleSaveEdits, handleDelete } = useFileModify(fetch);
  const { perPage, setPerPage, startIndex, setStartIndex } =
    useFileNavigation();

  return (
    <div>
      <Uploader fetch={fetch} />
      {isLoading ? (
        <Card>Loading...</Card>
      ) : (
        <div>
          {files.length > 0 ? (
            <div>
              <Card>
                <Navigation
                  perPage={perPage}
                  setPerPage={setPerPage}
                  itemTotal={files.length}
                  startIndex={startIndex}
                  setStartIndex={setStartIndex}
                />
              </Card>
              {files
                .sort((a, b) => {
                  if (a.msAdded > b.msAdded) return -1;
                  else return 1;
                })
                .slice(startIndex, startIndex + perPage)
                .map((file) => (
                  <Fragment key={file.msAdded}>
                    <Card>
                      <>
                        <img
                          src={`${serverUrl}/images/${file.fileName}.${file.extension}`}
                          alt={`${file.fileName}`}
                        />

                        <FileDetails
                          originalFileInfo={file}
                          onSave={async (fileUpdate) => {
                            await handleSaveEdits(file, fileUpdate);
                          }}
                          onDelete={handleDelete}
                        />
                      </>
                    </Card>
                  </Fragment>
                ))}
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
          ) : (
            <Card>
              No files currently uploaded. Add some files to get started!
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default FileListing;
