
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, List, Package, PackagePlus, Receipt, Clipboard } from "lucide-react";
import ProductArrival from './ProductArrival';
import ProductSale from './ProductSale';
import ProductTransfer from './ProductTransfer';
import WriteOffForm from './WriteOffForm';
import InventoryCheck from './InventoryCheck';
import { toast } from "sonner";

interface InventoryOperationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operationType?: 'arrival' | 'sale' | 'transfer' | 'writeoff' | 'inventory';
}

const InventoryOperations = ({ 
  open, 
  onOpenChange,
  operationType = 'arrival'
}: InventoryOperationsProps) => {
  const [activeTab, setActiveTab] = useState<'arrival' | 'sale' | 'transfer' | 'writeoff' | 'inventory'>(operationType);

  // Create a wrapper function for setActiveTab that validates the value
  const handleTabChange = (value: string) => {
    // Only set the active tab if the value is one of the valid operation types
    if (value === 'arrival' || value === 'sale' || value === 'transfer' || value === 'writeoff' || value === 'inventory') {
      setActiveTab(value);
    }
  };

  const handleSave = () => {
    let message = '';
    
    switch (activeTab) {
      case 'arrival':
        message = 'Поступление товаров успешно сохранено';
        break;
      case 'sale':
        message = 'Продажа успешно оформлена';
        break;
      case 'transfer':
        message = 'Перемещение товаров успешно выполнено';
        break;
      case 'writeoff':
        message = 'Списание товаров успешно сохранено';
        break;
      case 'inventory':
        message = 'Инвентаризация успешно завершена';
        break;
    }
    
    toast.success(message);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="arrival" className="flex flex-col items-center py-2 gap-1">
                <PackagePlus className="h-5 w-5" />
                <span className="text-xs">Поступление</span>
              </TabsTrigger>
              <TabsTrigger value="sale" className="flex flex-col items-center py-2 gap-1">
                <Receipt className="h-5 w-5" />
                <span className="text-xs">Продажа</span>
              </TabsTrigger>
              <TabsTrigger value="transfer" className="flex flex-col items-center py-2 gap-1">
                <ArrowRightLeft className="h-5 w-5" />
                <span className="text-xs">Перемещение</span>
              </TabsTrigger>
              <TabsTrigger value="writeoff" className="flex flex-col items-center py-2 gap-1">
                <List className="h-5 w-5" />
                <span className="text-xs">Списание</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex flex-col items-center py-2 gap-1">
                <Clipboard className="h-5 w-5" />
                <span className="text-xs">Инвентаризация</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="arrival">
              <ProductArrival onCancel={handleCancel} onSave={handleSave} />
            </TabsContent>
            
            <TabsContent value="sale">
              <ProductSale onCancel={handleCancel} onSave={handleSave} />
            </TabsContent>
            
            <TabsContent value="transfer">
              <ProductTransfer onCancel={handleCancel} onSave={handleSave} />
            </TabsContent>
            
            <TabsContent value="writeoff">
              <WriteOffForm onCancel={handleCancel} onSave={handleSave} />
            </TabsContent>
            
            <TabsContent value="inventory">
              <InventoryCheck onCancel={handleCancel} onSave={handleSave} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryOperations;
