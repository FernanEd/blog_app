import { Link } from "react-router-dom";

interface Props {}

const Header: React.FunctionComponent = ({}) => {
  return (
    <header id="main-header">
      <h1 id="logo" className="text-xl font-bold">
        FernanEd's Blog
      </h1>

      <nav>
        <Link to="/" className="text-white">
          Home
        </Link>
        <Link to="/" className="text-white">
          <button className="btn btn-success">Admin</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
