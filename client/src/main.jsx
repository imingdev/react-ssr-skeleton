import React from 'react';
import ReactDom from 'react-dom';

export default (App, Component) => {
  // eslint-disable-next-line
  const state = window.__INITIAL_STATE__;
  const mainEl = document.getElementById('app-main');
  const AppComponent = <App Component={Component} pageProps={state}/>;

  if (state) {
    ReactDom.hydrate(AppComponent, mainEl);
  } else {
    ReactDom.render(AppComponent, mainEl);
  }
};
