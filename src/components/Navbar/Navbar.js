import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="navbar_container">
      <div className="navbar_items_left">
        <li className="navbar_item logo">
          <Link to="/" style={{ color: "red" }}>
            SHINFLIX
          </Link>
        </li>
      </div>
      <div className="navbar_items_right">
        {/* <li className="navbar_item">Login</li> */}
      </div>
    </ul>
  );
};

export default Navbar;
