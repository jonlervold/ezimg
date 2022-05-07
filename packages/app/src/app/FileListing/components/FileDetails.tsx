import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../../types/CompleteFileInfo';
import { FC, useState } from 'react';
import getDateFromMs from '../../../util/getDateFromMs';

type Props = {
  originalFileInfo: CompleteFileInfo;
  onSave: (value: UpdatableFileInfo) => Promise<void>;
  onDelete: (fileName: string, extension: string) => Promise<void>;
};

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
    <>
      <div>
        {editModeEnabled ? (
          <input
            value={currentDisplayInfo.fileName}
            onChange={(e) => {
              onChange('fileName', e.target.value);
            }}
          />
        ) : (
          <>{currentDisplayInfo.fileName}</>
        )}
        .{originalFileInfo.extension}
      </div>

      <div>{dateAdded}</div>

      <div>
        {editModeEnabled ? (
          <input
            value={currentDisplayInfo.description}
            onChange={(e) => {
              onChange('description', e.target.value);
            }}
          />
        ) : (
          <>{originalFileInfo.description}</>
        )}
      </div>

      <div>
        http://localhost:3333/images/{originalFileInfo.fileName}.
        {originalFileInfo.extension}
      </div>

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
    </>
  );
};

export default FileDetails;
