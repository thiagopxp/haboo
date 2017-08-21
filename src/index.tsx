import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./app/App";
import '@shopify/polaris/styles.scss';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app/App", () => {
    const NextApp = require<{default: typeof App}>("./app/App").default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootElement
    );
  });
}