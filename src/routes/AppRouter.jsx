import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/" element={
					<ProtectedRoute>
						<Home/>
					</ProtectedRoute>
				}/>
				<Route path="/" element={
					<ProtectedRoute>
						<Products/>
					</ProtectedRoute>
				}/>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;