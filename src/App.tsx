import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import BaseLayout from "./layouts/BaseLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import pages yang kamu butuhkan
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard"; // pastikan file ini ada
import SalesReport from "./pages/SalesReport"; // pastikan file ini ada

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";
import AddProduct from "./pages/AddProduct";
import AddSales from "./pages/AddSales";
import EditProduct from "./pages/EditProduct";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes dengan RootLayout */}
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="products"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="add-product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="edit-product/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="products/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="sales-report"
            element={
              <PrivateRoute>
                <SalesReport />
              </PrivateRoute>
            }
          />
          <Route
            path="add-sales"
            element={
              <PrivateRoute>
                <AddSales />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Routes dengan BaseLayout untuk login/register */}
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
      </>
    )
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
