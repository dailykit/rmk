import React from "react";

const UserContext = React.createContext();

const state = {
  zip: ""
};

const reducers = (state, { type, payload }) => {
  switch (type) {
    case "ZIP":
      return {
        ...state,
        zip: payload.value
      };
    default:
      return state;
  }
};

export { UserContext, state, reducers };
