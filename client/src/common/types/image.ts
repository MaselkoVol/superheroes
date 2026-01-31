export type ImageFile = {
  file: File;
  url: string;
};

export type Image = {
  id: string;
  path: string;
};

export type CreateImagesControl = {
  imageFiles: ImageFile[];
  onSelected: (e: FileList | null) => void;
  onRemoved: (imageFile: ImageFile) => void;
};

export type SelectImagesControl = {
  images: Image[];
  selected: Image[];
  imageIds: string[];
  selectedIds: string[];
  onSelected: (image: Image) => void;
  onRemoved: (image: Image) => void;
  onToggled: (image: Image) => void;
};
