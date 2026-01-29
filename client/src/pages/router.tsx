import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const AllSuperheroesPage = lazy(() => import("./all-superheroes"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route index element={<AllSuperheroesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
