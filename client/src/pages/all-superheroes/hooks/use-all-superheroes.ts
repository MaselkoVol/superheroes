import { useQuery } from "@tanstack/react-query";
import { getSuperheroes } from "../../../common/api/get-superheroes";
import { useSuperheroesControl } from "./use-superheroes-control";
import { useSuperpowers } from "./use-superpowers";

export function useAllSuperheroes() {
  const superpowers = useSuperpowers();
  const superheroesControl = useSuperheroesControl();

  const { data, error, isLoading } = useQuery({
    queryKey: ["superheroes", superpowers, superheroesControl],

    queryFn: () =>
      getSuperheroes({
        nickname: superheroesControl.nickname,
        superpowers: superpowers.selected.map((superpower) => superpower.name),
        limit: superheroesControl.limit,
        page: superheroesControl.page,
      }),
  });

  const superheroes = data?.data || [];

  return {
    control: superheroesControl,
    superpowers,
    superheroes,
    total: data?.metadata.total,
    error,
    isLoading,
  };
}
