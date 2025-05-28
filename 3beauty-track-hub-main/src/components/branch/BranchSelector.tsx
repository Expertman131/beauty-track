
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useBranch } from '@/contexts/BranchContext';
import { Badge } from '@/components/ui/badge';
import { Home } from 'lucide-react';

interface BranchSelectorProps {
  minimal?: boolean;
  onChange?: (branchId: number) => void;
}

const BranchSelector = ({ minimal = false, onChange }: BranchSelectorProps) => {
  const { branches, currentBranch, setCurrentBranch } = useBranch();
  
  const activeBranches = branches.filter(branch => branch.isActive);
  
  const handleBranchChange = (value: string) => {
    const branchId = parseInt(value, 10);
    const branch = branches.find(b => b.id === branchId) || null;
    setCurrentBranch(branch);
    
    if (onChange) {
      onChange(branchId);
    }
  };
  
  if (minimal) {
    return (
      <Select 
        value={currentBranch?.id?.toString() || ""}
        onValueChange={handleBranchChange}
      >
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Выберите филиал" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Филиалы</SelectLabel>
            {activeBranches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id.toString()}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <Home className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Текущий филиал</span>
      </div>
      
      <Select 
        value={currentBranch?.id?.toString() || ""}
        onValueChange={handleBranchChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите филиал" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Активные филиалы</SelectLabel>
            {activeBranches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id.toString()}>
                <div className="flex items-center justify-between w-full">
                  <span>{branch.name}</span>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 ${
                      branch.color === 'beauty' 
                        ? 'bg-beauty-100 text-beauty-700 border-beauty-200' 
                        : branch.color === 'teal' 
                          ? 'bg-teal-100 text-teal-700 border-teal-200'
                          : 'bg-lavender-100 text-lavender-700 border-lavender-200'
                    }`}
                  >
                    {branch.address.split(',')[0]}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BranchSelector;
