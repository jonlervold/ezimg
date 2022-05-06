import CompleteFileInfo, {
  UpdatableFileInfo,
} from '../../../types/CompleteFileInfo';
import { FC, useState } from 'react';

type Props = {
  originalFileInfo: CompleteFileInfo;
  onSave: (value: UpdatableFileInfo) => Promise<void>;
};

const FileDetails: FC<Props> = ({ originalFileInfo, onSave }) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
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
  return (
    <>
      <div>
        File:{' '}
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

      <div>
        Description:{' '}
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

      <div>Date Added: {originalFileInfo.msAdded}</div>
      <div>
        URL: http://localhost:3333/images/{originalFileInfo.fileName}.
        {originalFileInfo.extension}
      </div>
      <div>
        {editModeEnabled ? (
          <>
            <span
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
            aria-label="Edit"
            onClick={() => (
              setEditModeEnabled(true), setUpdatedFields(originalFileInfo)
            )}
          >
            ✏️
          </span>
        )}
      </div>
    </>
  );
};

export default FileDetails;
