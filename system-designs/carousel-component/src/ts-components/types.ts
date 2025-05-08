import React from "react";
export interface Image {
  id: string | number;
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface CarouselProps {
  images: Image[];
  isLoading: boolean;
  imageLimit: number;
  imgPerSlide: number;
  onImgClick?: (image: Image, index: number) => void;
  customPrevButton?: (onClick: () => void) => JSX.Element;
  customNextButton?: (onClick: () => void) => JSX.Element;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}
