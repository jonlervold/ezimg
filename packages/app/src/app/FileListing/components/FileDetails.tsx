import FileListingDetails, {
  FileListingDetailsUpdate,
} from '../../../types/FileListingDetails';
import { FC, useState } from 'react';

type Props = {
  details: FileListingDetails;
  onSave: (value: FileListingDetailsUpdate) => Promise<void>;
};

const FileDetails: FC<Props> = ({ details, onSave }) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [detailsEdits, setDetailsEdits] = useState<
    FileListingDetailsUpdate | undefined
  >();
  const formDisplayDetails = detailsEdits ?? details;

  const onChange = (key: string, value: string) => {
    setDetailsEdits({
      ...formDisplayDetails,
      [key]: value,
    });
  };
  return (
    <>
      <div>
        File:{' '}
        {editModeEnabled ? (
          <input
            value={formDisplayDetails.fileName}
            onChange={(e) => {
              onChange('fileName', e.target.value);
            }}
          />
        ) : (
          <>{formDisplayDetails.fileName}</>
        )}
        .{details.extension}
      </div>

      <div>
        Description:{' '}
        {editModeEnabled ? (
          <input
            value={formDisplayDetails.description}
            onChange={(e) => {
              onChange('description', e.target.value);
            }}
          />
        ) : (
          <>{details.description}</>
        )}
      </div>

      <div>Date Added: {details.msAdded}</div>
      <div>
        URL: http://localhost:3333/images/{details.fileName}.{details.extension}
      </div>
      <div>
        {editModeEnabled ? (
          <>
            <span
              role="img"
              aria-label="Submit Changes"
              onClick={async () => {
                await onSave(formDisplayDetails);
                //
                setDetailsEdits(undefined);
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
            onClick={() => (setEditModeEnabled(true), setDetailsEdits(details))}
          >
            ✏️
          </span>
        )}
      </div>
    </>
  );
};

export default FileDetails;

// import FileListingDetails, {
//   FileListingDetailsUpdate,
// } from '../../../types/FileListingDetails';
// import { FC, useState } from 'react';

// type Props = {
//   details: FileListingDetails;
//   onSave: (value: FileListingDetailsUpdate) => Promise<void>;
// };

// const FileDetails: FC<Props> = ({
//   details: { msAdded, extension, ...detailsForUpdate },
//   onSave,
// }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [detailsEdits, setDetailsEdits] = useState<
//     FileListingDetailsUpdate | undefined
//   >();
//   const hasUserEdits = !!detailsEdits;
//   const formDisplayDetails = detailsEdits ?? detailsForUpdate;

//   const onChange = (key: string, value: string) => {
//     setDetailsEdits({
//       ...formDisplayDetails,
//       [key]: value,
//     });
//   };
//   return (
//     <>
//       <div>
//         File Name:
//         {editMode ? (
//           <input
//             value={formDisplayDetails.fileName}
//             onChange={(e) => {
//               onChange('fileName', e.target.value);
//             }}
//           />
//         ) : (
//           'WTF'
//         )}
//         .{extension}
//       </div>
//       <div>
//         Description :{' '}
//         <input
//           value={formDisplayDetails.description}
//           onChange={(e) => {
//             onChange('description', e.target.value);
//           }}
//         />
//       </div>
//       <div>Date Added: {msAdded}</div>
//       <div>
//         <button onClick={() => setEditMode(true)}>Edit</button>
//         <button
//           onClick={async () => {
//             await onSave(formDisplayDetails);
//             //
//             setDetailsEdits(undefined);
//           }}
//           disabled={!hasUserEdits}
//         >
//           Submit Changes
//         </button>
//         <button>Discard Changes</button>
//       </div>
//     </>
//   );
// };

// export default FileDetails;
