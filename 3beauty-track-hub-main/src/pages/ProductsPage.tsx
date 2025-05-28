
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/inventory/ProductList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, FileText, UploadCloud, Package2, Archive, FileSpreadsheet, Download, Plus } from "lucide-react";
import AddProductForm from '@/components/inventory/AddProductForm';
import { Card, CardContent } from "@/components/ui/card";
import ProductCategories from '@/components/inventory/ProductCategories';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(25);
  const [showArchived, setShowArchived] = useState(false);
  const [isExcelDialogOpen, setIsExcelDialogOpen] = useState(false);
  const [excelOperation, setExcelOperation] = useState<'import' | 'export' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExcelImport = () => {
    if (selectedFile) {
      toast.success("Импорт товаров из Excel успешно начат");
      setIsExcelDialogOpen(false);
      setSelectedFile(null);
    } else {
      toast.error("Пожалуйста, выберите файл");
    }
  };

  const handleExcelExport = () => {
    toast.success("Экспорт товаров в Excel успешно начат");
    setIsExcelDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold beauty-gradient-text">Товары</h1>
              <span className="text-sm text-muted-foreground ml-2">Склад</span>
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Операции с Excel
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={() => {
                    setExcelOperation('import');
                    setIsExcelDialogOpen(true);
                  }}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    <span>Импорт товаров</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setExcelOperation('export');
                    setIsExcelDialogOpen(true);
                  }}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Экспорт товаров</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Скачать шаблон Excel</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={() => setShowAddProduct(true)} className="flex items-center gap-2">
                <Package2 className="h-4 w-4" />
                Добавить товар
              </Button>
            </div>
          </div>

          {showAddProduct ? (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <AddProductForm 
                  onCancel={() => setShowAddProduct(false)} 
                  onSave={() => {
                    setShowAddProduct(false);
                    toast.success("Товар успешно добавлен");
                  }}
                  enableImageUpload={true} 
                />
              </CardContent>
            </Card>
          ) : (
            <div className="mb-8">
              <div className="flex flex-col space-y-4">
                <Input
                  placeholder="Поиск по названию товара, штрихкоду или артикулу"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-full"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {resultsPerPage} результатов на странице
                    </span>
                    <Button 
                      variant={showArchived ? "default" : "outline"} 
                      size="sm" 
                      className="ml-4 flex items-center gap-1"
                      onClick={() => setShowArchived(!showArchived)}
                    >
                      <Archive className="h-3.5 w-3.5" />
                      {showArchived ? "Скрыть архивные" : "Показать архивные"}
                    </Button>
                  </div>
                  <Button variant="default">Показать</Button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h2 className="font-medium mb-4">Действия</h2>
                  <div className="space-y-2">
                    <Button variant="default" className="w-full justify-start" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Быстрое управление
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <Archive className="mr-2 h-4 w-4" />
                      Архивировать выбранные
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h2 className="font-medium mb-4">Архив товаров</h2>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => setShowArchived(!showArchived)}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Просмотреть архив
                  </Button>
                </div>
                
                <ProductCategories />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <ProductList 
                searchQuery={searchQuery} 
                showArchived={showArchived} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Excel Operations Dialog */}
      <Dialog open={isExcelDialogOpen} onOpenChange={setIsExcelDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {excelOperation === 'import' ? 'Импорт товаров из Excel' : 'Экспорт товаров в Excel'}
            </DialogTitle>
            <DialogDescription>
              {excelOperation === 'import' 
                ? 'Загрузите Excel-файл для импорта товаров. Формат файла должен соответствовать шаблону.' 
                : 'Выберите параметры для экспорта товаров в Excel-файл.'}
            </DialogDescription>
          </DialogHeader>

          {excelOperation === 'import' && (
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="excel-file" className="text-sm font-medium">
                  Файл Excel
                </label>
                <Input 
                  id="excel-file" 
                  type="file" 
                  accept=".xlsx,.xls" 
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Выбран файл: {selectedFile.name}
                </p>
              )}
            </div>
          )}

          {excelOperation === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-archived" className="rounded border-gray-300" />
                <label htmlFor="include-archived" className="text-sm font-medium">
                  Включить архивные товары
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-images" className="rounded border-gray-300" />
                <label htmlFor="include-images" className="text-sm font-medium">
                  Включить ссылки на изображения
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExcelDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={excelOperation === 'import' ? handleExcelImport : handleExcelExport}>
              {excelOperation === 'import' ? 'Импортировать' : 'Экспортировать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
