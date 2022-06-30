import Providers from "@navigation";
import configureStore from "@store/configureStore";
import React from "react";
import { Provider } from "react-redux";

export const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  );
};

export default App;
