import { Key } from "@adobe/react-spectrum";

export const routes = {
  goHome: () => "/",
  createSuperhero: () => "/create",
  getSuperhero: (id: string | Key) => `/superheroes/${id}`,
  updateSuperhero: (id: string | Key) => `/superheroes/${id}/update`,
};
