import {
  Flex,
  Grid,
  Heading,
  minmax,
  ProgressCircle,
  repeat,
  View,
} from "@adobe/react-spectrum";
import { SuperheroShort } from "../../common/types/superhero";
import { SuperheroShortView } from "./superhero-short-view";

export type SuperheroesGridParams = {
  superheroes: SuperheroShort[];
  isLoading: boolean;
};

export function SuperheroesGrid({
  superheroes,
  isLoading,
}: SuperheroesGridParams) {
  if (isLoading) {
    return (
      <Flex justifyContent="center" marginTop="size-500">
        <ProgressCircle aria-label="Loading" isIndeterminate />
      </Flex>
    );
  }

  if (!superheroes || superheroes.length === 0) {
    return (
      <View padding="size-500">
        <Heading level={3}>No results</Heading>
      </View>
    );
  }
  return (
    <Grid
      columns={repeat("auto-fit", minmax("size-2400", "size-3600"))}
      justifyContent="center"
      gap="size-300"
    >
      {superheroes.map((superhero) => (
        <SuperheroShortView key={superhero.id} superhero={superhero} />
      ))}
    </Grid>
  );
}
