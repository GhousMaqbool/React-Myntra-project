import React, { useEffect, useState } from "react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/emg1.webp",
    "/images/emg2.webp",
    "/images/emg3.webp",
    "/images/emg4.webp",
    "/images/emg5.webp",
    "/images/emg6.webp",
    "/images/emg7.webp",
    "/images/emg8.webp",
    "/images/emg9.webp",
    "/images/emg12.webp",
    "/images/emg13.webp",
    "/images/emg14.webp",
    "/images/emg001.webp",
    "/images/emg002.webp",
    "/images/emg003.webp",
    "/images/emg004.webp",
    "/images/emg15.webp",
    "/images/emg15.webp",
  ];

  const visibleCards = 6; // Show 6 cards per view
  const step = 3; // Move 3 cards each time
  const totalSteps = Math.ceil((images.length - visibleCards) / step) + 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxStartIndex = images.length - visibleCards;
        if (prevIndex + step > maxStartIndex) {
          return 0;
        }
        return prevIndex + step;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length, step, visibleCards]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Total width of one card + margin
  const cardWidth = 190; // (180px + 10px gap)
  const translateX = -(currentIndex * cardWidth);

  return (
    <div style={{ overflow: "hidden", padding: "20px" }}>
      {/* Slider Container */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: `${images.length * cardWidth}px`,
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            style={{
              minWidth: "180px",
              height: "250px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              flexShrink: 0,
            }}
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <span
            key={idx}
            onClick={() => goToImage(idx * step)}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "0 4px",
              borderRadius: "50%",
              backgroundColor:
                currentIndex >= idx * step &&
                currentIndex < idx * step + visibleCards
                  ? "#333"
                  : "#ccc",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
