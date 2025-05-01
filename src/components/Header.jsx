import { useSelector } from "react-redux";
import Topbar from "./ui/Topbar";
import Bottombar from "./ui/Bottombar";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Topbar isLoggedIn={isLoggedIn} />
      <Bottombar />
    </>
  );
};

export default Header;
