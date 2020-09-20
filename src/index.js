import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Scss/style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./Redux/Reducer/rootReducer";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import fbConfig from './Config/fbConfig';
import firebase from 'firebase/app';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A03037",
      dark: "#A02027",
      contrastText: "#5f6368",
    },
    secondary: {
      main: "#3371B5",
    },
  },
  typography: {
    fontFamily: "'Roboto',Ariel, sans-serif",
  },
});
  
const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig)
  )
  );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    
    <ReactReduxFirebaseProvider
      firebase={fbConfig}
      config={fbConfig}
      dispatch={store.dispatch}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
