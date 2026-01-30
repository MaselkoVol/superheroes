import { useSearchParams } from "react-router";
import { appConfig } from "../../../config";
import { useMemo } from "react";
import { SuperheroesControl } from "../../../common/types/superhero";

export function useSuperheroesControl(): SuperheroesControl {
  const [searchParams, setSearchParams] = useSearchParams();

  const { nickname, page, limit } = useMemo(() => {
    return {
      nickname: searchParams.get("nickname") || "",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: appConfig.paginationLimit || 5,
    };
  }, [searchParams]);

  const onPageChanged = (page: number) => {
    if (page < 0) return;
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };
  const onNicknameChanged = (nickname: string) => {
    searchParams.set("nickname", nickname);
    setSearchParams(searchParams);
  };

  return {
    nickname,
    page,
    limit,
    onPageChanged,
    onNicknameChanged,
  };
}
