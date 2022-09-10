import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SenderPage from './pages/Sender';
import ReceiverPage from './pages/Receiver';
import HomePage from './pages/Home';

export interface IAppProps { }

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path='/sender' element={<SenderPage />} />
        <Route path='/receiver' element={<ReceiverPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
