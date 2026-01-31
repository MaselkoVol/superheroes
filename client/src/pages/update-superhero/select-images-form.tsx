import { Grid, repeat } from "@adobe/react-spectrum";
import { SelectImagesControl } from "../../common/types/image";
import { getImageUrl } from "../../utils/url";
import "./deselectable-image.css";

export type SelectImagesFormParams = {
  control: SelectImagesControl;
};

export function SelectImagesForm({ control }: SelectImagesFormParams) {
  return (
    <Grid columns={repeat("auto-fit", "size-1700")} gap="size-100">
      {control.images.map((image) => (
        <img
          onClick={() => control.onToggled(image)}
          className={`deselectable-image ${control.selectedIds.includes(image.id) ? "" : "inactive"}`}
          src={getImageUrl(image.path)}
          key={image.id}
        />
      ))}
    </Grid>
  );
}
