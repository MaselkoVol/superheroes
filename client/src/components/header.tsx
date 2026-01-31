import { Button, Flex, View } from "@adobe/react-spectrum";
import { HTMLAttributes } from "react";
import Logo from "./ui/logo";
import { useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { useIsDesktop } from "../common/hooks/use-is-desktop";

export type HeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  buttonUrl: string;
  buttonLabel: string;
};

export function Header({
  children,
  buttonUrl,
  buttonLabel,
  ...props
}: HeaderProps) {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  return (
    <header {...props}>
      <View backgroundColor={"gray-200"} width={"100%"} padding={"size-200"}>
        <Flex justifyContent={"center"}>
          <Flex
            width={"100%"}
            maxWidth={1200}
            gap={"size-100"}
            justifyContent={"space-between"}
            alignItems={"end"}
            wrap={"wrap"}
          >
            <Button onPress={() => navigate(buttonUrl)} variant="negative">
              {buttonLabel}
            </Button>
            {children}
            {isDesktop && <Logo size={"size-600"} />}
          </Flex>
        </Flex>
      </View>
    </header>
  );
}
