import React from "react";
import { NavLink, Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {/* Header */}
      <header className="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Carousel Products</NavLink>
        <NavLink to="/products-ts">Carousel Typescript</NavLink>
        <NavLink to="/slice-carousal">Slice Carousel</NavLink>
      </header>

      {isLoading && <h3>Loading...</h3>}

      {/* Child Pages */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
