import React, { createContext, useState, useContext } from 'react';

const ScreenContext = createContext();

export const useScreenContext = () => {
  return useContext(ScreenContext);
};

export const ScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('entry'); // Initial value
  return (
    <ScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

