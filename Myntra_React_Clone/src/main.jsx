import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { LegacyBagRedirect } from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import StudioPage from "./pages/StudioPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import "./styles/theme.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "men", element: <CategoryPage category="men" /> },
      { path: "women", element: <CategoryPage category="women" /> },
      { path: "kids", element: <CategoryPage category="kids" /> },
      { path: "beauty", element: <CategoryPage category="beauty" /> },
      { path: "studio", element: <StudioPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "bag", element: <LegacyBagRedirect /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </UserProvider>
  </StrictMode>
);
