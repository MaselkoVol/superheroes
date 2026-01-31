import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const AllSuperheroesPage = lazy(() => import("./all-superheroes"));
const CreateSuperheroPage = lazy(() => import("./create-superhero"));
const SuperheroPage = lazy(() => import("./superhero"));
const UpdateSuperheroPage = lazy(() => import("./update-superhero"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route index element={<AllSuperheroesPage />} />
          <Route path="/create" element={<CreateSuperheroPage />} />
          <Route path="/superheroes/:id" element={<SuperheroPage />} />
          <Route
            path="/superheroes/:id/update"
            element={<UpdateSuperheroPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
