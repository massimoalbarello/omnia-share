import LoremIpsum from "react-lorem-ipsum";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import Button from "../../Button/Button";

const Mirror = () => {
  return (
    <div className="bg-black w-full p-3 z-20 relative border border-white rounded">
      <LoremIpsum random={false} />
      <div className="w-full my-8 flex flex-row justify-evenly">
        <Button className="font-bold">
          <Link to={ROUTES.MIRROR_SENDER.path}>{ROUTES.MIRROR_SENDER.name}</Link>
        </Button>
        <Button className="font-bold">
          <Link to={ROUTES.MIRROR_RECEIVER.path}>{ROUTES.MIRROR_RECEIVER.name}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Mirror;