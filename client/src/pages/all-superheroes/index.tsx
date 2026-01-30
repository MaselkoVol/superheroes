import { Flex, Grid, repeat, View } from "@adobe/react-spectrum";
import { appConfig } from "../../config";
import { SueprheroesFilters } from "./filters";
import AllSuperheroesHeader from "./header";
import { useAllSuperheroes } from "./hooks/use-all-superheroes";
import { SuperheroShortView } from "./superhero-short-view";
import { Pagination } from "../../components/pagination";

export default function AllSuperheroesPage() {
  const { superpowers, control, superheroes, total } = useAllSuperheroes();
  if (superheroes[0]) {
    console.log(`${appConfig.baseUrl}/${superheroes[0].imagePath}`);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <AllSuperheroesHeader
        superheroesControl={control}
        superpowersControl={superpowers}
      />
      <View paddingX={"size-1000"}>
        <Flex direction={"column"}>
          <SueprheroesFilters superpowersControl={superpowers} />

          <Grid
            columns={repeat("auto-fit", "size-3000")}
            justifyContent="center"
            gap="size-300"
          >
            {superheroes.map((superhero) => (
              <SuperheroShortView superhero={superhero} />
            ))}
          </Grid>
          {total && (
            <Pagination
              limit={control.limit}
              page={control.page}
              total={total}
              onPageChanged={control.onPageChanged}
            />
          )}
        </Flex>
      </View>
    </div>
  );
}
