import { FC, Fragment } from 'react';
import Card from '../../components/styles/Card';
import useFetchRender from '../../hooks/useFetchRender';
import useFileNavigation from '../../hooks/useFileNavigation';
import { serverUrl } from '../../serverUrl';
import FileDetails from './components/FileDetails';
import Navigation from './components/Navigation';
import Uploader from './components/Uploader';

const FileListing: FC = () => {
  const { isLoading, files, fetch, errorMessage } = useFetchRender();
  const { perPage, setPerPage, startIndex, setStartIndex } =
    useFileNavigation();

  // let noFilesDisplay =
  //   'No files currently uploaded. Add some files to get started!';
  // if (errorMessage !== undefined) {
  //   noFilesDisplay = errorMessage;
  // }

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

                        <FileDetails originalFileInfo={file} fetch={fetch} />
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
          ) : errorMessage === undefined ? (
            <Card>
              No files currently uploaded. Add some files to get started!
            </Card>
          ) : (
            <Card>
              <div className="error">{errorMessage}</div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default FileListing;
