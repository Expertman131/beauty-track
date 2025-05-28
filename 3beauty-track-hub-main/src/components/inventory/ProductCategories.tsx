
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, FolderPlus, Plus, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";

interface Category {
  id: number;
  name: string;
  count: number;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Название категории должно содержать не менее 2 символов",
  }),
});

const ProductCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Основные товары", count: 9 },
    { id: 2, name: "Шампуни", count: 12 },
    { id: 3, name: "Краски для волос", count: 24 },
    { id: 4, name: "Кондиционеры", count: 7 },
    { id: 5, name: "Маски", count: 5 }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingInline, setEditingInline] = useState<number | null>(null);
  const [inlineValue, setInlineValue] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  
  const handleAddCategory = (data: z.infer<typeof formSchema>) => {
    const newCategory = {
      id: categories.length + 1,
      name: data.name,
      count: 0
    };
    
    setCategories([...categories, newCategory]);
    toast.success("Категория добавлена");
    setIsDialogOpen(false);
    form.reset();
  };
  
  const handleEditCategory = (data: z.infer<typeof formSchema>) => {
    if (editingCategory) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: data.name } : cat
      );
      
      setCategories(updatedCategories);
      toast.success("Категория обновлена");
      setIsDialogOpen(false);
      setEditingCategory(null);
      form.reset();
    }
  };
  
  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    form.setValue("name", category.name);
    setIsDialogOpen(true);
  };
  
  const startInlineEdit = (category: Category) => {
    setEditingInline(category.id);
    setInlineValue(category.name);
  };
  
  const saveInlineEdit = () => {
    if (editingInline) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingInline ? { ...cat, name: inlineValue } : cat
      );
      
      setCategories(updatedCategories);
      setEditingInline(null);
      toast.success("Категория обновлена");
    }
  };
  
  const cancelInlineEdit = () => {
    setEditingInline(null);
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-medium mb-4">Категории товаров</h2>
      <div className="space-y-1.5">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between group">
            {editingInline === category.id ? (
              <div className="flex items-center flex-1 pr-2">
                <Input 
                  value={inlineValue} 
                  onChange={(e) => setInlineValue(e.target.value)} 
                  className="h-7 text-sm py-1"
                  autoFocus
                />
                <div className="flex ml-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={saveInlineEdit}>
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={cancelInlineEdit}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="text-sm">{category.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{category.count}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => startInlineEdit(category)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>
        ))}
        <Button 
          variant="ghost" 
          className="w-full justify-center mt-2" 
          size="sm"
          onClick={() => {
            setEditingCategory(null);
            form.reset();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Добавить категорию
        </Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Изменить категорию" : "Добавить категорию"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editingCategory ? handleEditCategory : handleAddCategory)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название категории</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: Шампуни" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">
                  Отмена
                </Button>
                <Button type="submit">
                  {editingCategory ? "Сохранить" : "Добавить"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCategories;
