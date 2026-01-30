import { Button, Flex, Image, View } from "@adobe/react-spectrum";
import { Link } from "react-router";
import { appConfig } from "../../config";
import { SuperheroShort } from "../../common/types/superhero";

export type SuperheroShortProps = {
  superhero: SuperheroShort;
};

export function SuperheroShortView({ superhero }: SuperheroShortProps) {
  const imageUrl = `${appConfig.baseUrl}/${superhero.imagePath}`;
  return (
    <Flex direction={"column"} height={"size-3600"} key={superhero.id}>
      <Image
        width={"100%"}
        height={"100%"}
        objectFit={"cover"}
        alt="superhero"
        src={imageUrl}
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
          {superhero.nickname}
          <Link to="/">
            <Button variant="primary">See more</Button>
          </Link>
        </Flex>
      </View>
    </Flex>
  );
}
