
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Gift } from "lucide-react";

interface ClientBonusesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientBonuses: number;
}

const ClientBonusesModal = ({ open, onOpenChange, clientBonuses }: ClientBonusesModalProps) => {
  const [bonusesToUse, setBonusesToUse] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Here you would send the request to use bonuses to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Бонусы активированы",
        description: `${bonusesToUse} бонусов будут применены к вашей следующей записи`,
      });
      
      // Reset form
      setBonusesToUse(500);
    }, 1000);
  };
  
  const maxBonuses = clientBonuses;
  const bonusPresets = [100, 500, 1000];
  
  const handleBonusPresetClick = (amount: number) => {
    if (amount <= maxBonuses) {
      setBonusesToUse(amount);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-beauty-500" />
            Использовать бонусы
          </DialogTitle>
          <DialogDescription>
            Используйте накопленные бонусы для получения скидки
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="bg-beauty-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Доступно бонусов:</span>
              <span className="font-bold">{clientBonuses}</span>
            </div>
            <div className="text-sm text-beauty-600">
              1 бонус = 1 рубль скидки на любую услугу
            </div>
          </div>
          
          <div>
            <Label htmlFor="bonusAmount">Сколько бонусов вы хотите использовать?</Label>
            <Input 
              id="bonusAmount"
              type="number"
              min="100"
              max={maxBonuses}
              value={bonusesToUse}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0 && value <= maxBonuses) {
                  setBonusesToUse(value);
                }
              }}
              className="mt-1"
            />
            <div className="text-sm text-beauty-600 mt-1">
              Минимум 100 бонусов, максимум {maxBonuses} бонусов
            </div>
          </div>
          
          <div>
            <Label>Быстрый выбор:</Label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {bonusPresets.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  disabled={preset > maxBonuses}
                  onClick={() => handleBonusPresetClick(preset)}
                  className={bonusesToUse === preset ? "border-beauty-500 bg-beauty-50" : ""}
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="bg-beauty-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Итоговая скидка:</span>
              <span className="text-lg font-bold text-beauty-600">{bonusesToUse} ₽</span>
            </div>
            <div className="text-sm text-beauty-600 mt-1">
              Будет применена к вашей следующей записи
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || bonusesToUse <= 0 || bonusesToUse > maxBonuses}
            className="bg-beauty-500 hover:bg-beauty-600"
          >
            {isSubmitting ? 'Применение...' : 'Применить бонусы'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientBonusesModal;
