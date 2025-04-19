import React from "react";
import { useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="product"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img src={product.thumbnail} width="200" height="200" />
        <div className="info-decoration">Id: {product.id}</div>
        <div className="info-decoration">Name: {product.title}</div>
        <div className="info-decoration">Price: ${product.price}</div>
      </div>
    </div>
  );
};

export default ProductDisplay;
