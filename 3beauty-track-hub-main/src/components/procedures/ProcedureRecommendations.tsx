
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { Treatment } from '@/components/staff/types/staffTypes';
import { 
  CalendarDays, 
  User, 
  CheckCircle2,
  CircleAlert,
  Plus,
  Clock,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, addMonths } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useBranch } from '@/contexts/BranchContext';

// Define props interface
interface ProcedureRecommendationsProps {
  procedures: Treatment[];
  setProcedures: React.Dispatch<React.SetStateAction<Treatment[]>>;
  clientsMock: { id: string; name: string; phone: string }[];
  staffMembersMock: { id: number; name: string }[];
}

// Add a schema for recommendation form
const recommendationSchema = z.object({
  clientId: z.string().min(1, { message: "Необходимо выбрать клиента" }),
  staffId: z.string().min(1, { message: "Необходимо выбрать специалиста" }),
  procedureName: z.string().min(1, { message: "Необходимо указать название процедуры" }),
  notes: z.string().min(1, { message: "Необходимо добавить заметки" }),
  followupDate: z.string().min(1, { message: "Необходима дата" })
});

const ProcedureRecommendations = ({ 
  procedures, 
  setProcedures, 
  clientsMock, 
  staffMembersMock 
}: ProcedureRecommendationsProps) => {
  const [recommendedProcedures, setRecommendedProcedures] = useState<Treatment[]>([]);
  const [isAddingRecommendation, setIsAddingRecommendation] = useState(false);
  const { toast } = useToast();
  const { currentBranch } = useBranch();
  
  // Setup form with zod resolver
  const form = useForm<z.infer<typeof recommendationSchema>>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      clientId: "",
      staffId: "",
      procedureName: "",
      notes: "",
      followupDate: format(new Date(), 'yyyy-MM-dd')
    }
  });

  useEffect(() => {
    // Filter for procedures that need to be scheduled soon or need attention
    // And if current branch is selected, filter by branch too
    let filteredRecommendations = procedures.filter(
      proc => proc.status === 'schedule-soon' || proc.status === 'need-attention'
    );
    
    if (currentBranch) {
      filteredRecommendations = filteredRecommendations.filter(
        proc => !proc.branchId || proc.branchId === currentBranch.id
      );
    }
    
    setRecommendedProcedures(filteredRecommendations);
  }, [procedures, currentBranch]);

  const getClientName = (clientId: string) => {
    return clientsMock.find(c => c.id === clientId)?.name || "Неизвестный клиент";
  };

  const handleAddRecommendation = (data: z.infer<typeof recommendationSchema>) => {
    const staffMember = staffMembersMock.find(staff => staff.id === parseInt(data.staffId));
    
    const colors = ['beauty', 'teal', 'lavender'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)] as "beauty" | "teal" | "lavender";
    
    const newTreatment: Treatment = {
      id: `treatment-rec-${Date.now()}`,
      name: data.procedureName,
      clientId: data.clientId,
      date: "-", // Not performed yet
      nextDate: format(new Date(data.followupDate), "dd MMM yyyy"),
      staffId: parseInt(data.staffId),
      staffName: staffMember?.name || "Unknown Staff",
      notes: data.notes,
      productsUsed: [],
      progress: 0, // Not started
      status: "need-attention", // Needs user action
      color: randomColor,
      history: [],
      // Add branch ID if available
      branchId: currentBranch?.id
    };
    
    setProcedures(prev => [...prev, newTreatment]);
    setIsAddingRecommendation(false);
    form.reset();
    
    toast({
      title: "Рекомендация добавлена",
      description: `${newTreatment.name} для клиента ${getClientName(newTreatment.clientId)}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-beauty-800">Рекомендованные процедуры</h2>
        
        <Dialog open={isAddingRecommendation} onOpenChange={setIsAddingRecommendation}>
          <DialogTrigger asChild>
            <Button className="bg-beauty-500 hover:bg-beauty-600">
              <Plus className="h-4 w-4 mr-2" /> Добавить рекомендацию
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Добавить рекомендацию по процедуре</DialogTitle>
              <DialogDescription>
                Создайте рекомендацию для клиента на основе его потребностей и истории
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddRecommendation)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Клиент</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value} 
                          defaultValue=""
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите клиента" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clientsMock.map(client => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="staffId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Специалист</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          defaultValue=""
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите специалиста" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {staffMembersMock.map(staff => (
                              <SelectItem key={staff.id.toString()} value={staff.id.toString()}>
                                {staff.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="procedureName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название процедуры</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Название рекомендуемой процедуры" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="followupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Рекомендуемая дата</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Комментарий к рекомендации</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Почему эта процедура рекомендуется клиенту..." 
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsAddingRecommendation(false)}>
                    Отмена
                  </Button>
                  <Button type="submit" className="bg-beauty-500 hover:bg-beauty-600">
                    Сохранить
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {recommendedProcedures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedProcedures.map(procedure => (
            <Card key={procedure.id} className={`border-beauty-100 ${procedure.status === 'need-attention' ? 'ring-1 ring-beauty-300' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-beauty-900">{getClientName(procedure.clientId)}</h3>
                    <h4 className="text-lg font-semibold text-beauty-800">{procedure.name}</h4>
                  </div>
                  <Badge className={
                    procedure.status === 'need-attention'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-beauty-100 text-beauty-700'
                  }>
                    {procedure.status === 'need-attention' ? 'Требует внимания' : 'Запланировать скоро'}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-sm text-beauty-600 mb-2">
                  <div className="flex items-center">
                    {procedure.date !== "-" ? (
                      <>
                        <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                        <span>Последняя: {procedure.date}</span>
                      </>
                    ) : (
                      <>
                        <CircleAlert className="h-3.5 w-3.5 mr-1.5 text-beauty-500" />
                        <span>Новая рекомендация</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span className="text-beauty-700 font-medium">
                      Рекомендуется: {procedure.nextDate}
                    </span>
                  </div>
                </div>
                
                {procedure.notes && (
                  <div className="mt-3 bg-gray-50 p-2 rounded text-sm italic text-beauty-600 border-l-2 border-beauty-300">
                    "{procedure.notes}"
                  </div>
                )}
                
                <div className="flex justify-between mt-3 space-x-2">
                  <div className="text-xs text-beauty-600 flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {procedure.staffName}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-beauty-500 hover:bg-beauty-600"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Запланировать
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-beauty-200 text-beauty-600"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                {procedure.branchId && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Филиал: {procedure.branchId}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <AlertCircle className="h-12 w-12 mx-auto text-beauty-300 mb-3" />
          <h3 className="text-lg font-medium text-beauty-900 mb-1">Нет рекомендаций</h3>
          <p className="text-beauty-600 mb-4">
            В настоящее время нет рекомендуемых процедур для ваших клиентов
          </p>
          <Button 
            onClick={() => setIsAddingRecommendation(true)}
            className="bg-beauty-500 hover:bg-beauty-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить рекомендацию
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcedureRecommendations;
