import { UpdatableFileInfo } from './../types/CompleteFileInfo';
import CompleteFileInfo from '../types/CompleteFileInfo';
import updateFile from '../api/updateFile';
import removeFile from '../api/removeFile';

const useFileModify = (fetch: () => Promise<void>) => {
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

  return { handleSaveEdits, handleDelete };
};

export default useFileModify;
