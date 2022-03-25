import classNames from "classnames";
import React, { useContext } from "react";
import AppContext from "../AppContext";

const LoadingTent = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <div
      className={classNames({
        "fixed w-full h-full left-0 top-0": true,
        hidden: !state.loading,
      })}
      style={{ backgroundColor: "#00000020" }}
    >
      <div className="animate-pulse flex space-x-4">
        <div className="h-1 w-full bg-blue-600"></div>
      </div>
    </div>
  );
};

export default LoadingTent;
