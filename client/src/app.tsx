import { defaultTheme, Provider } from "@adobe/react-spectrum";
import Router from "./pages/router";

export default function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <Router />
    </Provider>
  );
}
