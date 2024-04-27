/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getDogs, getDogById, createDog, deleteDog, updateDog } from "./DogFunctions";

const DogsContext = createContext();

function DogsProvider({ children }) {
  return (
    <DogsContext.Provider value={{ getDogs, getDogById, createDog, deleteDog, updateDog }}>
      {children}
    </DogsContext.Provider>
  );
}

export { DogsContext, DogsProvider };
