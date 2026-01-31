import { useQuery } from "@tanstack/react-query";
import { getSuperheroes } from "../../../common/api/get-superheroes";
import { useSuperheroesControl } from "./use-superheroes-control";
import { useSuperpowersFilter } from "./use-superpowers-filter";
import { useEffect, useState } from "react";

export function useAllSuperheroes() {
  const [total, setTotal] = useState<number>();
  const superpowers = useSuperpowersFilter();
  const superheroesControl = useSuperheroesControl(total);
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

  useEffect(() => {
    if (!data) return;
    setTotal(data.metadata.total);
  }, [data]);

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
