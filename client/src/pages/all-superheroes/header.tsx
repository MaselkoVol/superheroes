import { routes } from "../../common/routes";
import { SuperheroesControl } from "../../common/types/superhero";
import { SuperpowersFilterControl } from "../../common/types/superpower";
import { Header } from "../../components/header";
import SuperheroSearchInputs from "./search-inputs";

export type HeaderProps = {
  superpowersControl: SuperpowersFilterControl;
  superheroesControl: SuperheroesControl;
};

export default function AllSuperheroesHeader({
  superpowersControl,
  superheroesControl,
}: HeaderProps) {
  return (
    <Header buttonUrl={routes.createSuperhero()} buttonLabel="Create superhero">
      <SuperheroSearchInputs
        superheroesControl={superheroesControl}
        superpowersControl={superpowersControl}
      />
    </Header>
  );
}
