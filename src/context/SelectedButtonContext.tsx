import React, { createContext, useContext, useState, ReactNode } from 'react';

type SelectedButtonContextType = {
  selectedButton: string;
  setSelectedButton: (button: string) => void;
};

const SelectedButtonContext = createContext<SelectedButtonContextType | undefined>(undefined);

export const useSelectedButton = () => {
  const context = useContext(SelectedButtonContext);
  if (context === undefined) {
    throw new Error('useSelectedButton must be used within a SelectedButtonProvider');
  }
  return context;
};

interface SelectedButtonProviderProps {
  children: ReactNode;
}

export const SelectedButtonProvider: React.FC<SelectedButtonProviderProps> = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState('All');

  return (
    <SelectedButtonContext.Provider value={{ selectedButton, setSelectedButton }}>
      {children}
    </SelectedButtonContext.Provider>
  );
}; 