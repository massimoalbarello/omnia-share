import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SenderPage from './pages/Sender';
import ReceiverPage from './pages/Receiver';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div>
      <h1>Omnia Share</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/sender' element={<SenderPage />} />
          <Route path='/receiver' element={<ReceiverPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
