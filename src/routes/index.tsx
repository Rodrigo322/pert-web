import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Logon } from "../pages/Logon";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
