/* Build a Highly Scalable Carousel Component in React JS

 Requirements:
  - We want to create a carousel component which takes array of images as input.
  - The component should efficiently handle a large number of images while maintaining 
  scalability, performance optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define 
  custom behavior.
  - Focus on Accessibility.
*/

import React, { useEffect, useState } from "react";
import Carousel from "./carousel-main";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Image, Product } from "./types";

// config
const imgLimitAPI = 8;
const imageLimit = 8;
const imgPerSlide = 3;

export async function imageLoader(): Promise<Product[] | undefined> {
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

const CarouselImagesTS: React.FC = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const onImgClick = (image: Image, index: number) => {
    navigate(`/products/${image.id}`);
  };

  return (
    <div className="carousel-container">
      <h2>Typescript Component</h2>
      <Carousel
        images={data.products}
        isLoading={false}
        imgPerSlide={imgPerSlide}
        imageLimit={imageLimit}
        onImgClick={onImgClick}
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

export default CarouselImagesTS;
