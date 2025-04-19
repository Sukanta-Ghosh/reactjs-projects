import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <NavLink to="/">Dropdown Single</NavLink>
        <NavLink to="/dropdown-multiple">Dropdown Multiple</NavLink>
        <NavLink to="/todo">Todo App</NavLink>
      </header>

      {/* pages */}
      <Outlet />
    </div>
  );
};

export default Header;
