import { useSearchParams } from "react-router";
import { appConfig } from "../../../config";
import { useEffect, useMemo } from "react";
import { SuperheroesControl } from "../../../common/types/superhero";

export function useSuperheroesControl(total?: number): SuperheroesControl {
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

  useEffect(() => {
    if (page < 0 || (total && page * limit >= total + limit)) {
      searchParams.set("page", String(1));
      setSearchParams(searchParams);
      return;
    }
  }, [page, total, limit, searchParams, setSearchParams]);

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
