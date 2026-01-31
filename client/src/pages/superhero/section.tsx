import { Flex, Text } from "@adobe/react-spectrum";
import { HTMLAttributes } from "react";

export type SuperheroSection = {
  label: string;
} & HTMLAttributes<HTMLDivElement>;

export function SuperheroSection({ children, label }: SuperheroSection) {
  return (
    <Flex direction={"column"} gap={"size-50"}>
      <Text slot="label">{label}</Text>
      {children}
    </Flex>
  );
}
