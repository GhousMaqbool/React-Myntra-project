const HeroBanner = ({ title, subtitle, image }) => {
  return (
    <section
      className="hero-banner"
      style={image ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${image})` } : undefined}
    >
      <div className="hero-content">
        <p className="hero-eyebrow">Myntra Clone</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroBanner;
