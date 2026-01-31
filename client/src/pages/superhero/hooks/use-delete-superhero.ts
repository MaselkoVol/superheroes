import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSuperhero } from "../../../common/api/delete-superhero";
import { routes } from "../../../common/routes";
import { useNavigate } from "react-router";
import { DeleteSuperheroControl } from "../../../common/types/superhero";

export function useDeleteSuperhero(
  id: string | undefined,
): DeleteSuperheroControl {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteSuperhero(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delete-superhero"] });
      navigate(routes.goHome());
    },
  });

  const onDeleted = () => {
    mutation.mutate(id!);
  };

  return {
    onDeleted: onDeleted,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
}
