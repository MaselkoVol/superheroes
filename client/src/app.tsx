import { defaultTheme, Flex, Provider } from "@adobe/react-spectrum";
import Router from "./pages/router";

export default function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Flex direction="column" minHeight="100svh">
        <Router />
      </Flex>
    </Provider>
  );
}
