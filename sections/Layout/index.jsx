import { Header, Main } from "../";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Main>{children}</Main>
    </React.Fragment>
  );
};

export default Layout;
