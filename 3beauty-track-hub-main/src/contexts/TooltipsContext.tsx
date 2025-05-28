
import React, { createContext, useContext, useState, useEffect } from 'react';

type TooltipsContextType = {
  showTutorialTooltips: boolean;
  toggleTutorialTooltips: () => void;
  completedTutorials: string[];
  markTutorialAsComplete: (tutorialId: string) => void;
  resetCompletedTutorials: () => void;
};

const TooltipsContext = createContext<TooltipsContextType | undefined>(undefined);

export const TooltipsProvider = ({ children }: { children: React.ReactNode }) => {
  const [showTutorialTooltips, setShowTutorialTooltips] = useState<boolean>(() => {
    const saved = localStorage.getItem('showTutorialTooltips');
    return saved === null ? true : JSON.parse(saved);
  });
  
  const [completedTutorials, setCompletedTutorials] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedTutorials');
    return saved ? JSON.parse(saved) : [];
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('showTutorialTooltips', JSON.stringify(showTutorialTooltips));
  }, [showTutorialTooltips]);
  
  useEffect(() => {
    localStorage.setItem('completedTutorials', JSON.stringify(completedTutorials));
  }, [completedTutorials]);

  const toggleTutorialTooltips = () => {
    setShowTutorialTooltips(prev => !prev);
  };
  
  const markTutorialAsComplete = (tutorialId: string) => {
    if (!completedTutorials.includes(tutorialId)) {
      setCompletedTutorials(prev => [...prev, tutorialId]);
    }
  };
  
  const resetCompletedTutorials = () => {
    setCompletedTutorials([]);
  };

  return (
    <TooltipsContext.Provider 
      value={{ 
        showTutorialTooltips, 
        toggleTutorialTooltips,
        completedTutorials,
        markTutorialAsComplete,
        resetCompletedTutorials
      }}
    >
      {children}
    </TooltipsContext.Provider>
  );
};

export const useTooltips = (): TooltipsContextType => {
  const context = useContext(TooltipsContext);
  if (context === undefined) {
    throw new Error('useTooltips must be used within a TooltipsProvider');
  }
  return context;
};
