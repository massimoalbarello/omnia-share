import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { MIRROR_PARAGRAPHS } from "../../../constants/texts";
import Button from "../../Button/Button";
import ParagraphsContainer from "../../ParagraphsContainer/ParagraphsContainer";


const Mirror = () => {
  return (
    <div className="bg-black w-full p-3 z-20 relative border border-white rounded">
      <ParagraphsContainer paragraphs={MIRROR_PARAGRAPHS} />
      <div className="w-full my-8 flex flex-row justify-evenly">
        <Button className="font-bold">
          <Link to={ROUTES.SCREEN_SHARING_SENDER.path}>{ROUTES.SCREEN_SHARING_SENDER.name}</Link>
        </Button>
        <Button className="font-bold">
          <Link to={ROUTES.SCREEN_SHARING_RECEIVER.path}>{ROUTES.SCREEN_SHARING_RECEIVER.name}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Mirror;