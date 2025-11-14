import React, { createContext, useContext, useState } from 'react';
import { RouteStep, RouteStepInput } from '../types/RouteStep';
import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';


interface RouteContextType {
  route: RouteStep[];
  setRoute: React.Dispatch<React.SetStateAction<RouteStep[]>>; // for dragndrop
  appendRoute: (input: RouteStepInput) => void;
  editRouteStep: (step: RouteStep) => void;
  deleteStepFromRoute: (id: string) => void;
  importRoute: (route: RouteStep[]) => void;
  addDummyStep: () => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteStep[]>([]);

  const appendRoute = (input: RouteStepInput) => {
    const newId = uuidv5(input.name, uuidv5.DNS);
    if (route.filter((s) => s.id === newId).length > 0) return;
    const newStep: RouteStep = {
      ...input,
      id: newId
    };
    setRoute([...route, newStep]);
  };

  const editRouteStep = (updatedStep: RouteStep) => {
    setRoute((prev) =>
      prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
    );
  };

  const deleteStepFromRoute = (id: string) => {
    setRoute((prev) => prev.filter(s => s.id !== id));
  };

  const importRoute = (importedRoute: RouteStep[]) => {
    setRoute(importedRoute);
  }

  const addDummyStep = () => {
    setRoute([...route, {
      name: "This is a test",
      id: uuidv4(),
    }])
  }

  return (
    <RouteContext.Provider value={{ route, setRoute, appendRoute, editRouteStep, deleteStepFromRoute, importRoute, addDummyStep}}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) throw new Error('useRouteContext must be used within a RouteProvider');
  return context;
};