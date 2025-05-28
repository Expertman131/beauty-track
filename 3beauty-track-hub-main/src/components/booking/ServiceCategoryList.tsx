
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scissors, UserCheck, Paintbrush, Star } from "lucide-react";

export interface ServiceCategory {
  id: string;
  name: string;
  icon: "scissors" | "user-check" | "paintbrush" | "star";
  description: string;
}

interface ServiceCategoryListProps {
  categories: ServiceCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const iconMap = {
  "scissors": Scissors,
  "user-check": UserCheck,
  "paintbrush": Paintbrush,
  "star": Star,
};

const ServiceCategoryList: React.FC<ServiceCategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isSelected = category.id === selectedCategory;
          
          return (
            <Card 
              key={category.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'bg-beauty-50 dark:bg-beauty-900/20 border-beauty-200 dark:border-beauty-700' 
                  : 'bg-white dark:bg-gray-800 hover:bg-beauty-50/50 dark:hover:bg-beauty-900/10'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                  isSelected 
                    ? 'bg-beauty-100 dark:bg-beauty-800 text-beauty-700 dark:text-beauty-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isSelected ? 'text-beauty-800 dark:text-beauty-200' : ''
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ServiceCategoryList;
