import CompleteFileInfo from '../../../types/CompleteFileInfo';
import { FC } from 'react';
import DetailsText from './styles/DetailsText';
import useFileModify from '../../../hooks/useFileModify';
import { serverUrl } from '../../../serverUrl';

type Props = {
  originalFileInfo: CompleteFileInfo;
  fetch: () => Promise<void>;
};

const FileDetails: FC<Props> = ({ originalFileInfo, fetch }) => {
  const {
    handleSaveEdits,
    handleDelete,
    editModeEnabled,
    setEditModeEnabled,
    deleteModeEnabled,
    setDeleteModeEnabled,
    setUpdatedFields,
    currentDisplayInfo,
    onChange,
    dateAdded,
    errorMessage,
    setErrorMessage,
  } = useFileModify(originalFileInfo, fetch);

  return (
    <div>
      <DetailsText>
        <div className="filename">
          {editModeEnabled ? (
            <>
              <input
                className="filename-input"
                maxLength={200}
                value={currentDisplayInfo.fileName}
                onChange={(e) => {
                  onChange('fileName', e.target.value);
                }}
              />{' '}
            </>
          ) : (
            <>{currentDisplayInfo.fileName}</>
          )}
          .{originalFileInfo.extension}
        </div>

        <div
          className="url"
          onClick={() => {
            navigator.clipboard.writeText(
              `${serverUrl}/images/${originalFileInfo.fileName}.${originalFileInfo.extension}`
            );
          }}
        >
          {serverUrl}/images/{originalFileInfo.fileName}.
          {originalFileInfo.extension}
        </div>

        <div>Uploaded {dateAdded}</div>

        <div>
          {editModeEnabled ? (
            <input
              className="description-input"
              maxLength={1000}
              value={currentDisplayInfo.description}
              onChange={(e) => {
                onChange('description', e.target.value);
              }}
            />
          ) : (
            <div className="description">{originalFileInfo.description}</div>
          )}
        </div>
      </DetailsText>

      <div>
        {!deleteModeEnabled && (
          <span>
            {editModeEnabled ? (
              <>
                <span
                  style={{ cursor: 'default' }}
                  role="img"
                  aria-label="Are You Sure?"
                >
                  💾❔ —{' '}
                </span>
                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Submit Changes"
                  onClick={async () => {
                    await handleSaveEdits(originalFileInfo, currentDisplayInfo);
                  }}
                >
                  ✔️
                </span>

                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Discard Changes"
                  onClick={() => (
                    setEditModeEnabled(false),
                    setUpdatedFields(originalFileInfo)
                  )}
                >
                  ✖️
                </span>
              </>
            ) : (
              <span
                role="img"
                style={{ cursor: 'pointer' }}
                aria-label="Edit"
                onClick={() => (
                  setEditModeEnabled(true), setDeleteModeEnabled(false)
                )}
              >
                ✏️
              </span>
            )}
          </span>
        )}

        {!editModeEnabled && (
          <span>
            {deleteModeEnabled ? (
              <>
                <span
                  style={{ cursor: 'default' }}
                  role="img"
                  aria-label="Are You Sure?"
                >
                  🗑️❔ —{' '}
                </span>
                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Confirm Delete"
                  onClick={async () => {
                    await handleDelete(
                      originalFileInfo.fileName,
                      originalFileInfo.extension
                    );
                    setDeleteModeEnabled(false);
                  }}
                >
                  ✔️
                </span>

                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Don't Delete"
                  onClick={() => setDeleteModeEnabled(false)}
                >
                  ✖️
                </span>
              </>
            ) : (
              <span
                style={{ cursor: 'pointer' }}
                role="img"
                aria-label="Edit"
                onClick={() => (
                  setDeleteModeEnabled(true), setEditModeEnabled(false)
                )}
              >
                🗑️
              </span>
            )}
          </span>
        )}
      </div>
      <div className="error">
        {errorMessage}
        {errorMessage !== undefined && (
          <span>
            {' '}
            <span
              style={{ cursor: 'pointer' }}
              role="img"
              aria-label="Close Error"
              onClick={() => setErrorMessage(undefined)}
            >
              ❌
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
