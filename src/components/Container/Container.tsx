import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container as TSParticlesContainer, Engine } from "tsparticles-engine";
import { ROUTES } from "../../constants/routes";
import icon from '../../assets/images/icon.png';
import logo from '../../assets/images/logo.png';
import Menu from "../Menu/Menu";
import { useParticlesOptions } from "../../hooks/useParticlesOptions";

interface IProps {
  className: React.HTMLAttributes<HTMLDivElement>['className'];
  children?: React.ReactNode;
};

const Container: React.FC<IProps> = ({ className, children }) => {
  const particlesOptions = useParticlesOptions();

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
        options={particlesOptions}
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
        <div className="lg:flex lg:mx-10 flex-row justify-end items-center">
          <div className="w-full lg:w-1/2 px-3">
            <div className="w-full">
              <Link
                to={ROUTES.HOME.path}
                className="relative z-20"
              >
                <img
                  src={logo}
                  className="w-full"
                  alt="logo"
                />
              </Link>
            </div>
            <Menu />
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