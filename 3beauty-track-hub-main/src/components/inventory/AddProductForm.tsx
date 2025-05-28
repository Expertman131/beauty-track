
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Info, RefreshCcw, Upload } from "lucide-react";

interface AddProductFormProps {
  onCancel: () => void;
  onSave: () => void;
  enableImageUpload?: boolean;
}

const AddProductForm = ({ onCancel, onSave, enableImageUpload = false }: AddProductFormProps) => {
  const [product, setProduct] = useState({
    name: '',
    nameInReceipt: '',
    sku: '',
    barcode: '',
    category: 'Основные товары',
    sellingUnit: 'Штука',
    writeOffUnit: 'Штука',
    sellingPrice: '',
    costPrice: '',
    tax: 'По умолчанию',
    vat: 'По умолчанию',
    criticalStock: '0',
    desiredStock: '0',
    comment: ''
  });

  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Добавление товара</h2>
      </div>
      
      {enableImageUpload && (
        <div className="mb-6">
          <Label htmlFor="productImage" className="mb-2 block">Изображение товара</Label>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 border rounded-md w-24 h-24 flex items-center justify-center overflow-hidden bg-muted/40">
              {imagePreview ? (
                <img src={imagePreview} alt="Предпросмотр товара" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-grow">
              <Input 
                id="productImage" 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-1"
              />
              <p className="text-xs text-muted-foreground">
                Рекомендуемый размер: 800x800 пикселей, формат: JPG, PNG
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input 
            id="name" 
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nameInReceipt">
            Название в чеке
            <Info className="inline-block w-4 h-4 ml-1 text-muted-foreground" />
          </Label>
          <Input 
            id="nameInReceipt" 
            name="nameInReceipt"
            value={product.nameInReceipt}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sku">Артикул</Label>
          <Input 
            id="sku" 
            name="sku"
            value={product.sku}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode">
            Штрихкод
          </Label>
          <div className="flex gap-2">
            <Input 
              id="barcode" 
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Категория</Label>
        <Select 
          value={product.category} 
          onValueChange={(value) => handleSelectChange('category', value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Основные товары">Основные товары</SelectItem>
            <SelectItem value="Шампуни">Шампуни</SelectItem>
            <SelectItem value="Краски для волос">Краски для волос</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Единицы измерения</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 items-center">
          <div>
            <Label htmlFor="sellingUnit" className="text-sm text-muted-foreground">Для продажи</Label>
            <Select 
              value={product.sellingUnit} 
              onValueChange={(value) => handleSelectChange('sellingUnit', value)}
            >
              <SelectTrigger id="sellingUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Штука">Штука</SelectItem>
                <SelectItem value="Грамм">Грамм</SelectItem>
                <SelectItem value="Миллилитр">Миллилитр</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end justify-center">
            <span className="text-lg">=</span>
          </div>

          <div>
            <Label htmlFor="writeOffUnit" className="text-sm text-muted-foreground">Для списания</Label>
            <Select 
              value={product.writeOffUnit} 
              onValueChange={(value) => handleSelectChange('writeOffUnit', value)}
            >
              <SelectTrigger id="writeOffUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Штука">Штука</SelectItem>
                <SelectItem value="Грамм">Грамм</SelectItem>
                <SelectItem value="Миллилитр">Миллилитр</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Label className="mb-2 block">Массы</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="netWeight" className="text-sm text-muted-foreground">Масса нетто</Label>
            <div className="flex">
              <Input id="netWeight" className="flex-1 rounded-r-none" />
              <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
                <span className="text-sm">гр.</span>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="grossWeight" className="text-sm text-muted-foreground">Масса брутто</Label>
            <div className="flex">
              <Input id="grossWeight" className="flex-1 rounded-r-none" />
              <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
                <span className="text-sm">гр.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">
            Цена продажи
          </Label>
          <div className="flex">
            <Input 
              id="sellingPrice" 
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={handleChange}
              className="flex-1 rounded-r-none"
            />
            <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
              <span className="text-sm">₽</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="costPrice">
              Себестоимость
            </Label>
            <Info className="inline-block w-4 h-4 ml-1 text-muted-foreground" />
          </div>
          <div className="flex">
            <Input 
              id="costPrice" 
              name="costPrice"
              value={product.costPrice}
              onChange={handleChange}
              className="flex-1 rounded-r-none"
            />
            <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
              <span className="text-sm">₽</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tax">
            Система налогообложения
          </Label>
          <Select 
            value={product.tax} 
            onValueChange={(value) => handleSelectChange('tax', value)}
          >
            <SelectTrigger id="tax">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="По умолчанию">По умолчанию</SelectItem>
              <SelectItem value="ОСН">ОСН</SelectItem>
              <SelectItem value="УСН">УСН</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vat">
            НДС
          </Label>
          <Select 
            value={product.vat} 
            onValueChange={(value) => handleSelectChange('vat', value)}
          >
            <SelectTrigger id="vat">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="По умолчанию">По умолчанию</SelectItem>
              <SelectItem value="Без НДС">Без НДС</SelectItem>
              <SelectItem value="10%">10%</SelectItem>
              <SelectItem value="20%">20%</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="criticalStock">
              Критичный остаток
            </Label>
            <Info className="inline-block w-4 h-4 ml-1 text-muted-foreground" />
          </div>
          <div className="flex">
            <Input 
              id="criticalStock" 
              name="criticalStock"
              value={product.criticalStock}
              onChange={handleChange}
              className="flex-1 rounded-r-none"
            />
            <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
              <span className="text-sm">шт.</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="desiredStock">
              Желаемый остаток
            </Label>
            <Info className="inline-block w-4 h-4 ml-1 text-muted-foreground" />
          </div>
          <div className="flex">
            <Input 
              id="desiredStock" 
              name="desiredStock"
              value={product.desiredStock}
              onChange={handleChange}
              className="flex-1 rounded-r-none"
            />
            <div className="flex items-center justify-center w-16 h-10 border border-l-0 rounded-r-md bg-muted/60">
              <span className="text-sm">шт.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea 
          id="comment" 
          name="comment"
          value={product.comment}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onCancel}>Отмена</Button>
        <Button onClick={onSave}>Сохранить</Button>
      </div>
    </div>
  );
};

export default AddProductForm;
