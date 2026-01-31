import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Image,
  Item,
  minmax,
  repeat,
  TagGroup,
  View,
} from "@adobe/react-spectrum";
import {
  DeleteSuperheroControl,
  Superhero,
} from "../../common/types/superhero";
import { Header } from "../../components/header";
import { SuperheroSection } from "./section";
import { DeleteSuperheroButton } from "./delete-superhero";
import { routes } from "../../common/routes";
import { getImageUrl } from "../../utils/url";
import { useNavigate } from "react-router";

export type SuperheroViewProps = {
  superhero: Superhero;
  deleteControl: DeleteSuperheroControl;
};

export function SuperheroView({
  deleteControl,
  superhero,
}: SuperheroViewProps) {
  const navigate = useNavigate();
  return (
    <>
      <Header buttonUrl={routes.goHome()} buttonLabel="Go home">
        <Heading level={2}>{superhero.nickname}</Heading>
      </Header>
      <View paddingX={"size-200"} paddingY={"size-500"}>
        <Flex justifyContent={"center"}>
          <Flex
            maxWidth={1200}
            alignItems={"center"}
            width={"100%"}
            direction={"column"}
            gap={"size-300"}
          >
            <Grid
              width={"100%"}
              columns={repeat("auto-fit", minmax("size-2400", "size-3600"))}
              gap="size-200"
            >
              {superhero.images.map((image) => (
                <Image
                  objectFit={"cover"}
                  height={"size-4600"}
                  src={getImageUrl(image.path)}
                  alt="Profile image"
                  key={image.id}
                />
              ))}
            </Grid>
            <Flex width={"100%"} direction={"column"} gap={"size-200"}>
              <SuperheroSection label="Superpowers">
                <TagGroup
                  items={superhero.superpowers}
                  aria-label="superpowers"
                >
                  {(item) => <Item>{item.name}</Item>}
                </TagGroup>
              </SuperheroSection>
              <SuperheroSection label="Real name">
                <Heading level={3}>{superhero.nickname}</Heading>
              </SuperheroSection>
              <SuperheroSection label="Catch phrase">
                <Heading level={3}>{superhero.catchPhrase}</Heading>
              </SuperheroSection>
              <SuperheroSection label="Origin description">
                <Heading level={3}>{superhero.originDescription}</Heading>
              </SuperheroSection>
              <ButtonGroup>
                <Button
                  onPress={() => navigate(routes.updateSuperhero(superhero.id))}
                  variant="accent"
                >
                  Edit
                </Button>
                <DeleteSuperheroButton control={deleteControl} />
              </ButtonGroup>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </>
  );
}
