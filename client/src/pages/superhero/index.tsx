import { Flex, ProgressCircle, Text, View } from "@adobe/react-spectrum";
import { useSuperhero } from "./hooks/use-superhero";
import { SuperheroView } from "./superhero-view";

export default function SuperheroPage() {
  const { superhero, isLoading, error, deleteControl } = useSuperhero();
  if (isLoading) {
    return (
      <View paddingX="size-1000" paddingY="size-500">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="size-2000"
          gap="size-200"
        >
          <ProgressCircle
            aria-label="Loading superhero details"
            isIndeterminate
            size="L"
          />
          <Text>Loading Superhero...</Text>
        </Flex>
      </View>
    );
  }

  if (error || !superhero) {
    return (
      <View paddingX="size-1000" paddingY="size-500">
        <Text>Error loading superhero data.</Text>
      </View>
    );
  }

  return <SuperheroView deleteControl={deleteControl} superhero={superhero} />;
}
