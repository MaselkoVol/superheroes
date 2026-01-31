import { Key } from "@adobe/react-spectrum";

export type Superpower = {
  id: string;
  name: string;
};

export type SuperpowersFilterControl = {
  onRemoved: (ids: Set<Key>) => void;
  onSelected: (id: Key) => void;
  selected: Superpower[];
  all: Superpower[];
  error: Error | null;
  isLoading: boolean;
};

export type SuperpowersControl = {
  selected: Superpower[];
  onSelected: (id: Key | null) => void;
  onRemoved: (ids: Set<Key>) => void;

  newSuperpowers: string[];
  onNewAdded: (name: string) => void;
  onNewRemoved: (names: Set<Key>) => void;

  all: Superpower[];
  error: Error | null;
  isLoading: boolean;
};
