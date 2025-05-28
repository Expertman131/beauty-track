
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Search, Plus, Phone, Mail, MapPin, FileText, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddCounterpartyForm from '@/components/inventory/AddCounterpartyForm';

interface Supplier {
  id: number;
  name: string;
  type: string;
  inn: string;
  kpp?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  comment?: string;
}

const SuppliersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      type: "legal",
      name: "ООО Поставщик",
      inn: "7712345678",
      kpp: "773301001",
      contactPerson: "Иванов Иван",
      phone: "+7 (999) 123-45-67",
      email: "supplier@example.com",
      address: "г. Москва, ул. Примерная, д. 123",
      comment: "Поставщик косметической продукции"
    },
    {
      id: 2,
      type: "individual",
      name: "ИП Сидоров С.С.",
      inn: "771234567890",
      contactPerson: "Сидоров Сергей",
      phone: "+7 (999) 765-43-21",
      email: "sidorov@example.com",
      address: "г. Москва, ул. Лесная, д. 45"
    }
  ]);

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (supplier.inn && supplier.inn.includes(searchQuery)) ||
    (supplier.phone && supplier.phone.includes(searchQuery))
  );

  const handleSaveSupplier = (data: any) => {
    const newSupplier = {
      id: suppliers.length + 1,
      ...data
    };
    setSuppliers([...suppliers, newSupplier]);
    setIsDialogOpen(false);
  };

  const getSupplierTypeLabel = (type: string) => {
    switch (type) {
      case "legal": return "Юр. лицо";
      case "individual": return "Физ. лицо";
      case "entrepreneur": return "ИП";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold beauty-gradient-text">Поставщики</h1>
            </div>
            <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Добавить контрагента
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Имя/название или номер телефона контрагента, ИНН"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Все типы</Button>
            </div>
          </div>

          <Card>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Контрагент — {filteredSuppliers.length} контрагентов
                </span>
                <span className="text-sm font-medium">
                  Телефон
                </span>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>ИНН</TableHead>
                  <TableHead className="text-right">Телефон</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <React.Fragment key={supplier.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setShowDetails(showDetails === supplier.id ? null : supplier.id)}
                    >
                      <TableCell className="font-medium text-primary">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{getSupplierTypeLabel(supplier.type)}</TableCell>
                      <TableCell>{supplier.inn}</TableCell>
                      <TableCell className="text-right">{supplier.phone || '—'}</TableCell>
                    </TableRow>
                    {showDetails === supplier.id && (
                      <TableRow>
                        <TableCell colSpan={4} className="bg-muted/30 p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <h3 className="font-medium">Контактная информация</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDetails(null);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {supplier.kpp && (
                              <div className="flex items-start gap-2">
                                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">КПП</div>
                                  <div className="text-sm">{supplier.kpp}</div>
                                </div>
                              </div>
                            )}
                            {supplier.contactPerson && (
                              <div className="flex items-start gap-2">
                                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">Контактное лицо</div>
                                  <div className="text-sm">{supplier.contactPerson}</div>
                                </div>
                              </div>
                            )}
                            {supplier.phone && (
                              <div className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">Телефон</div>
                                  <div className="text-sm">{supplier.phone}</div>
                                </div>
                              </div>
                            )}
                            {supplier.email && (
                              <div className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">Email</div>
                                  <div className="text-sm">{supplier.email}</div>
                                </div>
                              </div>
                            )}
                            {supplier.address && (
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">Адрес</div>
                                  <div className="text-sm">{supplier.address}</div>
                                </div>
                              </div>
                            )}
                            {supplier.comment && (
                              <div className="flex items-start gap-2">
                                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div>
                                  <div className="text-sm font-medium">Комментарий</div>
                                  <div className="text-sm">{supplier.comment}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
                {filteredSuppliers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <p className="text-muted-foreground">Контрагенты не найдены</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Новый контрагент</DialogTitle>
          </DialogHeader>
          <AddCounterpartyForm 
            onSave={handleSaveSupplier} 
            onCancel={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuppliersPage;
