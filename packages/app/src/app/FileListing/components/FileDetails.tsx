import FileListingDetails, {
  FileListingDetailsUpdate,
} from 'packages/app/src/types/FileListingDetails';
import { FC, useState } from 'react';

type Props = {
  details: FileListingDetails;
  onSave: (value: FileListingDetailsUpdate) => Promise<void>;
};

const FileDetails: FC<Props> = ({
  details: { msAdded, ...detailsForUpdate },
  onSave,
}) => {
  const [detailsEdits, setDetailsEdits] = useState<
    FileListingDetailsUpdate | undefined
  >();
  const hasUserEdits = !!detailsEdits;
  const formDisplayDetails = detailsEdits ?? detailsForUpdate;

  const onChange = (key: string, value: string) => {
    setDetailsEdits({
      ...formDisplayDetails,
      [key]: value,
    });
  };
  return (
    <>
      <div>
        name ={' '}
        <input
          value={formDisplayDetails.fileName}
          onChange={(e) => {
            onChange('fileName', e.target.value);
          }}
        />
      </div>
      <div>
        extension ={' '}
        <input
          value={formDisplayDetails.extension}
          onChange={(e) => {
            onChange('extension', e.target.value);
          }}
        />
      </div>
      <div>
        description ={' '}
        <input
          value={formDisplayDetails.description}
          onChange={(e) => {
            onChange('description', e.target.value);
          }}
        />
      </div>
      <div>date = {msAdded}</div>
      <div>
        <button
          onClick={async () => {
            await onSave(formDisplayDetails);
            //
            setDetailsEdits(undefined);
          }}
          disabled={!hasUserEdits}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default FileDetails;
