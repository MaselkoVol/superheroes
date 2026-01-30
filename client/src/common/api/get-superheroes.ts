import axios from "axios";
import api from "../../api";
import {
  GetSuperheroesParams,
  SuperheroShortResponse,
} from "../types/superhero";

export async function getSuperheroes(params: GetSuperheroesParams) {
  try {
    const { data } = await api.get<SuperheroShortResponse>("/superheroes", {
      params,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Access custom error message sent from NestJS (e.g., throw new BadRequestException('...'))
      const serverMessage =
        error.response.data?.message || "An unexpected error occurred";
      throw new Error(serverMessage);
    }
    throw new Error("Network error or server is down");
  }
}
