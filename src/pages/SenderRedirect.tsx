import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { ROUTES } from "../constants/routes";

const SenderRedirect = () => {

  useEffect(() => {
    // log analytics
    ReactGA.event('redirect_from_scan');
  }, []);

  return (
    <Navigate to={ROUTES.HOME.path} replace />
  );
};

export default SenderRedirect;