import "./removable-image.css";
import { Button, FileTrigger, Grid, repeat } from "@adobe/react-spectrum";
import { CreateImagesControl } from "../common/types/image";

export type ImagesFormProps = {
  images: CreateImagesControl;
};

export function ImagesForm({ images }: ImagesFormProps) {
  return (
    <>
      <FileTrigger
        acceptedFileTypes={["image/*"]}
        allowsMultiple
        onSelect={images.onSelected}
      >
        <Button variant="primary">Select Images</Button>
      </FileTrigger>

      <Grid columns={repeat("auto-fit", "size-1700")} gap="size-100">
        {images.imageFiles.map((imageFile) => (
          <img
            onClick={() => images.onRemoved(imageFile)}
            className="removable-image"
            src={imageFile.url}
            key={imageFile.url}
          />
        ))}
      </Grid>
    </>
  );
}
