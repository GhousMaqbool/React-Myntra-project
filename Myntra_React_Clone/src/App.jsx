import { Navigate, Outlet } from "react-router-dom";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";

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
