
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Building, ChevronDown } from 'lucide-react';
import { useBranch } from '@/contexts/BranchContext';
import { Button } from './button';
import { Badge } from './badge';

export function HeaderBranchSelector() {
  const { branches, currentBranch, setCurrentBranch } = useBranch();
  
  if (!branches || branches.length <= 1) return null;
  
  const activeBranches = branches.filter(branch => branch.isActive);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2 gap-1">
          <Building className="h-3.5 w-3.5" />
          <span className="max-w-[100px] truncate hidden sm:inline-block">
            {currentBranch?.name || "Выберите филиал"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <div className="px-4 py-2 border-b">
          <h4 className="font-medium text-sm">Филиалы</h4>
          <p className="text-xs text-muted-foreground">Выберите филиал для работы</p>
        </div>
        <div className="p-2">
          {activeBranches.map((branch) => (
            <Button
              key={branch.id}
              variant="ghost"
              className={`w-full justify-start text-left mb-1 ${currentBranch?.id === branch.id ? 'bg-accent' : ''}`}
              onClick={() => setCurrentBranch(branch)}
            >
              <div className={`w-2 h-full mr-2 bg-${branch.color}-500 rounded-full`}></div>
              <div>
                <span className="block">{branch.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {branch.address.split(',')[0]}
                </span>
              </div>
              {currentBranch?.id === branch.id && (
                <Badge variant="outline" className="ml-auto text-xs bg-accent-foreground/10">
                  Активен
                </Badge>
              )}
            </Button>
          ))}
        </div>
        <div className="p-2 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-left"
            onClick={() => window.location.href = '/branches'} 
          >
            Управление филиалами
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
