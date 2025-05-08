import { useSelector } from "react-redux";
import Topbar from "./ui/Topbar";
import Bottombar from "./ui/Bottombar";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="sticky top-0 z-50">
      <Topbar isLoggedIn={isLoggedIn} />
      <Bottombar />
    </div>
  );
};

export default Header;
