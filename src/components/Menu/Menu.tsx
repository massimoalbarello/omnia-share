import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useQueryParams } from "../../hooks/useQueryParams";
import Button from "../Button/Button";

const Menu = () => {
  const params = useQueryParams();
  const hideMenu = params.get('hideMenu') === 'true';

  if (hideMenu) {
    return <></>;
  }

  return (
    <div
      className="flex flex-row items-center justify-evenly my-3 lg:my-0 text-2xl lg:text-3xl relative z-20"
    >
      <Button className="">
        <Link
          to={ROUTES.HOME.path}
        >
          {ROUTES.HOME.name}
        </Link>
      </Button>
      <Button className="">
        <Link
          to={ROUTES.TEAM.path}
        >
          {ROUTES.TEAM.name}
        </Link>
      </Button>
    </div>
  );
};

export default Menu;