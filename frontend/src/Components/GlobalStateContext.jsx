// GlobalStateContext.jsx
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  promptText: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROMPT':
      return { ...state, promptText: action.payload };
    default:
      return state;
  }
}

const StateContext = createContext();
const DispatchContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);
