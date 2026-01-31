import { Flex, View } from "@adobe/react-spectrum";
import { Pagination } from "../../components/pagination";
import { SueprheroesFilters } from "./filters";
import AllSuperheroesHeader from "./header";
import { useAllSuperheroes } from "./hooks/use-all-superheroes";
import { SuperheroesGrid } from "./superheroes-grid";

export default function AllSuperheroesPage() {
  const { superpowers, control, superheroes, total, isLoading } =
    useAllSuperheroes();
  return (
    <>
      <AllSuperheroesHeader
        superheroesControl={control}
        superpowersControl={superpowers}
      />
      <View paddingX={"size-200"}>
        <Flex justifyContent={"center"}>
          <Flex width={"100%"} maxWidth={1200} direction={"column"}>
            <SueprheroesFilters superpowersControl={superpowers} />
            <SuperheroesGrid isLoading={isLoading} superheroes={superheroes} />
            {total !== undefined && superheroes.length > 0 && (
              <Flex justifyContent={"center"}>
                <Pagination
                  limit={control.limit}
                  page={control.page}
                  total={total}
                  onPageChanged={control.onPageChanged}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </View>
    </>
  );
}
