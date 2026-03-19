import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoute";
import Cart from "./pages/Cart";

function App() {
  return (
   <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Products/>
          </ProtectedRoute>}/>
        <Route path="/admin" element={
            <AdminRoute>
              <Admin/>
            </AdminRoute>
          }/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;