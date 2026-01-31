import { useEffect, useMemo, useState } from "react";
import { Superhero } from "../../../common/types/superhero";
import { Image, SelectImagesControl } from "../../../common/types/image";

export function useSelectImages(superhero?: Superhero): SelectImagesControl {
  const [images, setImages] = useState<Image[]>([]);
  const [selected, setSelected] = useState<Image[]>(images);

  const imageIds = useMemo(() => images.map((image) => image.id), [images]);
  const selectedIds = useMemo(
    () => selected.map((image) => image.id),
    [selected],
  );

  useEffect(() => {
    if (superhero) {
      setImages(superhero.images);
      setSelected(superhero.images);
    }
  }, [superhero]);

  const onSelected = (image: Image) => {
    if (!imageIds.includes(image.id)) return;
    if (selectedIds.includes(image.id)) return;
    setSelected([...selected, image]);
  };

  const onRemoved = (image: Image) => {
    if (!imageIds.includes(image.id)) return;
    if (!selectedIds.includes(image.id)) return;
    setSelected(selected.filter((item) => item.id !== image.id));
  };

  const onToggled = (image: Image) => {
    if (selectedIds.includes(image.id)) {
      return onRemoved(image);
    }
    onSelected(image);
  };

  return {
    imageIds,
    selectedIds,
    images,
    selected,
    onSelected,
    onRemoved,
    onToggled,
  };
}
