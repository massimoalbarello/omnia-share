import { useMemo } from "react";
import { PARTICLES_OPTIONS } from "../constants/particles";
import { useQueryParams } from "./useQueryParams";

export const useParticlesOptions = () => {
  const params = useQueryParams();
  const particlesNumber = parseInt(params.get('particlesNumber') || '60');

  const opts = useMemo(() => {
    return {
      ...PARTICLES_OPTIONS,
      particles: {
        ...PARTICLES_OPTIONS?.particles,
        number: {
          ...PARTICLES_OPTIONS?.particles?.number,
          value: particlesNumber,
        }
      }
    };
  }, [particlesNumber]);

  return opts;
};