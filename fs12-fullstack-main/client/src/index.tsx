import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from 'reportWebVitals';
import App from 'components/routes/App';
import { store } from 'redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'index.css';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='921502896007-ugm5vnb4krk15vk2c65j2ldh04a3qi5m.apps.googleusercontent.com'>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
