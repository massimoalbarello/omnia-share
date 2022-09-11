import { ParticlesProps } from "react-tsparticles";

export const PARTICLES_OPTIONS: ParticlesProps['options'] = {
  fps_limit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: false,
      },
      resize: true
    },
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 200,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      bounce: false,
      direction: "none",
      enable: true,
      outMode: "out",
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 60
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
};
