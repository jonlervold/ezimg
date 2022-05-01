const getNameAndExtension = (file: File) => {
  const filename = file.name;

  const lastInstanceOfPeriod = filename.lastIndexOf('.');
  const basename = filename.slice(0, lastInstanceOfPeriod).toLowerCase();

  const extension = filename.slice(lastInstanceOfPeriod + 1).toLowerCase();

  const fileInfo = { basename: basename, extension: extension };

  return fileInfo;
};

export default getNameAndExtension;
