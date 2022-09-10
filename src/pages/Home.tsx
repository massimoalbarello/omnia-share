import { useLayoutEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Route, Routes } from 'react-router-dom';
import icon from '../assets/images/icon.png';
import logo from '../assets/images/logo.png';
import Apps from '../components/Apps/Apps';
import Container from '../components/Container/Container';
import Team from '../components/Team/Team';
import { ROUTES } from '../constants/routes';

import './Home.css';

const HomePage = () => {
  const logoImgRef = useRef<HTMLImageElement>(null);
  const [linksContainerHeight, setLinksContainerHeight] = useState(0);
  const isLg = useMediaQuery({minWidth: 1024});

  useLayoutEffect(() => {
    setLinksContainerHeight(logoImgRef?.current?.height || 0);
  }, []);

  return (
    <Container className="mt-2 lg:mt-8">
      <img
        src={icon}
        className="opacity-30 absolute -bottom-0 z-0 hidden lg:block"
        style={{
          width: 'calc(83% / 2)',
          minWidth: 600,
          height: 'auto',
          left: '-5%'
        }}
        alt="icon"
      />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full xl:w-9/12">
          <div
            className="flex flex-row items-center justify-evenly underline my-3 lg:my-0 text-2xl lg:text-3xl"
            style={isLg ? {
              height: linksContainerHeight,
            }: undefined}
          >
            <Link
              to={ROUTES.APPS.path}
              className=""
            >
              {ROUTES.APPS.name}
            </Link>
            <Link
              to={ROUTES.TEAM.path}
            >
              {ROUTES.TEAM.name}
            </Link>
          </div>
        </div>
        <div className="w-full px-3">
          <div className="w-full">
            <img
              ref={logoImgRef}
              src={logo}
              className="w-full"
              alt="logo"
            />
          </div>
          <div className="mt-6">
            <Routes>
              <Route path={ROUTES.APPS.path} element={<Apps />} />
              <Route path={ROUTES.TEAM.path} element={<Team />} />
            </Routes>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
