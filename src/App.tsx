/* eslint-disable @typescript-eslint/ban-types */
import React, { useReducer } from "react";
import AppContext from "./AppContext";
import AppRoutes from "./AppRoutes";
import "./index.css";
import AppReducer, { initialState } from "./stores/reducers/AppReducer";

const App = (): React.ReactElement => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <AppRoutes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
