import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { WebSocketProvider } from 'app/contexts/WebSocketContext';
import "./index.css";
// import { ToastContainer } from 'react-toastify';

const root = createRoot(document.getElementById('root'));
const websocketUrl = "ws://10.10.2.29:3000";

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <WebSocketProvider url={websocketUrl}>
          <BrowserRouter >

            <App />
            {/* <ToastContainer /> */}
          </BrowserRouter>
        </WebSocketProvider>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
