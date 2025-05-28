
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { Branch } from '../components/staff/types/staffTypes';

interface BranchContextType {
  branches: Branch[];
  currentBranch: Branch | null;
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  setCurrentBranch: (branch: Branch | null) => void;
  addBranch: (branch: Branch) => void;
  updateBranch: (updatedBranch: Branch) => void;
  deleteBranch: (branchId: number) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

// Sample initial branches data
const initialBranches: Branch[] = [
  {
    id: 1,
    name: "Центральный салон",
    address: "ул. Ленина, 10",
    phone: "+7 (900) 123-45-67",
    email: "central@beautysalon.com",
    description: "Главный салон сети с полным спектром услуг",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
    isActive: true,
    createdAt: new Date().toISOString(),
    color: "beauty"
  },
  {
    id: 2,
    name: "Салон на Западе",
    address: "ул. Пушкина, 25",
    phone: "+7 (900) 123-45-68",
    email: "west@beautysalon.com",
    description: "Современный салон в западном районе",
    image: "https://randomuser.me/api/portraits/lego/2.jpg",
    isActive: true,
    createdAt: new Date().toISOString(),
    color: "teal"
  },
  {
    id: 3,
    name: "Салон на Востоке",
    address: "ул. Гагарина, 15",
    phone: "+7 (900) 123-45-69",
    email: "east@beautysalon.com",
    description: "Уютный салон в восточном районе",
    image: "https://randomuser.me/api/portraits/lego/3.jpg",
    isActive: true,
    createdAt: new Date().toISOString(),
    color: "lavender"
  }
];

export const BranchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [currentBranch, setCurrentBranchState] = useState<Branch | null>(initialBranches[0]);

  const setCurrentBranch = (branch: Branch | null) => {
    setCurrentBranchState(branch);
    // Save to localStorage for persistence across page reloads
    if (branch) {
      localStorage.setItem('currentBranchId', branch.id.toString());
    } else {
      localStorage.removeItem('currentBranchId');
    }
  };

  const addBranch = (branch: Branch) => {
    setBranches(prev => [...prev, branch]);
  };

  const updateBranch = (updatedBranch: Branch) => {
    setBranches(prev => prev.map(b => 
      b.id === updatedBranch.id ? updatedBranch : b
    ));
    
    // Update currentBranch if it's the one being updated
    if (currentBranch?.id === updatedBranch.id) {
      setCurrentBranch(updatedBranch);
    }
  };

  const deleteBranch = (branchId: number) => {
    setBranches(prev => prev.filter(b => b.id !== branchId));
    
    // Reset currentBranch if it's the one being deleted
    if (currentBranch?.id === branchId) {
      setCurrentBranch(branches.find(b => b.id !== branchId) || null);
    }
  };

  // Initialize from localStorage on component mount
  React.useEffect(() => {
    const savedBranchId = localStorage.getItem('currentBranchId');
    if (savedBranchId) {
      const branchId = parseInt(savedBranchId, 10);
      const foundBranch = branches.find(b => b.id === branchId);
      if (foundBranch) {
        setCurrentBranchState(foundBranch);
      }
    }
  }, []);

  const contextValue = useMemo(() => ({
    branches,
    currentBranch,
    setBranches,
    setCurrentBranch,
    addBranch,
    updateBranch,
    deleteBranch
  }), [branches, currentBranch]);

  return (
    <BranchContext.Provider value={contextValue}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = (): BranchContextType => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};
