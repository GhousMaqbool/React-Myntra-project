import HeroBanner from "../components/layout/HeroBanner";
import ProductGrid from "../components/product/ProductGrid";
import { useProducts } from "../hooks/useProducts";

const CATEGORY_META = {
  men: {
    title: "Men's Fashion",
    subtitle: "Shirts, shoes, activewear and more for men.",
    image: "/images/emg1.webp",
  },
  women: {
    title: "Women's Fashion",
    subtitle: "Curated styles, ethnic wear, western wear and accessories.",
    image: "/images/emg2.webp",
  },
  kids: {
    title: "Kids Collection",
    subtitle: "Comfortable and trendy outfits for kids.",
    image: "/images/emg3.webp",
  },
  beauty: {
    title: "Beauty & Grooming",
    subtitle: "Skincare, grooming and personal care essentials.",
    image: "/images/emg4.webp",
  },
  studio: {
    title: "Myntra Studio",
    subtitle: "Editor picks and featured lifestyle products.",
    image: "/images/emg5.webp",
  },
};

const CategoryPage = ({ category }) => {
  const meta = CATEGORY_META[category] || CATEGORY_META.studio;
  const { products, loading, error, reload } = useProducts({ category, limit: 20 });

  return (
    <main className="page category-page">
      <HeroBanner title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <section className="page-section">
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onRetry={reload}
          emptyTitle={`No ${category} products yet`}
          emptyDescription="Products will appear here once seeded in MongoDB."
        />
      </section>
    </main>
  );
};

export default CategoryPage;
