import { Routes, Route, HashRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes';

import HomePage from './pages/Home';
import ReceiverPage from './pages/Receiver';
import { getCommit, getVersion } from './utils/utils';

// log version and commit
console.log(getVersion('VERSION:'));
console.log(getCommit(true));

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
