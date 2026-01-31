import { Button, Flex, Heading } from "@adobe/react-spectrum";
import { useNavigate } from "react-router";

export type FormHeaderProps = {
  linkUrl: string;
  linkLabel: string;
  message: string;
};

export function FormHeader({ linkUrl, linkLabel, message }: FormHeaderProps) {
  const navigate = useNavigate();
  return (
    <Flex
      width={"100%"}
      gap={"size-200"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Heading>{message}</Heading>
      <Button variant="secondary" onPress={() => navigate(linkUrl)}>
        {linkLabel}
      </Button>
    </Flex>
  );
}
