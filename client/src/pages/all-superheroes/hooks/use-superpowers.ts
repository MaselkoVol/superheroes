import { Key } from "@adobe/react-spectrum";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { getSuperpowers } from "../../../common/api/get-superpowers";
import { SuperpowersControl } from "../../../common/types/superpower";

export function useSuperpowers(): SuperpowersControl {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedNames = useMemo(
    () => searchParams.getAll("superpowers"),
    [searchParams],
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["superpowers"],
    queryFn: getSuperpowers,
  });
  // transform into array if no data
  const superpowers = useMemo(() => data || [], [data]);

  const selected = useMemo(() => {
    return superpowers.filter((superpower) =>
      selectedNames.includes(superpower.name),
    );
  }, [superpowers, selectedNames]);

  const onSelected = (id: Key) => {
    const newSuperpower = superpowers.find(
      (superpower) => superpower.id === id,
    );
    if (!newSuperpower) return;
    if (selectedNames.includes(newSuperpower.name)) return;
    searchParams.append("superpowers", newSuperpower.name);
    setSearchParams(searchParams);
  };

  const onRemoved = (keys: Set<Key>) => {
    const superpowersToRemove = superpowers.filter((superpower) =>
      keys.has(superpower.id),
    );
    superpowersToRemove.forEach((toRemove) => {
      searchParams.delete("superpowers", toRemove.name);
    });
    setSearchParams(searchParams);
  };

  return {
    onRemoved,
    onSelected,
    selected,
    error,
    isLoading,
    all: superpowers,
  };
}
