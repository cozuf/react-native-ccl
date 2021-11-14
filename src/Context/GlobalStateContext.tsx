import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useReducer,
} from 'react';

interface GlobalStateInterface {
  token: string;
}

const GlaobalStateContext = createContext<{
  state: GlobalStateInterface;
}>({ state: { token: '' } });

const GlobalStateDispatchContext = createContext<{
  setState: Dispatch<GlobalStateInterface>;
}>({
  setState: () => {},
});

const reducer = (
  state: GlobalStateInterface,
  newState: GlobalStateInterface
): GlobalStateInterface => {
  return { ...state, ...newState };
};

const GlobalStateProvider: FC<any> = ({ children }) => {
  const [state, setState] = useReducer(reducer, { token: '' });

  return (
    <GlaobalStateContext.Provider value={{ state }}>
      <GlobalStateDispatchContext.Provider value={{ setState }}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlaobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState = (): [
  GlobalStateInterface,
  Dispatch<GlobalStateInterface>
] => [
  useContext(GlaobalStateContext).state,
  useContext(GlobalStateDispatchContext).setState,
];
