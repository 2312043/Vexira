import { Outlet, NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(){
  return (
      <>
        <nav className="topnav">
          <div className="logo">
            <img src="src/assets/logo-black.png" alt="Logo" />
          </div>
          <div>
            <NavLink to="/watchlist" activeClassName="active">Watchlist</NavLink>
            <NavLink to="/coins" activeClassName="active">Coins</NavLink>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
          </div>
        </nav>
  
        <Outlet />
      </>
  )
}

export default Menu;
