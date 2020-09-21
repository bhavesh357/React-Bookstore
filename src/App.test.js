import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

test('renders learn react link', () => {
  const initialState = { 
    auth: {
      uid: null,
      authError: null,
    },
    snackbar : {
      snackbarStatus: false,
      snackbarMessage: "",
    },
    firebase: {
      auth: {

      }
    }
   };
  const mockStore = configureStore();
  let store=  mockStore(initialState);
  const { getByText } = render(<Provider store={store}><App /> </Provider> );
  const bookstore = getByText(/Bookstore/i);
  expect(bookstore).toBeInTheDocument();
});
