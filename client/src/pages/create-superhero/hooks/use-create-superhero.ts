import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { createSuperhero } from "../../../common/api/create-superhero";
import { routes } from "../../../common/routes";
import { useCreateImages } from "../../../common/hooks/use-create-images";
import { useSuperpowers } from "../../../common/hooks/use-superpowers";
import { useSuperheroInfo } from "../../../common/hooks/use-superhero-info";

export function useCreateSuperhero() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitFailed, setIsSubmitFailed] = useState(false);

  const superpowers = useSuperpowers();
  const images = useCreateImages();
  const info = useSuperheroInfo(isSubmitFailed);

  const mutation = useMutation({
    mutationFn: createSuperhero,
    onSuccess: (superhero) => {
      queryClient.invalidateQueries({ queryKey: ["create-superheroes"] });
      if (!superhero) return;
      navigate(routes.getSuperhero(superhero.id));
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = info.validate();
    if (!isValid) {
      setIsSubmitFailed(true);
      return; // Stop execution if invalid
    }

    const payload = {
      nickname: info.data.nickname,
      realName: info.data.realName,
      originDescription: info.data.originDescription,
      catchPhrase: info.data.catchPhrase,
      images: images.imageFiles.map((item) => item.file),
      superpowerIds: superpowers.selected.map((item) => item.id),
      newSuperpowers: superpowers.newSuperpowers,
    };

    mutation.mutate(payload);
  };

  return {
    superpowers,
    images,
    info,
    onSubmit,
    // Use native React Query states
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
