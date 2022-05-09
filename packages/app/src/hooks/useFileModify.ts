import { useState } from 'react';
import { UpdatableFileInfo } from './../types/CompleteFileInfo';
import CompleteFileInfo from '../types/CompleteFileInfo';
import updateFile from '../api/updateFile';
import removeFile from '../api/removeFile';
import getDateFromMs from '../util/getDateFromMs';

const useFileModify = (
  originalFileInfo: CompleteFileInfo,
  fetch: () => Promise<void>
) => {
  const handleSaveEdits = async (
    previousFile: CompleteFileInfo,
    file: UpdatableFileInfo
  ) => {
    // fileName is used as id
    // to change requires fileName from previousFile
    const id = previousFile.fileName;
    await updateFile(id, file.fileName, file.description);
    await fetch();
  };

  const handleDelete = async (fileName: string, extension: string) => {
    await removeFile(fileName, extension);
    await fetch();
  };

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
  };
};

export default useFileModify;
