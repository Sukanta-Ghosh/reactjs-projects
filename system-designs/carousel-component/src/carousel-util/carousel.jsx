import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImgClick = () => {},
  imgPerSlide = 1,
}) => {
  // state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  // ref
  const imgRef = useRef(null);

  // variable
  let sliceLimit = imageLimit > images.length ? images.length : imageLimit;

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    /* imageLimit - imgPerSlide => This should be last currentIndex after currentIndex reaches 0 */
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - imgPerSlide : prevIndex - 1
    );
  };
  const goToNext = () => {
    /* imageLimit - imgPerSlide => This should be last currentIndex after again reset with 0 index */
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - imgPerSlide ? 0 : prevIndex + 1
    );
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imgWidth}px)` }}
      >
        {images.slice(0, sliceLimit).map((image, index) => {
          return (
            <img
              onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
              ref={imgRef}
              key={image.id}
              src={image.thumbnail || image.url || image.src}
              onClick={() => onImgClick(image, index)}
              alt={image.title || image.alt}
              className="image"
            />
          );
        })}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
