import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import SenderPage from './pages/Sender';
import ReceiverPage from './pages/Receiver';
import HomePage from './pages/Home';

export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path='/sender' element={<SenderPage />} />
        <Route path='/receiver' element={<ReceiverPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
