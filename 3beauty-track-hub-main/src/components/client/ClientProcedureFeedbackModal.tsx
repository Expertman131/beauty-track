
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TreatmentFeedback, Treatment } from '../staff/types/staffTypes';

interface ClientProcedureFeedbackModalProps {
  treatment: Treatment;
  onSubmitFeedback: (feedback: Omit<TreatmentFeedback, 'id'>) => void;
  trigger?: React.ReactNode;
}

export function ClientProcedureFeedbackModal({ 
  treatment,
  onSubmitFeedback,
  trigger
}: ClientProcedureFeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    if (!comment.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, напишите комментарий к вашей оценке",
        variant: "destructive"
      });
      return;
    }

    const feedback: Omit<TreatmentFeedback, 'id'> = {
      treatmentId: treatment.id,
      clientId: treatment.clientId,
      staffId: treatment.staffId,
      date: new Date().toLocaleDateString(),
      rating,
      comment,
      isPublic: true
    };

    onSubmitFeedback(feedback);
    setRating(5);
    setComment("");
    setOpen(false);
    
    toast({
      title: "Отзыв отправлен",
      description: "Спасибо за ваш отзыв о процедуре"
    });
  };

  // Function to render rating stars
  const renderRatingStars = (count: number, selected: number, onSelect: (rating: number) => void) => {
    return Array.from({ length: count }, (_, i) => i + 1).map((star) => (
      <Button
        key={star}
        type="button"
        variant="ghost"
        size="sm"
        className={`p-0 ${star <= selected ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => onSelect(star)}
      >
        <Star className="h-6 w-6" fill={star <= selected ? 'currentColor' : 'none'} />
      </Button>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            Оставить отзыв
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Отзыв о процедуре</DialogTitle>
          <DialogDescription>
            Поделитесь своим мнением о процедуре "{treatment.name}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ваша оценка</label>
            <div className="flex justify-center">
              {renderRatingStars(5, rating, setRating)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Ваш комментарий</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Опишите свои впечатления, результаты и общее впечатление от процедуры..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleSubmit}>Отправить отзыв</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClientProcedureFeedbackModal;
