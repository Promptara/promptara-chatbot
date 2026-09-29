import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "./pages/Dashboard";
import CatalogPage from "./pages/catalog/feature/CatalogPage";
import ProductPage from "./pages/catalog/feature/ProductPage";
import AddProductPage from "./pages/admin/AddProductPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ProductPage />} />
        <Route path="/admin/addProduct" element={<AddProductPage />} />
        {/* <Route path="/registrasipesertatest" element={<RegistrasiPesertaTest />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
