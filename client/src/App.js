import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ApplicationRoutes from './routes/ApplicationRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  )
}

export default App;