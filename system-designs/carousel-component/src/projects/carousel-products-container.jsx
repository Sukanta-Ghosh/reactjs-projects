/* Build a Highly Scalable Carousel Component in React JS

 Requirements:
  - We want to create a carousel component which takes array of images as input.
  - The component should efficiently handle a large number of images while maintaining 
  scalability, performance optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define 
  custom behavior.
  - Focus on Accessibility.
*/

import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Carousel from "../carousel-util/carousel";

// config
const imgLimitAPI = 8;
const imageLimit = 8;
const imgPerSlide = 3;

export async function imageLoader() {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${imgLimitAPI}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

const CarouselImages = () => {
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  const data = useLoaderData();
  const navigate = useNavigate();

  const onImgClick = (image, index) => {
    navigate(`/products/${image.id}`);
  };

  /* // fetch Image
  const fetchImages = async (imgLimit) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, []); */

  return (
    <div className="carousel-container">
      <Carousel
        images={data.products}
        isLoading={false}
        onImgClick={onImgClick}
        imgPerSlide={imgPerSlide}
        imageLimit={imageLimit}
        /* customization */
        customPrevButton={(onClick) => (
          <button
            className="btn prev"
            style={{ background: "red" }}
            onClick={onClick}
          >
            Prev
          </button>
        )}
        customNextButton={(onClick) => (
          <button
            className="btn next"
            style={{ background: "blue" }}
            onClick={onClick}
          >
            Next
          </button>
        )}
      />
    </div>
  );
};

export default CarouselImages;
