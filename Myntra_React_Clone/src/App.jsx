import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

export const LegacyBagRedirect = () => <Navigate to="/cart" replace />;
