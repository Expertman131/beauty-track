
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTooltips } from '@/contexts/TooltipsContext';

interface TutorialTooltipProps {
  id: string;
  title: string;
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  isPermanent?: boolean;
}

export const TutorialTooltip = ({
  id,
  title,
  content,
  children,
  className = "",
  side = "right",
  isPermanent = false,
}: TutorialTooltipProps) => {
  const { showTutorialTooltips, completedTutorials, markTutorialAsComplete } = useTooltips();
  const [dismissed, setDismissed] = useState(false);
  
  // Check if this tutorial is already completed
  const isCompleted = completedTutorials.includes(id);
  
  if ((!showTutorialTooltips || isCompleted || dismissed) && !isPermanent) {
    return <>{children}</>;
  }
  
  // For permanent tooltips that use the icon approach
  if (isPermanent) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        {children}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost" 
              size="icon"
              className="ml-1 h-5 w-5 rounded-full p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Помощь</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} className="max-w-xs">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{content}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }
  
  // For dismissable tutorial tooltips
  return (
    <HoverCard open>
      <HoverCardTrigger asChild>
        <div className={`relative inline-flex ${className}`}>
          {children}
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <Badge variant="outline" className="h-4 w-4 rounded-full bg-primary p-0"></Badge>
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side={side} align="start" className="w-80 bg-popover p-4 text-popover-foreground shadow-md">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{title}</h4>
            <Badge variant="outline" className="px-2 py-1 text-xs">
              Подсказка
            </Badge>
          </div>
          <div className="text-sm">{content}</div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs" 
              onClick={() => {
                setDismissed(true);
                markTutorialAsComplete(id);
              }}
            >
              Понятно
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
