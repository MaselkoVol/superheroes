import { useEffect, useMemo, useState } from "react";
import { CreateImagesControl, ImageFile } from "../types/image";
import { areSameFiles, includesFile } from "../../utils/files";

export function useCreateImages(): CreateImagesControl {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const files = useMemo(
    () => imageFiles.map((item) => item.file),
    [imageFiles],
  );

  // clean up the memory if the component unmounts
  useEffect(() => {
    return () => {
      imageFiles.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  const onSelected = (e: FileList | null) => {
    if (!e) return;
    const newFiles = Array.from(e);

    const filtered = newFiles.filter((file) => !includesFile(files, file));
    const newImageFiles: ImageFile[] = filtered.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImageFiles([...imageFiles, ...newImageFiles]);
  };

  const onRemoved = (imageFile: ImageFile) => {
    URL.revokeObjectURL(imageFile.url);
    const filtered = imageFiles.filter(
      (item) => !areSameFiles(item.file, imageFile.file),
    );
    setImageFiles(filtered);
  };

  return {
    imageFiles,
    onSelected,
    onRemoved,
  };
}
