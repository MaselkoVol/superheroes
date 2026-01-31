import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getSuperhero } from "../../../common/api/get-superhero";
import { updateSuperhero } from "../../../common/api/update-superhero";
import { useCreateImages } from "../../../common/hooks/use-create-images";
import { useSuperheroInfo } from "../../../common/hooks/use-superhero-info";
import { useSuperpowers } from "../../../common/hooks/use-superpowers";
import { routes } from "../../../common/routes";
import { useSelectImages } from "./use-select-images";
import { updateSuperheroPayload } from "../../../common/types/superhero";

export function useUpdateSuperhero() {
  const { id } = useParams();
  const {
    data: superhero,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!),
    enabled: !!id,
  });

  const [linkBack, setLinkBack] = useState(routes.goHome());

  useEffect(() => {
    if (superhero) {
      setLinkBack(routes.getSuperhero(superhero.id));
    }
  }, [superhero]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitFailed, setIsSubmitFailed] = useState(false);

  const superpowers = useSuperpowers(superhero);
  const newImages = useCreateImages();
  const selectedImages = useSelectImages(superhero);
  const info = useSuperheroInfo(isSubmitFailed, superhero);

  const mutation = useMutation({
    mutationFn: updateSuperhero,
    onSuccess: (superhero) => {
      queryClient.invalidateQueries({ queryKey: ["update-superhero"] });
      if (!superhero) return;
      navigate(routes.getSuperhero(superhero.id));
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!superhero) return;

    const isValid = info.validate();
    if (!isValid) {
      setIsSubmitFailed(true);
      return; // Stop execution if invalid
    }

    const payload: updateSuperheroPayload = {
      id: superhero.id,
      nickname: info.data.nickname,
      realName: info.data.realName,
      originDescription: info.data.originDescription,
      catchPhrase: info.data.catchPhrase,
      newImages: newImages.imageFiles.map((item) => item.file),
      imageIds: selectedImages.selected.map((image) => image.id),
      superpowerIds: superpowers.selected.map((item) => item.id),
      newSuperpowers: superpowers.newSuperpowers,
    };

    mutation.mutate(payload);
  };

  return {
    superpowers,
    newImages,
    selectedImages,
    info,
    onSubmit,
    isLoading: mutation.isPending || isLoading,
    error: mutation.error || error,
    linkBack,
  };
}
