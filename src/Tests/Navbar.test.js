import React from "react";
import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navbar from "./../Components/Navbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Navbar", () => {
  const initialState = {
    auth: {
      authError: null,
    },
    snackbar: {
      snackbarStatus: false,
      snackbarMessage: "",
    },
    firebase: {
      auth: {
           uid: "01787837",
      },
    },
  };
  const mockStore = configureStore();
  let store;
  describe("Navbar Elements", () => {
    store = mockStore(initialState);
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
          <Router>
        <Provider store={store}>
          <Navbar />
        </Provider>
        </Router>
      ).find(Navbar);
    });

    it("check if search bar present", () => {
        // console.log(wrapper.debug());
        console.log(wrapper.find('.navbar-search').debug())
      expect(wrapper.find('.navbar-search').length).toBe(1);
    });
  });
});
