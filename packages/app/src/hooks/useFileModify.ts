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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      setErrorMessage(undefined);
      const data = await fetchFiles();

      for (const storedFile of data.files) {
        // prevents overwrite unless the timestamp matches, meaning it is the same file
        if (
          file.fileName === storedFile.fileName &&
          previousFile.msAdded !== storedFile.msAdded
        ) {
          setIsLoading(false);
          throw new Error(`"${file.fileName}" already used as filename`);
        }
      }

      const id = previousFile.fileName;
      await updateFile(id, file.fileName, file.description);
      await fetch();
      setUpdatedFields(undefined);
      setIsLoading(false);
      setEditModeEnabled(false);
    } catch (e) {
      if (e instanceof Error) {
        setIsLoading(false);
        setErrorMessage(e.message);
      }
    }
  };

  const handleDelete = async (fileName: string, extension: string) => {
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      await removeFile(fileName, extension);
      await fetch();
      setIsLoading(false);
      setDeleteModeEnabled(false);
    } catch (e) {
      if (e instanceof Error) {
        setIsLoading(false);
        setErrorMessage(e.message);
      }
    }
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
    isLoading,
  };
};

export default useFileModify;
