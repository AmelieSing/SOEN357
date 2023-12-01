import { Link } from "react-router-dom";
import Logout from "./Logout";
const Navbar = () => {
    return(
      <>
        <link rel="stylesheet" type="text/css" href="navbar.scss"></link>
        <nav>
          <ul id="MenuItems">
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/profile">Account</Link>
            </li>
            <li>
              <Link onClick={Logout} to="/">
                <i className="fas fa-sign-out-alt" />{" "}
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
}

export default Navbar;