import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoute";
import Cart from "./pages/Cart";
import Forgot from "./pages/Forgot";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";

function App() {
  return (
   <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col">
    <BrowserRouter>
    <main className="flex-grow pb-10">
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
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  </div>
  );
}

export default App;