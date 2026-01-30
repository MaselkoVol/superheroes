import { Key } from "@adobe/react-spectrum";

export type Superpower = {
  id: string;
  name: string;
};

export type SuperpowersControl = {
  onRemoved: (ids: Set<Key>) => void;
  onSelected: (id: Key) => void;
  selected: Superpower[];
  all: Superpower[];
  error: Error | null;
  isLoading: boolean;
};
