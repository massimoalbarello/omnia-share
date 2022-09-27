import { Routes, Route, HashRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import ReactGA from "react-ga4";

import HomePage from './pages/Home';
import ReceiverPage from './pages/Receiver';
import { getCommit, getVersion } from './utils/utils';

// log version and commit
console.log(getVersion('VERSION:'));
console.log(getCommit(true));

// ip anonymization parameter is not needed anymore in GA4
// see https://support.google.com/analytics/answer/9019185#IP
ReactGA.initialize(process.env['REACT_APP_GA_MEASUREMENT_ID'] || '');

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path={ROUTES.SCREEN_SHARING_RECEIVER.path} element={<ReceiverPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
