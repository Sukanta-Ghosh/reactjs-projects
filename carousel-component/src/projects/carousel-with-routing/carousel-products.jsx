import { useEffect, useState } from "react";
import "../../carousel-routing.css";
import ProductDisplay from "./product-display";
import { useLoaderData } from "react-router-dom";

// config
const itemPerSlide = 3;
const API_Products = "https://dummyjson.com/products";

export async function productsLoader() {
  try {
    const response = await fetch(API_Products);
    if (!response.ok) {
      throw new Error("Faulty API");
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
}

const CarouselProducts = () => {
  const [currentProductId, setCurrentProductId] = useState(0);

  const data = useLoaderData();
  const productsData = data.products;

  /* // Fetch from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Faulty API");
      }

      const json = await response.json();
      setProductsData(json.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); */

  const handleArrowClick = (config) => {
    if (config === "prev") {
      setCurrentProductId(currentProductId - itemPerSlide);
    } else {
      setCurrentProductId(currentProductId + itemPerSlide);
    }
  };
  return (
    <div>
      <h2 className="head-info">Products Carousel</h2>
      <div className="product-container">
        <div>
          {currentProductId > 1 && (
            <button
              className="arrow"
              onClick={() => handleArrowClick("prev")}
            >{`<`}</button>
          )}
        </div>
        {productsData
          ?.slice(currentProductId, currentProductId + itemPerSlide)
          .map((item) => {
            return <ProductDisplay product={item} key={item.id} />;
          })}
        <div>
          {currentProductId + 3 < productsData.length - 1 && (
            <button
              className="arrow"
              onClick={() => handleArrowClick("next")}
            >{`>`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselProducts;
