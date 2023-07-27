import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

export function useMapContext() {
  return useContext(MapContext);
}

export function MapProvider({ children }) {
  const [mapstate, setmapstate] = useState({
    "where": 0,
    "visible": false,
  });

  return (
    <MapContext.Provider value={{ mapstate, setmapstate }}>
      {children}
    </MapContext.Provider>
  );
}
