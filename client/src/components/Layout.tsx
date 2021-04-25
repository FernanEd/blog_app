import Header from "./Header";
import Footer from "./Footer";

interface Props {}

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
