export function areSameFiles(file1: File, file2: File) {
  if (
    file1.name === file2.name &&
    file1.size === file2.size &&
    file1.lastModified === file2.lastModified
  ) {
    return true;
  }
  return false;
}

export function includesFile(files: File[], file: File) {
  for (const currentFile of files) {
    if (areSameFiles(currentFile, file)) {
      return true;
    }
  }
  return false;
}
