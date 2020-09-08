/**
 * @intro: main.
 */
import React from 'react'
import ReactDom from 'react-dom'
import App from './pages/_app'

export default (Component) => {

  window.onload = () => {
    const state = window.__STATE__INIT__
    ReactDom.hydrate(<App Component={Component} pageProps={state}/>, document.getElementById('app-main'))
  }
}
