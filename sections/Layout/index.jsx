import { Header, Main } from "../";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Layout;
