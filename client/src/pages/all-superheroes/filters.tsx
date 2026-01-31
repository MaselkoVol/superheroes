import { Flex, Item, TagGroup, View } from "@adobe/react-spectrum";
import { SuperpowersFilterControl } from "../../common/types/superpower";

export type SueprheroesFiltersProps = {
  superpowersControl: SuperpowersFilterControl;
};

export function SueprheroesFilters({
  superpowersControl,
}: SueprheroesFiltersProps) {
  return (
    <View paddingY={"size-100"}>
      <Flex alignItems={"center"} gap={"size-100"}>
        <p>Superpowers: </p>
        <TagGroup
          renderEmptyState={() => <></>}
          onRemove={superpowersControl.onRemoved}
          items={superpowersControl.selected}
          aria-label="superpowers"
        >
          {(item) => <Item>{item.name}</Item>}
        </TagGroup>
      </Flex>
    </View>
  );
}
