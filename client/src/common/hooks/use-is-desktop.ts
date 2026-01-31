import { useMediaQuery } from "usehooks-ts";

export function useIsDesktop() {
  return useMediaQuery("(min-width: 920px)");
}
