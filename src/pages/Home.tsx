import LoremIpsum from "react-lorem-ipsum";
import { Link, Route, Routes } from "react-router-dom";
import Mirror from "../components/Apps/Mirror/Mirror";
import Text from "../components/Text/Text";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Team from "../components/Team/Team";
import { ROUTES } from "../constants/routes";
import { HOME_PARAGRAPHS } from "../constants/texts";
import { getCommit, getVersion } from "../utils/utils";
import SenderPage from "./Sender";

import "./Home.css";

const HomeContent = () => {
  return (
    <div>
      <div className="bg-black w-full p-3 z-20 relative border border-white rounded">
        <Text paragraphs={HOME_PARAGRAPHS}></Text>
        <div className="w-full mt-6 text-center">
          <Button className="">
            <Link to={ROUTES.MIRROR.path}>{ROUTES.MIRROR.name}</Link>
          </Button>
        </div>
      </div>
      <div className="w-fit mx-auto text-center mt-6 py-1 px-2 bg-black text-gray-400 text-xs border border-gray-400 rounded relative z-20">
        <p>{getVersion("Version:")}</p>
        <p>{getCommit()}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <Container className="mt-2 lg:mt-8">
      <Routes>
        <Route path={ROUTES.HOME.path} element={<HomeContent />} />
        {/* TODO: implement apps page */}
        {/* <Route path={ROUTES.APPS.path} element={<Apps />} /> */}
        <Route path={ROUTES.TEAM.path} element={<Team />} />
        <Route path={ROUTES.MIRROR.path} element={<Mirror />} />
        <Route
          path={ROUTES.MIRROR_WITH_RECEIVER_ID.path}
          element={<Mirror />}
        />
        <Route path={ROUTES.MIRROR_SENDER.path} element={<SenderPage />} />
      </Routes>
    </Container>
  );
};

export default HomePage;
