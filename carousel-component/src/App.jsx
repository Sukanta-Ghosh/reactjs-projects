import "./App.css";
import AppLayout from "./layouts/app-layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CarouselImages, {
  imageLoader,
} from "./projects/carousel-image-length/carousel-container";
import CarouselProducts, {
  productsLoader,
} from "./projects/carousel-non-modular-compo/carousel-container-products";
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
        element: <CarouselProducts />,
        loader: productsLoader,
      },
      {
        path: "/products/:productId",
        element: <SingleProductDetails />,
        loader: singleProductsLoader,
      },
      {
        path: "/image",
        element: <CarouselImages />,
        loader: imageLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
