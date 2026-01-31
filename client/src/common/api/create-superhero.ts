import axios from "axios";
import api from "../../api";
import { createSuperheroPayload, Superhero } from "../types/superhero";

export async function createSuperhero(payload: createSuperheroPayload) {
  const formData = new FormData();
  formData.append("nickname", payload.nickname);
  formData.append("realName", payload.realName);
  formData.append("originDescription", payload.originDescription);
  formData.append("catchPhrase", payload.catchPhrase);
  for (const image of payload.images) {
    formData.append("images", image);
  }
  for (const superpowerId of payload.superpowerIds) {
    formData.append("superpowerIds", superpowerId);
  }
  for (const newSuperpower of payload.newSuperpowers) {
    formData.append("newSuperpowers", newSuperpower);
  }
  try {
    const { data } = await api.post<Superhero>("/superheroes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverMessage =
        error.response.data?.message || "An unexpected error occurred";
      throw new Error(serverMessage);
    }
    throw new Error("Network error or server is down");
  }
}
