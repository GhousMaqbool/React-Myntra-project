import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="page not-found-page">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
