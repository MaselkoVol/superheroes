import {
  Button,
  ComboBox,
  Flex,
  Item,
  Key,
  SearchField,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { SuperpowersFilterControl } from "../../common/types/superpower";
import { SuperheroesControl } from "../../common/types/superhero";

export type SearchInputsProps = {
  superpowersControl: SuperpowersFilterControl;
  superheroesControl: SuperheroesControl;
};

export default function SuperheroSearchInputs({
  superpowersControl,
  superheroesControl,
}: SearchInputsProps) {
  const [selectedId, setSelectedId] = useState<Key | null>(null);
  const onSuperpowerSelected = () => {
    if (!selectedId) return;
    superpowersControl.onSelected(selectedId);
  };
  return (
    <Flex gap={"size-200"} wrap={"wrap"}>
      <SearchField
        defaultValue={superheroesControl.nickname}
        label="Find seperhero"
        onChange={superheroesControl.onNicknameChanged}
      />
      <Flex gap={"size-100"} alignItems={"end"}>
        <ComboBox
          loadingState={superpowersControl.isLoading ? "loading" : "idle"}
          label="Pick superpowers"
          defaultItems={superpowersControl.all}
          onSelectionChange={setSelectedId}
        >
          {(item) => <Item>{item.name}</Item>}
        </ComboBox>
        <Button onPress={onSuperpowerSelected} variant="secondary">
          add
        </Button>
      </Flex>
    </Flex>
  );
}
