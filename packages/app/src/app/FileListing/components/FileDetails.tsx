import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../../types/CompleteFileInfo';
import { FC, useState } from 'react';
import getDateFromMs from '../../../util/getDateFromMs';
import styled from 'styled-components';

type Props = {
  originalFileInfo: CompleteFileInfo;
  onSave: (value: UpdatableFileInfo) => Promise<void>;
  onDelete: (fileName: string, extension: string) => Promise<void>;
};

const DetailsText = styled.div`
  overflow-wrap: anywhere;
  margin: 0.75rem;
  line-height: 1.5;
  .filename {
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }
  .filename-input {
    font-size: 2rem;
    width: 60%;
    text-align: center;
  }

  .url {
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.25rem;
  }
  .url:hover {
    background-color: #ce9ed6;
    color: white;
    cursor: copy;
  }
  .description-input {
    text-align: center;
  }
  .description {
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    line-height: 1;
  }
`;

const FileDetails: FC<Props> = ({ originalFileInfo, onSave, onDelete }) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [deleteModeEnabled, setDeleteModeEnabled] = useState(false);
  const [updatedFields, setUpdatedFields] = useState<
    UpdatableFileInfo | undefined
  >();
  const currentDisplayInfo = updatedFields ?? originalFileInfo;

  const onChange = (key: string, value: string) => {
    setUpdatedFields({
      ...currentDisplayInfo,
      [key]: value,
    });
  };

  const dateAdded = getDateFromMs(originalFileInfo.msAdded);

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
              `http://localhost:3333/images/${originalFileInfo.fileName}.${originalFileInfo.extension}`
            );
          }}
        >
          http://localhost:3333/images/{originalFileInfo.fileName}.
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
                    await onSave(currentDisplayInfo);
                    //
                    setUpdatedFields(undefined);
                    setEditModeEnabled(false);
                  }}
                >
                  ✔️
                </span>

                <span
                  style={{ cursor: 'pointer' }}
                  role="img"
                  aria-label="Discard Changes"
                  onClick={() => setEditModeEnabled(false)}
                >
                  ❌
                </span>
              </>
            ) : (
              <span
                role="img"
                style={{ cursor: 'pointer' }}
                aria-label="Edit"
                onClick={() => (
                  setEditModeEnabled(true),
                  setDeleteModeEnabled(false),
                  setUpdatedFields(originalFileInfo)
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
                    await onDelete(
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
                  ❌
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
    </div>
  );
};

export default FileDetails;
