import { Link } from "react-router-dom";

const CATEGORIES = [
  { to: "/men", label: "Men", emoji: "👔" },
  { to: "/women", label: "Women", emoji: "👗" },
  { to: "/kids", label: "Kids", emoji: "🧸" },
  { to: "/beauty", label: "Beauty", emoji: "💄" },
  { to: "/studio", label: "Studio", emoji: "✨" },
];

const CategorySection = () => {
  return (
    <section className="category-section">
      <h2>Shop By Category</h2>
      <div className="category-grid">
        {CATEGORIES.map((category) => (
          <Link key={category.to} to={category.to} className="category-card">
            <span className="category-emoji">{category.emoji}</span>
            <span>{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
