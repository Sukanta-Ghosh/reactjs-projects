import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Product } from "./types";

export async function singleProductsLoader({
  params,
}: {
  params: { productId: string };
}): Promise<Product | undefined> {
  const { productId } = params;
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) {
      throw new Error("Faulty API");
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
}

const SingleProductDetails = () => {
  const product = useLoaderData() as Product;

  return (
    <div>
      <div className="product">
        <img src={product.thumbnail} />
        <div>Id: {product.id}</div>
        <div>Name: {product.title}</div>
        <div>Price: ${product.price}</div>
      </div>
      <Link to={-1 as any}>Go Back</Link>
    </div>
  );
};

export default SingleProductDetails;
