import { useContext } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../App";

interface Props {}

const Header: React.FunctionComponent = ({}) => {
  const currentUser = useContext(currentUserContext);

  return (
    <header id="main-header">
      <h1 id="logo" className="text-3xl font-bold">
        Noobie Blog
      </h1>

      <nav>
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/admin" className="text-white">
          <button className="btn btn-success">Admin</button>
        </Link>
        {currentUser.isLogged && (
          <button className="btn btn-secondary" onClick={currentUser.logout}>
            Log out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
