import { Button, Flex, View } from "@adobe/react-spectrum";
import { Link } from "react-router";
import { SuperheroesControl } from "../../common/types/superhero";
import Logo from "../../components/ui/logo";
import SuperheroSearchInputs from "./search-inputs";
import { SuperpowersControl } from "../../common/types/superpower";

export type Superpower = {
  id: string;
  name: string;
};

export type HeaderProps = {
  superpowersControl: SuperpowersControl;
  superheroesControl: SuperheroesControl;
};

export default function AllSuperheroesHeader({
  superpowersControl,
  superheroesControl,
}: HeaderProps) {
  return (
    <header>
      <View
        backgroundColor={"gray-200"}
        width={"100%"}
        paddingX={"size-1000"}
        paddingY={"size-200"}
      >
        <Flex justifyContent={"space-between"} alignItems={"end"}>
          <Link to="/">
            <Button variant="negative">Create new Superhero</Button>
          </Link>
          <SuperheroSearchInputs
            superheroesControl={superheroesControl}
            superpowersControl={superpowersControl}
          />
          <Logo size={"size-600"} />
        </Flex>
      </View>
    </header>
  );
}
