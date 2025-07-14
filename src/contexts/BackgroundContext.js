// contexts/BackgroundContext.js
import React, { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext();

const defaultBackground = '/assets/images/background/snow.jpg';

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);

