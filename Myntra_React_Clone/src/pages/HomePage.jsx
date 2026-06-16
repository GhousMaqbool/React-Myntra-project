import { useSearchParams } from "react-router-dom";
import HeroBanner from "../components/layout/HeroBanner";
import CategorySection from "../components/layout/CategorySection";
import ProductGrid from "../components/product/ProductGrid";
import ImageSlider from "../Components/ImageSlider";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../context/SearchContext";
import { useEffect } from "react";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch, searchQuery, setSearchQuery]);

  const { products, loading, error, reload } = useProducts({
    search: urlSearch || searchQuery,
    limit: 12,
  });

  return (
    <main className="page home-page">
      <HeroBanner
        title="Fashion for Every Occasion"
        subtitle="Discover the latest trends with up to 70% off on top brands."
        image="/images/bagges.webp"
      />
      <ImageSlider />
      <CategorySection />
      <section className="page-section">
        <div className="section-header">
          <h2>{urlSearch ? `Results for "${urlSearch}"` : "Trending Products"}</h2>
        </div>
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onRetry={reload}
          emptyTitle="No products available"
          emptyDescription="Seed the database using npm run seed in the backend folder."
        />
      </section>
    </main>
  );
};

export default HomePage;
