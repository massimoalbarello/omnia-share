import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container as TSParticlesContainer, Engine } from "tsparticles-engine";
import { PARTICLES_OPTIONS } from "../../constants/particles";
import { ROUTES } from "../../constants/routes";
import icon from '../../assets/images/icon.png';
import logo from '../../assets/images/logo.png';
import Button from "../Button/Button";

interface IProps {
  className: React.HTMLAttributes<HTMLDivElement>['className'];
  children?: React.ReactNode;
};

const Container: React.FC<IProps> = ({ className, children }) => {
  const logoImgRef = useRef<HTMLImageElement>(null);
  const [linksContainerHeight, setLinksContainerHeight] = useState(0);
  const isLg = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    console.log(logoImgRef?.current?.height);
    setLinksContainerHeight(logoImgRef?.current?.height || 0);
  }, [logoImgRef]);

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: TSParticlesContainer | undefined) => {
    console.log(container);
  }, []);

  return (
    <div className={"w-full " + className}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={PARTICLES_OPTIONS}
      />
      <div className="z-1">
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
              className="flex flex-row items-center justify-evenly my-3 lg:my-0 text-2xl lg:text-3xl relative z-20"
              style={isLg ? {
                height: linksContainerHeight,
              } : undefined}
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
          </div>
          <div className="w-full px-3">
            <div className="w-full">
              <Link
                to={ROUTES.HOME.path}
                className="relative z-20"
              >
                <img
                  ref={logoImgRef}
                  src={logo}
                  className="w-full"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;