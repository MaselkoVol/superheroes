import { Key } from "@adobe/react-spectrum";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Superpower, SuperpowersControl } from "../types/superpower";
import { getSuperpowers } from "../api/get-superpowers";
import { Superhero } from "../types/superhero";

export function useSuperpowers(superhero?: Superhero): SuperpowersControl {
  const { data, error, isLoading } = useQuery({
    queryKey: ["superpowers"],
    queryFn: getSuperpowers,
  });
  // transform into array if no data
  const superpowers = useMemo(() => data || [], [data]);

  const [selected, setSelected] = useState<Superpower[]>([]);

  useEffect(() => {
    if (superhero) {
      setSelected(superhero.superpowers);
    }
  }, [superhero]);

  const onSelected = (id: Key | null) => {
    if (!id) return;
    const newSuperpower = superpowers.find((item) => item.id === id);
    if (!newSuperpower) return;

    if (selected.find((superpower) => id === superpower.id)) return;
    setSelected([...selected, newSuperpower]);
  };

  const onRemoved = (keys: Set<Key>) => {
    const filtered = selected.filter((superpower) => !keys.has(superpower.id));
    setSelected(filtered);
  };

  const [newSuperpowers, setNewSuperpowers] = useState<string[]>([]);
  const onNewAdded = (name: string) => {
    if (!name.trim()) return;
    if (newSuperpowers.includes(name)) return;
    const existing = superpowers.find((item) => item.name === name);
    if (existing) {
      onSelected(existing.id);
      return;
    }
    setNewSuperpowers([...newSuperpowers, name]);
  };

  const onNewRemoved = (keys: Set<Key>) => {
    const filtered = newSuperpowers.filter((name) => !keys.has(name));
    setNewSuperpowers(filtered);
  };

  return {
    selected,
    onSelected,
    onRemoved,
    newSuperpowers,
    onNewAdded,
    onNewRemoved,
    all: superpowers,
    error,
    isLoading,
  };
}
