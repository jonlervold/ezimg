const getNameAndExtension = (file: File) => {
  const filename = file.name;

  const lastInstanceOfPeriod = filename.lastIndexOf('.');
  const basename = filename.slice(0, lastInstanceOfPeriod);

  const extension = filename.slice(lastInstanceOfPeriod + 1);

  const fileInfo = { basename: basename, extension: extension };

  return fileInfo;
};

export default getNameAndExtension;
