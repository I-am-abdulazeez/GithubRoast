import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import RoastPage from "@/pages/roastme";

export default function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<RoastPage />} path="/roastme" />
    </Routes>
  );
}
