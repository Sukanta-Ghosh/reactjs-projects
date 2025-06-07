import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/">Dropdown Single</NavLink>
        <NavLink to="/dropdown-multiple">Dropdown Multiple</NavLink>
        <NavLink to="/todo">Todo App</NavLink>
        <NavLink to="/table">Paginated Table</NavLink>
        <NavLink to="/traffic-light">Traffic Light</NavLink>
      </header>

      {/* pages */}
      <Outlet />
    </div>
  );
};

export default Header;
