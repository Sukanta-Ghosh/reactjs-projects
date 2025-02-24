import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./use-intersection-observer";

// API URL
const API_URL = "https://dummyjson.com/products?limit=10";
const IntersectionObserverInfinite = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  const fetchProducts = async () => {
    if (loading) return; // Prevent duplicate API calls

    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}`
      );
      const data = await response.json();
      console.log(data);

      setProducts(data.products);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const intersectionEntry = useIntersectionObserver(observerRef, options);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (intersectionEntry?.isIntersecting) {
      fetchProducts();
    }
  }, [intersectionEntry]);

  return (
    <>
      <h2>Infinite Scrolling</h2>
      <main className="products">
        {products?.map((item) => {
          return (
            <span key={item.sku} className="products__single">
              <img src={item.thumbnail} alt={item.title} loading="lazy" />
              <span>{item.title}</span>
            </span>
          );
        })}
      </main>
      {loading && <h3>Loading...</h3>}
      <footer ref={observerRef}>Footer</footer>
    </>
  );
};

export default IntersectionObserverInfinite;
