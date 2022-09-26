import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useQueryParams } from "../../hooks/useQueryParams";

const Menu = () => {
  const params = useQueryParams();
  const hideMenu = params.get('hideMenu') === 'true';

  if (hideMenu) {
    return <></>;
  }

  return (
    <div
      className="flex flex-row items-center justify-evenly my-3 lg:my-0 text-xl lg:text-3xl relative z-20 uppercase"
    >
      <NavLink
        to={ROUTES.HOME.path}
        className={({ isActive }) =>
          isActive ? 'bg-black border-2 border-white border-solid px-2' : 'bg-white text-black px-2'
        }
      >
        {ROUTES.HOME.name}
      </NavLink>
      <NavLink
        to={ROUTES.TEAM.path}
        className={({ isActive }) =>
          isActive ? 'bg-black border-2 border-white border-solid px-2' : 'bg-white text-black px-2'
        }
      >
        {ROUTES.TEAM.name}
      </NavLink>
    </div>
  );
};

export default Menu;