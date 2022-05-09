import { useState } from 'react';
import { UpdatableFileInfo } from './../types/CompleteFileInfo';
import CompleteFileInfo from '../types/CompleteFileInfo';
import updateFile from '../api/updateFile';
import removeFile from '../api/removeFile';
import getDateFromMs from '../util/getDateFromMs';
import fetchFiles from '../api/fetchFiles';

const useFileModify = (
  originalFileInfo: CompleteFileInfo,
  fetch: () => Promise<void>
) => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [deleteModeEnabled, setDeleteModeEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
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

  const handleSaveEdits = async (
    previousFile: CompleteFileInfo,
    file: UpdatableFileInfo
  ) => {
    try {
      setErrorMessage(undefined);
      const data = await fetchFiles();

      for (const storedFile of data.files) {
        // prevents overwrite unless the timestamp matches, meaning it is the same file
        if (
          file.fileName === storedFile.fileName &&
          previousFile.msAdded !== storedFile.msAdded
        ) {
          throw new Error(`"${file.fileName}" already used as filename`);
        }
      }

      const id = previousFile.fileName;
      await updateFile(id, file.fileName, file.description);
      await fetch();
      setUpdatedFields(undefined);
      setEditModeEnabled(false);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  };

  const handleDelete = async (fileName: string, extension: string) => {
    await removeFile(fileName, extension);
    await fetch();
  };

  return {
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
  };
};

export default useFileModify;
