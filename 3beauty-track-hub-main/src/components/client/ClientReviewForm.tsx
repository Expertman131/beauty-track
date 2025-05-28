
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

interface ReviewVisit {
  id: number;
  service: string;
  master: string;
  date: string;
  time?: string;
}

interface ClientReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visit: ReviewVisit | null;
}

const ClientReviewForm = ({ open, onOpenChange, visit }: ClientReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!visit) return;
    
    setIsSubmitting(true);
    
    // Here you would send the review to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Отзыв отправлен",
        description: "Спасибо за ваш отзыв! Он будет опубликован после модерации.",
      });
      
      // Reset form
      setRating(5);
      setReviewText('');
    }, 1000);
  };
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Оставить отзыв</DialogTitle>
          <DialogDescription>
            {visit ? `Поделитесь вашим мнением о процедуре "${visit.service}" у мастера ${visit.master}` : 'Загрузка...'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ваша оценка:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`h-8 w-8 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Ваш отзыв:</label>
            <Textarea 
              placeholder="Расскажите о вашем опыте..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              className="w-full resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Прикрепить фото (опционально):</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed hover:bg-beauty-50 hover:border-beauty-300 rounded-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg className="w-8 h-8 text-beauty-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="pt-1 text-sm text-beauty-500">Нажмите для загрузки</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-beauty-500 hover:bg-beauty-600"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientReviewForm;
