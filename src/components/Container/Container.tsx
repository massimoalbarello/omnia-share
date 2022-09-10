import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container as TSParticlesContainer, Engine } from "tsparticles-engine";
import { PARTICLES_OPTIONS } from "../../constants/particles";

interface IProps {
  className: React.HTMLAttributes<HTMLDivElement>['className'];
  children?: React.ReactNode;
};

const Container: React.FC<IProps> = ({ className, children }) => {

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
        {children}
      </div>
    </div>
  );
};

export default Container;