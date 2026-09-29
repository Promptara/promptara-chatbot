import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CatalogPage from "./pages/catalog/feature/CatalogPage";
import ProductPage from "./pages/catalog/feature/ProductPage";
import AddProductPage from "./pages/admin/AddProductPage";
import AdminFlowBuilder from "./pages/AdminFlowBuilder";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <Router>
      <div className="relative w-full h-full min-h-screen font-sans">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="/admin/addProduct" element={<AddProductPage />} />
          
          {/* Rute baru untuk Admin Flow Builder */}
          <Route path="/admin/flow" element={<AdminFlowBuilder />} />
        </Routes>
        
        {/* Chat Widget akan muncul di semua halaman */}
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
