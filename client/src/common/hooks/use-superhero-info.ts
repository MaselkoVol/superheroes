import { useEffect, useState } from "react";
import {
  Superhero,
  SuperheroInfo,
  SuperheroInfoControl,
} from "../types/superhero";
import { FieldErrors } from "../types/error";
import { SuperheroSchema } from "../schemas/superhero";
import { zodToFieldErrors } from "../../utils/zod";

export function useSuperheroInfo(
  isSubmitFailed: boolean,
  superhero?: Superhero,
): SuperheroInfoControl {
  const [superheroInfo, setSuperheroInfo] = useState<SuperheroInfo>({
    nickname: "",
    originDescription: "",
    catchPhrase: "",
    realName: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (superhero) {
      setSuperheroInfo({
        nickname: superhero.nickname,
        realName: superhero.realName,
        catchPhrase: superhero.catchPhrase,
        originDescription: superhero.originDescription,
      });
    }
  }, [superhero]);

  // Unified validation function that returns the errors
  const runValidation = (info: SuperheroInfo) => {
    const result = SuperheroSchema.safeParse(info);
    if (result.success) {
      setErrors({});
      return true;
    }
    setErrors(zodToFieldErrors(result.error));
    return false;
  };

  const onInfoChanged = (newInfo: SuperheroInfo) => {
    if (isSubmitFailed) {
      runValidation(newInfo);
    }
    setSuperheroInfo(newInfo);
  };

  const onBlur = () => {
    if (isSubmitFailed) {
      runValidation(superheroInfo);
    }
  };
  const validate = () => {
    return runValidation(superheroInfo);
  };

  return {
    errors,
    validate,
    onInfoChanged,
    onBlur,
    data: superheroInfo,
  };
}
