import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';

// Init F7 React Plugin
Framework7.use(Framework7React);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
