import * as FileSystem from "expo-file-system";

export const getFileInfo = (uri: string) => {
  const file = new FileSystem.File(uri);
  return { ...file.info(), size: file.size ?? 0 };
};
