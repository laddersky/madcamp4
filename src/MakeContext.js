import React, { createContext, useState, useContext } from 'react';

const MakeContext = createContext();

export function useMakeContext() {
  return useContext(MakeContext);
}

export function MakeProvider({ children }) {
  const [makestate, setmakestate] = useState({
    "antibody": false,
    "pipette": false,
    "petridish": false,
    "steel": false,
    "tire": false,
    "oil": false,
    "coffee": false,
    "macbook": false,
    "glass": false,
    "visible" : false,

    "Vaccine" : false,
    "Car": false,
    "Computer Virus": false,
    "Airplane": false,
  });

  return (
    <MakeContext.Provider value={{ makestate, setmakestate }}>
      {children}
    </MakeContext.Provider>
  );
}
