import { Button, Flex, Heading, Image, View } from "@adobe/react-spectrum";
import { useNavigate } from "react-router";
import { routes } from "../../common/routes";
import { SuperheroShort } from "../../common/types/superhero";
import { getImageUrl } from "../../utils/url";

export type SuperheroShortProps = {
  superhero: SuperheroShort;
};

export function SuperheroShortView({ superhero }: SuperheroShortProps) {
  const navigate = useNavigate();
  return (
    <Flex direction={"column"} height={"size-4600"} key={superhero.id}>
      <Image
        width={"100%"}
        height={"100%"}
        objectFit={"cover"}
        alt="superhero"
        src={getImageUrl(superhero.imagePath)}
      />
      <View
        backgroundColor={"gray-50"}
        paddingX={"size-100"}
        paddingY={"size-125"}
      >
        <Flex
          gap={"size-200"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Heading level={3}>{superhero.nickname}</Heading>
          <Button
            onPress={() => navigate(routes.getSuperhero(superhero.id))}
            variant="primary"
          >
            See more
          </Button>
        </Flex>
      </View>
    </Flex>
  );
}
