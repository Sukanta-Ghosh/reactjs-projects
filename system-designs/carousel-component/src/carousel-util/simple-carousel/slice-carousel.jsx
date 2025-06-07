import React, { useState } from "react";
import "./styles.css";

const imgPerSlide = 1;
const ImageSliceCarousel = ({ images = [] }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prevIdx) =>
      prevIdx === 0 ? images.length - 1 : prevIdx - 1
    );
  };

  const handleNext = () => {
    setCurrentIdx((prevIdx) =>
      prevIdx === images.length - 1 ? 0 : prevIdx + 1
    );
  };

  return (
    <div>
      <div className="container">
        {images.slice(currentIdx, currentIdx + imgPerSlide).map((item, idx) => (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className="slide-image"
          />
        ))}
        <button onClick={handlePrev} className="nav-button prev" id="Previous">
          ⬅️
        </button>
        <button onClick={handleNext} className="nav-button next" id="Next">
          ➡️
        </button>
      </div>

      <div className="pagination">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={
              idx === currentIdx ? "page-button active" : "page-button"
            }
            id={`pageButton-${idx}`}
            onClick={() => setCurrentIdx(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSliceCarousel;
