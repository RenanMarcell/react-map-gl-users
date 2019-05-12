import React from "react";
import { Provider } from "react-redux";

import store from './stores';
import MapContainer from './containers/MapContainer';

const App = () => (
    <Provider store={store}>
      <MapContainer />
    </Provider>
);

export default App;