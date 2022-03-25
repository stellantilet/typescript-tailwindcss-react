import classNames from "classnames";
import { ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const LinkItem = ({ to, children }: { to: string; children: ReactNode }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={classNames({
        "mx-4 px-4 py-2 text-white hover:bg-indigo-600 rounded": true,
        "bg-indigo-700": location.pathname === to,
        "bg-indigo-500": location.pathname !== to,
      })}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const params = useParams();
  return (
    <div className="container py-6 px-4 mx-auto flex justify-center">
      <LinkItem to={`/${params.username}`}>Profile</LinkItem>
      <LinkItem to={`/${params.username}/products`}>Products</LinkItem>
      <LinkItem to={`/`}>Users</LinkItem>
    </div>
  );
};

export default Header;
