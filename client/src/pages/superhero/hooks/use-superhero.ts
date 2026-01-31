import { useQuery } from "@tanstack/react-query";
import { getSuperhero } from "../../../common/api/get-superhero";
import { useParams } from "react-router";
import { useDeleteSuperhero } from "./use-delete-superhero";

export function useSuperhero() {
  const { id } = useParams();
  const deleteControl = useDeleteSuperhero(id);
  const { data, error, isLoading } = useQuery({
    queryKey: ["superhero", id],
    queryFn: () => getSuperhero(id!),
    enabled: !!id,
  });

  return {
    superhero: data,
    error,
    isLoading,
    deleteControl,
  };
}
