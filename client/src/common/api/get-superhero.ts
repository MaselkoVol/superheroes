import axios from "axios";
import api from "../../api";
import { Superhero } from "../types/superhero";

export async function getSuperhero(id: string) {
  try {
    const { data } = await api.get<Superhero>(`/superheroes/${id}`);

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
