import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";

import CarouselImages, {
  imageLoader,
} from "./projects/carousel-products-container";

import SingleProductDetails, {
  singleProductsLoader,
} from "./components-common/single-product-details";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/products",
        element: <CarouselImages />,
        loader: imageLoader,
      },
      {
        path: "/products/:productId",
        element: <SingleProductDetails />,
        loader: singleProductsLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
