import {
  Button,
  ComboBox,
  Flex,
  Item,
  TagGroup,
  TextField,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { SuperpowersControl } from "../common/types/superpower";

export type SuperpowersFormParams = {
  superpowers: SuperpowersControl;
};

export function SuperpowersForm({ superpowers }: SuperpowersFormParams) {
  const [newSuperpower, setNewSuperpower] = useState("");
  const handleNewSuperpower = () => {
    superpowers.onNewAdded(newSuperpower);
    setNewSuperpower("");
  };
  return (
    <>
      <ComboBox
        onSelectionChange={superpowers.onSelected}
        defaultItems={superpowers.all}
        label="Superpowers"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>

      <TagGroup
        renderEmptyState={() => <p>No superpowers selected</p>}
        items={superpowers.selected}
        onRemove={superpowers.onRemoved}
        aria-label="superpowers"
      >
        {(item) => <Item>{item.name}</Item>}
      </TagGroup>
      <Flex justifyContent={"space-between"} alignItems={"end"}>
        <TextField
          value={newSuperpower}
          onChange={setNewSuperpower}
          label="New superpowers"
        />
        <Button onPress={handleNewSuperpower} variant="primary">
          Add
        </Button>
      </Flex>
      <TagGroup
        renderEmptyState={() => <p>No superpowers created</p>}
        onRemove={superpowers.onNewRemoved}
        items={superpowers.newSuperpowers.map((name) => ({ name }))}
        aria-label="superpowers"
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </TagGroup>
    </>
  );
}
