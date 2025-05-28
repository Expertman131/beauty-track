
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Archive, ArchiveRestore, Image as ImageIcon, CheckSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface ProductListProps {
  searchQuery: string;
  showArchived?: boolean;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  unit: string;
  imageUrl?: string;
  isArchived?: boolean;
}

const ProductList = ({ searchQuery, showArchived = false }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Шампунь Alterna Bamboo",
      sku: "123456",
      category: "Шампуни",
      price: 1200,
      wholesalePrice: 800,
      stock: 12,
      unit: "шт.",
      imageUrl: "/lovable-uploads/c7cc3390-83b9-4cb1-a9b1-2cf19c517943.png",
      isArchived: false
    },
    {
      id: 2,
      name: "Краска для волос Preference",
      sku: "234567",
      category: "Краски для волос",
      price: 950,
      wholesalePrice: 600,
      stock: 24,
      unit: "шт.",
      imageUrl: "/lovable-uploads/72fa6ad3-5ec4-4fbe-a7b0-67e9d0087f29.png",
      isArchived: false
    },
    {
      id: 3,
      name: "Кондиционер Kerastase",
      sku: "345678",
      category: "Кондиционеры",
      price: 1500,
      wholesalePrice: 900,
      stock: 8,
      unit: "шт.",
      isArchived: false
    },
    {
      id: 4,
      name: "Маска для волос Olaplex",
      sku: "456789",
      category: "Маски",
      price: 2200,
      wholesalePrice: 1400,
      stock: 6,
      unit: "шт.",
      isArchived: true
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [productToAction, setProductToAction] = useState<Product | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProducts = products.filter(product => 
    (showArchived ? true : !product.isArchived) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.sku.includes(searchQuery))
  );

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Товар удален");
    setIsDeleteDialogOpen(false);
    setProductToAction(null);
  };

  const handleArchiveToggle = (id: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isArchived: !product.isArchived } : product
    ));
    
    const product = products.find(p => p.id === id);
    if (product) {
      toast.success(product.isArchived ? "Товар восстановлен из архива" : "Товар архивирован");
    }
    
    setIsArchiveDialogOpen(false);
    setProductToAction(null);
  };

  const handleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(productId => productId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  const handleBulkArchive = () => {
    if (selectedProducts.length === 0) return;
    
    const updatedProducts = products.map(product => 
      selectedProducts.includes(product.id) ? { ...product, isArchived: true } : product
    );
    
    setProducts(updatedProducts);
    toast.success(`${selectedProducts.length} товаров архивировано`);
    setSelectedProducts([]);
  };

  const showImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  return (
    <>
      <Card>
        {filteredProducts.length > 0 ? (
          <>
            {selectedProducts.length > 0 && (
              <div className="p-2 bg-primary/10 flex items-center justify-between">
                <span className="text-sm font-medium ml-2">
                  Выбрано {selectedProducts.length} товаров
                </span>
                <Button variant="outline" size="sm" onClick={handleBulkArchive} className="flex items-center gap-1">
                  <Archive className="h-3.5 w-3.5" />
                  Архивировать выбранные
                </Button>
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]">
                    <Checkbox 
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0} 
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                  <TableHead>Наименование (Артикул)</TableHead>
                  <TableHead className="text-right">Цена продажи</TableHead>
                  <TableHead className="text-right">Цена списания</TableHead>
                  <TableHead className="text-right">Остаток</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow 
                    key={product.id}
                    className={product.isArchived ? "bg-muted/30" : ""}
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)} 
                        onCheckedChange={() => handleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {product.imageUrl ? (
                        <Avatar 
                          className="h-10 w-10 cursor-pointer" 
                          onClick={() => showImageDialog(product.imageUrl as string)}
                        >
                          <AvatarImage src={product.imageUrl} alt={product.name} />
                          <AvatarFallback>
                            <ImageIcon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            <ImageIcon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <span className={product.isArchived ? "text-muted-foreground" : ""}>
                          {product.name} 
                          {product.isArchived && <span className="ml-2 text-xs">(В архиве)</span>}
                        </span>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{product.price} ₽</TableCell>
                    <TableCell className="text-right">{product.wholesalePrice} ₽</TableCell>
                    <TableCell className="text-right">{product.stock} {product.unit}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Редактировать">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title={product.isArchived ? "Восстановить из архива" : "Архивировать"}
                          onClick={() => {
                            setProductToAction(product);
                            setIsArchiveDialogOpen(true);
                          }}
                        >
                          {product.isArchived ? (
                            <ArchiveRestore className="h-4 w-4" />
                          ) : (
                            <Archive className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          title="Удалить"
                          onClick={() => {
                            setProductToAction(product);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <p className="mb-2 text-lg font-semibold">
              {showArchived 
                ? "В архиве нет товаров" 
                : "Пока не создан ни один товар"}
            </p>
            <p className="text-muted-foreground mb-6">
              {showArchived 
                ? "Архивированные товары будут отображаться здесь." 
                : "Добавьте товары, чтобы вести складской учет."}
            </p>
            {!showArchived && <Button>Добавить товар</Button>}
          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Удаление товара</DialogTitle>
            <DialogDescription>
              Вы действительно хотите удалить товар "{productToAction?.name}"? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Отмена</Button>
            <Button 
              variant="destructive" 
              onClick={() => productToAction && handleDelete(productToAction.id)}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {productToAction?.isArchived ? "Восстановление из архива" : "Архивация товара"}
            </DialogTitle>
            <DialogDescription>
              {productToAction?.isArchived 
                ? `Вы действительно хотите восстановить товар "${productToAction?.name}" из архива?`
                : `Вы действительно хотите архивировать товар "${productToAction?.name}"?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsArchiveDialogOpen(false)}>Отмена</Button>
            <Button 
              variant={productToAction?.isArchived ? "default" : "secondary"} 
              onClick={() => productToAction && handleArchiveToggle(productToAction.id)}
            >
              {productToAction?.isArchived ? "Восстановить" : "Архивировать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Изображение товара</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Изображение товара" 
                className="max-h-96 object-contain rounded-md"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductList;
