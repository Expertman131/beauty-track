import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Percent, 
  Gift, 
  Tag, 
  Ticket, 
  Calendar, 
  Plus,
  Clock,
  Check,
  Edit,
  Coins,
  History,
  CreditCard,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

type Discount = {
  id: number;
  name: string;
  percent: number;
  description: string;
  validUntil: string;
  isActive: boolean;
};

type BonusProgram = {
  id: number;
  name: string;
  ratePerRuble: number;
  minAmountToUse: number;
  expireDays: number;
  description: string;
};

type Subscription = {
  id: number;
  name: string;
  services: string[];
  visits: number;
  price: number;
  validityDays: number;
  description: string;
};

type ActiveSubscription = {
  id: number;
  subscriptionId: number;
  subscriptionName: string;
  clientName: string;
  clientPhone: string;
  purchaseDate: string;
  expiryDate: string;
  visitsTotal: number;
  visitsUsed: number;
  remainingVisits: number;
};

// Define new transaction type for bonus history
type BonusTransaction = {
  id: number;
  clientName: string;
  clientPhone: string;
  clientId: string;
  amount: number;
  type: "add" | "spend";
  reason: string;
  service?: string;
  date: string;
  staffName: string;
}

// Define clients type for bonus management
type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  bonusPoints: number;
  lastActivity?: string;
}

// Define allServices array that was missing
const allServices = [
  "Стрижка женская",
  "Стрижка мужская",
  "Окрашивание волос",
  "Маникюр",
  "Педикюр",
  "Покрытие гель-лак",
  "Наращивание ресниц",
  "Массаж тела",
  "Лимфодренаж",
  "Антицеллюлитный массаж",
  "Депиляция воском",
  "Шугаринг",
  "Чистка лица",
  "Пилинг",
  "Укладка волос",
  "Макияж"
];

const LoyaltyPrograms = () => {
  const { toast } = useToast();

  // State for discounts
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      name: "Весенняя скидка",
      percent: 15,
      description: "Скидка 15% на все услуги в течение весны",
      validUntil: "2025-05-31",
      isActive: true
    },
    {
      id: 2,
      name: "День рождения",
      percent: 20,
      description: "Скидка 20% на все услуги в день рождения клиента и за 7 дней до/после",
      validUntil: "бессрочно",
      isActive: true
    },
    {
      id: 3,
      name: "Первое посещение",
      percent: 10,
      description: "Скидка 10% для новых клиентов",
      validUntil: "бессрочно",
      isActive: true
    }
  ]);

  // State for bonus program
  const [bonusProgram, setBonusProgram] = useState<BonusProgram>({
    id: 1,
    name: "Основная бонусная программа",
    ratePerRuble: 0.05, // 5% от суммы возвращается в виде бонусов
    minAmountToUse: 500, // Минимальная сумма бонусов для использования
    expireDays: 365, // Срок действия бонусов в днях
    description: "5% от каждой покупки возвращается бонусами. Бонусы действуют в течение 1 года.",
  });
  
  // State for bonus dialog
  const [showBonusDialog, setShowBonusDialog] = useState(false);
  const [bonusAction, setBonusAction] = useState<"add" | "subtract">("add");
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusClient, setBonusClient] = useState("");
  const [bonusReason, setBonusReason] = useState("");

  // Новое состояние для клиентов
  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Елена Петрова", phone: "+7 (900) 123-45-67", email: "elena.p@example.com", bonusPoints: 1250, lastActivity: "05.04.2025" },
    { id: "2", name: "Мария Соколова", phone: "+7 (900) 234-56-78", email: "maria.s@example.com", bonusPoints: 760, lastActivity: "18.03.2025" },
    { id: "3", name: "Анна Кузнецова", phone: "+7 (900) 345-67-89", email: "anna.k@example.com", bonusPoints: 430, lastActivity: "02.04.2025" },
    { id: "4", name: "Ольга Смирнова", phone: "+7 (900) 456-78-90", email: "olga.s@example.com", bonusPoints: 980, lastActivity: "10.04.2025" },
    { id: "5", name: "Светлана Иванова", phone: "+7 (900) 567-89-01", email: "svetlana.i@example.com", bonusPoints: 1100, lastActivity: "15.04.2025" }
  ]);

  // Состояние для истории транзакций
  const [bonusTransactions, setBonusTransactions] = useState<BonusTransaction[]>([
    { 
      id: 1, 
      clientName: "Елена Петрова", 
      clientPhone: "+7 (900) 123-45-67", 
      clientId: "1",
      amount: 500, 
      type: "add", 
      reason: "День рождения", 
      date: "05.04.2025",
      staffName: "Администратор"
    },
    { 
      id: 2, 
      clientName: "Мария Соколова", 
      clientPhone: "+7 (900) 234-56-78", 
      clientId: "2",
      amount: 250, 
      type: "add", 
      reason: "Первое посещение", 
      date: "18.03.2025",
      staffName: "Администратор"
    },
    { 
      id: 3, 
      clientName: "Елена Петрова", 
      clientPhone: "+7 (900) 123-45-67", 
      clientId: "1",
      amount: 300, 
      type: "spend", 
      reason: "Оплата услуги", 
      service: "Маникюр",
      date: "20.03.2025",
      staffName: "Администратор"
    }
  ]);

  // Состояния для диалога управления бонусами
  const [openBonusManagerDialog, setOpenBonusManagerDialog] = useState(false);
  const [selectedClientForBonusManager, setSelectedClientForBonusManager] = useState<Client | null>(null);
  const [bonusManagerAction, setBonusManagerAction] = useState<"add" | "spend">("add");
  const [bonusManagerAmount, setBonusManagerAmount] = useState(0);
  const [bonusManagerReason, setBonusManagerReason] = useState("");
  const [bonusManagerService, setBonusManagerService] = useState("");
  const [bonusManagerPrice, setBonusManagerPrice] = useState(0);
  const [clientSearch, setClientSearch] = useState("");
  const [showBonusHistory, setShowBonusHistory] = useState(false);
  const [selectedClientForHistory, setSelectedClientForHistory] = useState<string | null>(null);

  // Список услуг для использования бонусов
  const [services, setServices] = useState([
    { id: "1", name: "Маникюр", price: 2000 },
    { id: "2", name: "Педикюр", price: 2500 },
    { id: "3", name: "Наращивание ресниц", price: 3000 },
    { id: "4", name: "Стрижка женская", price: 1500 },
    { id: "5", name: "Окрашивание волос", price: 4000 },
    { id: "6", name: "Массаж", price: 3500 }
  ]);

  // State for subscriptions
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 1,
      name: "Массаж 10 сеансов",
      services: ["Массаж тела", "Лимфодренаж", "Антицеллюлитный массаж"],
      visits: 10,
      price: 15000,
      validityDays: 90,
      description: "Абонемент на 10 сеансов массажа. Действует 3 месяца с момента покупки."
    },
    {
      id: 2,
      name: "Маникюр 5 посещений",
      services: ["Маникюр", "Покрытие гель-лак"],
      visits: 5,
      price: 6000,
      validityDays: 60,
      description: "Абонемент на 5 маникюров с покрытием. Действует 2 месяца."
    }
  ]);
  
  // State for active subscriptions
  const [activeSubscriptions, setActiveSubscriptions] = useState<ActiveSubscription[]>([
    {
      id: 1,
      subscriptionId: 1,
      subscriptionName: "Массаж 10 сеансов",
      clientName: "Елена Петрова",
      clientPhone: "+7 (900) 123-45-67",
      purchaseDate: "2025-03-15",
      expiryDate: "2025-06-15",
      visitsTotal: 10,
      visitsUsed: 3,
      remainingVisits: 7
    },
    {
      id: 2,
      subscriptionId: 2,
      subscriptionName: "Маникюр 5 посещений",
      clientName: "Мария Соколова",
      clientPhone: "+7 (900) 234-56-78",
      purchaseDate: "2025-04-01",
      expiryDate: "2025-06-01",
      visitsTotal: 5,
      visitsUsed: 2,
      remainingVisits: 3
    }
  ]);
  
  // State for subscription dialogs
  const [showNewSubscriptionDialog, setShowNewSubscriptionDialog] = useState(false);
  const [showSellSubscriptionDialog, setShowSellSubscriptionDialog] = useState(false);
  const [showUseVisitDialog, setShowUseVisitDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [selectedActiveSubscription, setSelectedActiveSubscription] = useState<ActiveSubscription | null>(null);
  
  // State for discount dialog
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [discountForm, setDiscountForm] = useState({
    name: "",
    percent: "",
    description: "",
    validUntil: "",
    isActive: true
  });
  
  // State for bonus program form
  const [bonusProgramForm, setBonusProgramForm] = useState({
    name: bonusProgram.name,
    ratePerRuble: (bonusProgram.ratePerRuble * 100).toString(),
    minAmountToUse: bonusProgram.minAmountToUse.toString(),
    expireDays: bonusProgram.expireDays.toString(),
    description: bonusProgram.description
  });
  
  // State for subscription form
  const [subscriptionForm, setSubscriptionForm] = useState({
    name: "",
    services: [] as string[],
    visits: "",
    price: "",
    validityDays: "",
    description: ""
  });
  
  // State for subscription sale form
  const [subscriptionSaleForm, setSubscriptionSaleForm] = useState({
    subscriptionId: "",
    clientName: "",
    clientPhone: ""
  });
  
  // Фильтрация клиентов по поиску
  const filteredClients = clientSearch 
    ? clients.filter(client => 
        client.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
        client.phone.includes(clientSearch) ||
        client.email.toLowerCase().includes(clientSearch.toLowerCase())
      )
    : clients;

  // Фильтрация транзакций для истории
  const filteredTransactions = selectedClientForHistory
    ? bonusTransactions.filter(tx => tx.clientId === selectedClientForHistory)
    : bonusTransactions;

  // Обработчик управления бонусами клиента
  const handleBonusManagement = () => {
    if (!selectedClientForBonusManager) return;

    // Формирование новой транзакции
    const newTransaction: BonusTransaction = {
      id: Date.now(),
      clientName: selectedClientForBonusManager.name,
      clientPhone: selectedClientForBonusManager.phone,
      clientId: selectedClientForBonusManager.id,
      amount: bonusManagerAmount,
      type: bonusManagerAction,
      reason: bonusManagerReason || (bonusManagerAction === "add" ? "Начисление бонусов" : "Списание бонусов"),
      date: new Date().toLocaleDateString("ru-RU"),
      staffName: "Администратор",
      service: bonusManagerAction === "spend" ? services.find(s => s.id === bonusManagerService)?.name : undefined
    };

    // Обновление списка клиентов
    const updatedClients = clients.map(client => {
      if (client.id === selectedClientForBonusManager.id) {
        return {
          ...client,
          bonusPoints: bonusManagerAction === "add"
            ? client.bonusPoints + bonusManagerAmount
            : client.bonusPoints - bonusManagerAmount,
          lastActivity: new Date().toLocaleDateString("ru-RU")
        };
      }
      return client;
    });

    // Обновление состояния
    setClients(updatedClients);
    setBonusTransactions([...bonusTransactions, newTransaction]);

    // Уведомление
    toast({
      title: bonusManagerAction === "add" ? "Бонусы начислены" : "Бонусы списаны",
      description: `${bonusManagerAction === "add" ? "Начислено" : "Списано"} ${bonusManagerAmount} бонусов для клиента ${selectedClientForBonusManager.name}`
    });

    // Сброс формы
    setBonusManagerAmount(0);
    setBonusManagerReason("");
    setBonusManagerService("");
    setOpenBonusManagerDialog(false);
  };

  // Обработчик изменения выбранной услуги
  const handleServiceChange = (serviceId: string) => {
    setBonusManagerService(serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setBonusManagerPrice(service.price);
      // Устанавливаем максимально возможное количество бонусов для списания (50% от цены услуги)
      const maxBonusAmount = Math.min(
        Math.floor(service.price / 2),
        selectedClientForBonusManager?.bonusPoints || 0
      );
      setBonusManagerAmount(maxBonusAmount);
    }
  };
  
  // Функция для открытия диалога управления бонусами
  const openBonusManagerDialogHandler = (client: Client, action: "add" | "spend") => {
    setSelectedClientForBonusManager(client);
    setBonusManagerAction(action);
    setBonusManagerAmount(action === "add" ? 100 : 0);
    setBonusManagerReason("");
    setBonusManagerService("");
    setBonusManagerPrice(0);
    setOpenBonusManagerDialog(true);
  };

  // Handle discount form change
  const handleDiscountFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiscountForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Open discount dialog for adding or editing
  const openDiscountDialog = (discount?: Discount) => {
    if (discount) {
      setDiscountForm({
        name: discount.name,
        percent: discount.percent.toString(),
        description: discount.description,
        validUntil: discount.validUntil,
        isActive: discount.isActive
      });
      setEditingDiscount(discount);
    } else {
      setDiscountForm({
        name: "",
        percent: "",
        description: "",
        validUntil: "",
        isActive: true
      });
      setEditingDiscount(null);
    }
    setShowDiscountDialog(true);
  };
  
  // Save discount
  const saveDiscount = () => {
    const newDiscount: Discount = {
      id: editingDiscount ? editingDiscount.id : Date.now(),
      name: discountForm.name,
      percent: parseFloat(discountForm.percent),
      description: discountForm.description,
      validUntil: discountForm.validUntil || "бессрочно",
      isActive: discountForm.isActive
    };
    
    if (editingDiscount) {
      // Update existing discount
      setDiscounts(prev => prev.map(d => d.id === editingDiscount.id ? newDiscount : d));
      toast({
        title: "Скидка обновлена",
        description: `Скидка "${newDiscount.name}" была успешно обновлена.`
      });
    } else {
      // Add new discount
      setDiscounts(prev => [...prev, newDiscount]);
      toast({
        title: "Скидка создана",
        description: `Скидка "${newDiscount.name}" была успешно создана.`
      });
    }
    
    setShowDiscountDialog(false);
  };
  
  // Handle bonus program form change
  const handleBonusProgramFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBonusProgramForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Save bonus program settings
  const saveBonusProgramSettings = () => {
    const updatedProgram: BonusProgram = {
      ...bonusProgram,
      name: bonusProgramForm.name,
      ratePerRuble: parseFloat(bonusProgramForm.ratePerRuble) / 100,
      minAmountToUse: parseInt(bonusProgramForm.minAmountToUse),
      expireDays: parseInt(bonusProgramForm.expireDays),
      description: bonusProgramForm.description
    };
    
    setBonusProgram(updatedProgram);
    toast({
      title: "Настройки сохранены",
      description: "Настройки бонусной программы были успешно обновлены."
    });
  };
  
  // Process bonus action
  const processBonusAction = () => {
    toast({
      title: bonusAction === "add" ? "Бонусы начислены" : "Бонусы списаны",
      description: `${bonusAction === "add" ? "Начислено" : "Списано"} ${bonusAmount} бонусов для клиента ${bonusClient}.`
    });
    setShowBonusDialog(false);
    setBonusAmount("");
    setBonusClient("");
    setBonusReason("");
  };
  
  // Open subscription dialog
  const openSubscriptionDialog = (subscription?: Subscription) => {
    if (subscription) {
      setSubscriptionForm({
        name: subscription.name,
        services: [...subscription.services],
        visits: subscription.visits.toString(),
        price: subscription.price.toString(),
        validityDays: subscription.validityDays.toString(),
        description: subscription.description
      });
      setSelectedSubscription(subscription);
    } else {
      setSubscriptionForm({
        name: "",
        services: [],
        visits: "",
        price: "",
        validityDays: "",
        description: ""
      });
      setSelectedSubscription(null);
    }
    setShowNewSubscriptionDialog(true);
  };
  
  // Save subscription
  const saveSubscription = () => {
    const newSubscription: Subscription = {
      id: selectedSubscription ? selectedSubscription.id : Date.now(),
      name: subscriptionForm.name,
      services: subscriptionForm.services,
      visits: parseInt(subscriptionForm.visits),
      price: parseInt(subscriptionForm.price),
      validityDays: parseInt(subscriptionForm.validityDays),
      description: subscriptionForm.description
    };
    
    if (selectedSubscription) {
      // Update existing subscription
      setSubscriptions(prev => prev.map(s => s.id === selectedSubscription.id ? newSubscription : s));
      toast({
        title: "Абонемент обновлен",
        description: `Абонемент "${newSubscription.name}" был успешно обновлен.`
      });
    } else {
      // Add new subscription
      setSubscriptions(prev => [...prev, newSubscription]);
      toast({
        title: "Абонемент создан",
        description: `Абонемент "${newSubscription.name}" был успешно создан.`
      });
    }
    
    setShowNewSubscriptionDialog(false);
  };
  
  // Sell subscription
  const sellSubscription = () => {
    const subscription = subscriptions.find(s => s.id.toString() === subscriptionSaleForm.subscriptionId);
    
    if (subscription) {
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + subscription.validityDays);
      
      const newActiveSubscription: ActiveSubscription = {
        id: Date.now(),
        subscriptionId: subscription.id,
        subscriptionName: subscription.name,
        clientName: subscriptionSaleForm.clientName,
        clientPhone: subscriptionSaleForm.clientPhone,
        purchaseDate: today.toISOString().split('T')[0],
        expiryDate: expiryDate.toISOString().split('T')[0],
        visitsTotal: subscription.visits,
        visitsUsed: 0,
        remainingVisits: subscription.visits
      };
      
      setActiveSubscriptions(prev => [...prev, newActiveSubscription]);
      toast({
        title: "Абонемент продан",
        description: `Абонемент "${subscription.name}" был успешно продан клиенту ${subscriptionSaleForm.clientName}.`
      });
      
      setShowSellSubscriptionDialog(false);
      setSubscriptionSaleForm({
        subscriptionId: "",
        clientName: "",
        clientPhone: ""
      });
    }
  };
  
  // Use visit from subscription
  const useVisitFromSubscription = () => {
    if (selectedActiveSubscription && selectedActiveSubscription.remainingVisits > 0) {
      const updatedSubscription: ActiveSubscription = {
        ...selectedActiveSubscription,
        visitsUsed: selectedActiveSubscription.visitsUsed + 1,
        remainingVisits: selectedActiveSubscription.remainingVisits - 1
      };
      
      setActiveSubscriptions(prev => 
        prev.map(s => s.id === selectedActiveSubscription.id ? updatedSubscription : s)
      );
      
      toast({
        title: "Визит использован",
        description: `Визит из абонемента "${selectedActiveSubscription.subscriptionName}" клиента ${selectedActiveSubscription.clientName} был использован. Осталось посещений: ${updatedSubscription.remainingVisits}`
      });
      
      setShowUseVisitDialog(false);
      setSelectedActiveSubscription(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bonuses" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="discounts" className="flex items-center gap-2">
            <Percent className="h-4 w-4" /> Скидки
          </TabsTrigger>
          <TabsTrigger value="bonuses" className="flex items-center gap-2">
            <Gift className="h-4 w-4" /> Бонусы
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center gap-2">
            <Ticket className="h-4 w-4" /> Абонементы
          </TabsTrigger>
        </TabsList>
        
        {/* DISCOUNTS TAB */}
        <TabsContent value="discounts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Управление скидками</h2>
            <Button onClick={() => openDiscountDialog()}>
              <Plus className="h-4 w-4 mr-2" /> Создать программу
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discounts.map((discount) => (
              <Card key={discount.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Percent className="h-4 w-4 mr-2 text-beauty-500" /> 
                      {discount.name}
                    </CardTitle>
                    <span className="text-lg font-bold text-beauty-600">{discount.percent}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-beauty-700 mb-4">{discount.description}</p>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-beauty-600">Действует до:</span>
                    <span>{discount.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${discount.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {discount.isActive ? 'Активно' : 'Не активно'}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => openDiscountDialog(discount)}>
                      <Edit className="h-4 w-4 mr-1" /> Изменить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* BONUSES TAB */}
        <TabsContent value="bonuses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Бонусная программа</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowBonusHistory(true)}
                className="flex items-center gap-1"
              >
                <History className="h-4 w-4" />
                История бонусов
              </Button>
              <Button onClick={() => setShowBonusDialog(true)}>
                Управление бонусами
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="settings">Настройки программы</TabsTrigger>
              <TabsTrigger value="clients">Клиенты (бонусы)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Настройки программы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Название программы</Label>
                          <Input
                            id="name"
                            name="name"
                            value={bonusProgramForm.name}
                            onChange={handleBonusProgramFormChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ratePerRuble">Процент начисления от суммы (%)</Label>
                          <Input
                            id="ratePerRuble"
                            name="ratePerRuble"
                            type="number"
                            value={bonusProgramForm.ratePerRuble}
                            onChange={handleBonusProgramFormChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="minAmountToUse">Минимальная сумма для использования</Label>
                          <Input
                            id="minAmountToUse"
                            name="minAmountToUse"
                            type="number"
                            value={bonusProgramForm.minAmountToUse}
                            onChange={handleBonusProgramFormChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expireDays">Срок действия бонусов (дни)</Label>
                          <Input
                            id="expireDays"
                            name="expireDays"
                            type="number"
                            value={bonusProgramForm.expireDays}
                            onChange={handleBonusProgramFormChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Описание программы</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={bonusProgramForm.description}
                          onChange={handleBonusProgramFormChange}
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={saveBonusProgramSettings}>
                        Сохранить настройки
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-beauty-50 p-4 rounded-lg">
                        <p className="text-sm text-beauty-700 mb-1">Текущая ставка начисления:</p>
                        <p className="text-xl font-bold">{bonusProgram.ratePerRuble * 100}%</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Правила использования:</p>
                        <ul className="text-sm text-beauty-700 space-y-1">
                          <li>• 1 бонус = 1 рубль скидки</li>
                          <li>• Минимальная сумма списания: {bonusProgram.minAmountToUse} бонусов</li>
                          <li>• Срок действия: {bonusProgram.expireDays} дней</li>
                          <li>• Максимальная скидка: до 50% от стоимости услуг</li>
                        </ul>
                      </div>
                      
                      <div className="border-t border-beauty-100 pt-4">
                        <p className="text-sm font-medium mb-2">Статистика:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center bg-beauty-50 p-2 rounded">
                            <p className="text-xs text-beauty-600">Начислено за месяц</p>
                            <p className="text-lg font-medium">12,450</p>
                          </div>
                          <div className="text-center bg-beauty-50 p-2 rounded">
                            <p className="text-xs text-beauty-600">Использовано за месяц</p>
                            <p className="text-lg font-medium">8,320</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-6">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Поиск клиента по имени, телефону или email"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pr-10"
                  />
                  {clientSearch && (
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-beauty-500 hover:text-beauty-700"
                      onClick={() => setClientSearch("")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredClients.map(client => (
                  <Card key={client.id} className="overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{client.name}</h3>
                          <p className="text-sm text-beauty-600">{client.phone}</p>
                          <p className="text-sm text-beauty-600">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-beauty-600">{client.bonusPoints}</div>
                          <div className="text-xs text-beauty-500">баллов</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-beauty-100 flex justify-between items-center">
                        <div className="text-sm text-beauty-500">
                          Последняя активность: {client.lastActivity || "—"}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => openBonusManagerDialogHandler(client, "add")}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Начислить
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                            onClick={() => openBonusManagerDialogHandler(client, "spend")}
                          >
                            <Coins className="h-3 w-3 mr-1" />
                            Списать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredClients.length === 0 && (
                <div className="text-center py-8 border rounded-lg bg-beauty-50">
                  <div className="text-beauty-400 mb-2">
                    <Gift className="h-12 w-12 mx-auto opacity-30" />
                  </div>
                  <p className="text-beauty-600">Клиенты не найдены</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* SUBSCRIPTIONS TAB */}
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Абонементы</h2>
            <Button onClick={() => openSubscriptionDialog()}>
              <Plus className="h-4 w-4 mr-2" /> Создать абонемент
            </Button>
          </div>
          
          <Tabs defaultValue="subscription-list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="subscription-list">
                Список абонементов
              </TabsTrigger>
              <TabsTrigger value="active-subscriptions">
                Активные абонементы
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscription-list" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptions.map((subscription) => (
                  <Card key={subscription.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{subscription.name}</CardTitle>
                        <span className="text-lg font-bold text-beauty-600">{subscription.price}₽</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <p className="text-sm text-beauty-700">{subscription.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {subscription.services.map((service, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 bg-beauty-50 text-beauty-700 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-beauty-50 p-2 rounded text-center">
                          <p className="text-xs text-beauty-600">Посещений</p>
                          <p className="font-medium">{subscription.visits}</p>
                        </div>
                        <div className="bg-beauty-50 p-2 rounded text-center">
                          <p className="text-xs text-beauty-600">Срок действия</p>
                          <p className="font-medium">{subscription.validityDays} дней</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openSubscriptionDialog(subscription)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Изменить
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSubscriptionSaleForm(prev => ({
                              ...prev,
                              subscriptionId: subscription.id.toString()
                            }));
                            setShowSellSubscriptionDialog(true);
                          }}
                        >
                          Продать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active-subscriptions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeSubscriptions.map((subscription) => (
                  <Card key={subscription.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{subscription.subscriptionName}</CardTitle>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          subscription.remainingVisits === 0 ? 
                          'bg-red-100 text-red-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {subscription.remainingVisits === 0 ? 'Использован' : 'Активен'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <p className="font-medium text-beauty-800">{subscription.clientName}</p>
                        <p className="text-sm text-beauty-600">{subscription.clientPhone}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-beauty-50 p-2 rounded text-center">
                          <p className="text-xs text-beauty-600">Посещений</p>
                          <p className="font-medium">{subscription.remainingVisits} из {subscription.visitsTotal}</p>
                        </div>
                        <div className="bg-beauty-50 p-2 rounded text-center">
                          <p className="text-xs text-beauty-600">Действует до</p>
                          <p className="font-medium">{subscription.expiryDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          size="sm"
                          disabled={subscription.remainingVisits === 0}
                          onClick={() => {
                            setSelectedActiveSubscription(subscription);
                            setShowUseVisitDialog(true);
                          }}
                        >
                          Записать и использовать визит
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
      
      {/* DISCOUNT DIALOG */}
      <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingDiscount ? "Редактировать скидку" : "Создать скидку"}
            </DialogTitle>
            <DialogDescription>
              {editingDiscount 
                ? "Измените параметры скидки и нажмите Сохранить" 
                : "Заполните форму для создания новой скидки"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название скидки</Label>
                <Input
                  id="name"
                  name="name"
                  value={discountForm.name}
                  onChange={handleDiscountFormChange}
                  placeholder="Например: Весенняя скидка"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="percent">Размер скидки (%)</Label>
                <Input
                  id="percent"
                  name="percent"
                  type="number"
                  min="1"
                  max="100"
                  value={discountForm.percent}
                  onChange={handleDiscountFormChange}
                  placeholder="Например: 15"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={discountForm.description}
                  onChange={handleDiscountFormChange}
                  placeholder="Опишите условия скидки"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="validUntil">Действует до (оставьте пустым для бессрочной)</Label>
                <Input
                  id="validUntil"
                  name="validUntil"
                  type="date"
                  value={discountForm.validUntil !== "бессрочно" ? discountForm.validUntil : ""}
                  onChange={handleDiscountFormChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDiscountDialog(false)}
            >
              Отмена
            </Button>
            <Button onClick={saveDiscount}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* ADD/SUBTRACT BONUSES DIALOG */}
      <Dialog open={showBonusDialog} onOpenChange={setShowBonusDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Управление бонусами клиента
            </DialogTitle>
            <DialogDescription>
              Добавьте или спишите бонусы с аккаунта клиента
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bonusClient">Клиент</Label>
              <Select 
                value={bonusClient} 
                onValueChange={setBonusClient}
              >
                <SelectTrigger id="bonusClient">
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elena">Елена Петрова</SelectItem>
                  <SelectItem value="maria">Мария Соколова</SelectItem>
                  <SelectItem value="svetlana">Светлана Иванова</SelectItem>
                  <SelectItem value="olga">Ольга Смирнова</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bonusAction">Действие</Label>
              <Select 
                value={bonusAction} 
                onValueChange={(value: "add" | "subtract") => setBonusAction(value)}
              >
                <SelectTrigger id="bonusAction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Начислить бонусы</SelectItem>
                  <SelectItem value="subtract">Списать бонусы</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bonusAmount">Количество бонусов</Label>
              <Input
                id="bonusAmount"
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                placeholder="Например: 500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bonusReason">Причина</Label>
              <Input
                id="bonusReason"
                value={bonusReason}
                onChange={(e) => setBonusReason(e.target.value)}
                placeholder="Например: День рождения"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBonusDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={processBonusAction}
              disabled={!bonusClient || !bonusAmount}
              className={bonusAction === "add" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {bonusAction === "add" ? "Начислить" : "Списать"} бонусы
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* BONUS MANAGER DIALOG */}
      <Dialog open={openBonusManagerDialog} onOpenChange={(open) => {
        setOpenBonusManagerDialog(open);
        if (!open) {
          setBonusManagerAmount(0);
          setBonusManagerReason("");
          setBonusManagerService("");
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {bonusManagerAction === "add" ? "Начисление бонусов" : "Списание бонусов"} 
            </DialogTitle>
            <DialogDescription>
              {selectedClientForBonusManager && (
                <>
                  {bonusManagerAction === "add" 
                    ? "Начисление бонусов для клиента" 
                    : "Списание бонусов в счет оплаты услуг"} {selectedClientForBonusManager.name}
                  <p className="mt-1">
                    Текущий баланс: <strong>{selectedClientForBonusManager.bonusPoints}</strong> баллов
                  </p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {bonusManagerAction === "spend" ? (
              // Форма для списания бонусов
              <>
                <div className="space-y-2">
                  <Label htmlFor="bonusService">Услуга</Label>
                  <Select 
                    value={bonusManagerService} 
                    onValueChange={handleServiceChange}
                  >
                    <SelectTrigger id="bonusService">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - {service.price} ₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {bonusManagerService && (
                  <>
                    <div className="bg-beauty-50 p-3 rounded-md">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-beauty-700">Стоимость услуги:</span>
                        <span className="font-medium">{bonusManagerPrice} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-beauty-700">Максимально доступно для списания:</span>
                        <span className="font-medium">
                          {Math.min(
                            Math.floor(bonusManagerPrice / 2), 
                            selectedClientForBonusManager?.bonusPoints || 0
                          )} бонусов (50%)
                        </span>
                      </div>
                      {bonusManagerAmount > 0 && (
                        <>
                          <div className="border-t border-beauty-200 my-2"></div>
                          <div className="flex justify-between text-sm">
                            <span className="text-beauty-700">К оплате:</span>
                            <span className="font-medium">{bonusManagerPrice - bonusManagerAmount} ₽</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bonusAmount">Количество бонусов для списания</Label>
                      <Input
                        id="bonusAmount"
                        type="number"
                        min="0"
                        max={Math.min(
                          Math.floor(bonusManagerPrice / 2), 
                          selectedClientForBonusManager?.bonusPoints || 0
                        )}
                        value={bonusManagerAmount}
                        onChange={(e) => setBonusManagerAmount(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              // Форма для начисления бонусов
              <>
                <div className="space-y-2">
                  <Label htmlFor="bonusAmount">Количество бонусов</Label>
                  <Input
                    id="bonusAmount"
                    type="number"
                    min="1"
                    value={bonusManagerAmount}
                    onChange={(e) => setBonusManagerAmount(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" onClick={() => setBonusManagerAmount(100)}>
                    100
                  </Button>
                  <Button variant="outline" onClick={() => setBonusManagerAmount(200)}>
                    200
                  </Button>
                  <Button variant="outline" onClick={() => setBonusManagerAmount(500)}>
                    500
                  </Button>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="bonusReason">Причина {bonusManagerAction === "add" ? "начисления" : "списания"}</Label>
              <Input
                id="bonusReason"
                value={bonusManagerReason}
                onChange={(e) => setBonusManagerReason(e.target.value)}
                placeholder={bonusManagerAction === "add" ? "Например: День рождения" : "Например: Оплата услуги"}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenBonusManagerDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handleBonusManagement}
              disabled={(bonusManagerAction === "spend" && (!bonusManagerService || bonusManagerAmount <= 0)) || 
                      (bonusManagerAction === "add" && bonusManagerAmount <= 0)}
              className={bonusManagerAction === "add" ? "bg-green-600 hover:bg-green-700" : "bg-amber-600 hover:bg-amber-700"}
            >
              {bonusManagerAction === "add" ? "Начислить" : "Списать"} бонусы
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* BONUS HISTORY DIALOG */}
      <Dialog 
        open={showBonusHistory} 
        onOpenChange={setShowBonusHistory}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>История операций с бонусами</DialogTitle>
            <DialogDescription>
              Просмотр истории начислений и списаний бонусных баллов
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-between items-center my-2">
            <Select 
              value={selectedClientForHistory || ""} 
              onValueChange={(value) => setSelectedClientForHistory(value || null)}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Все клиенты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все клиенты</SelectItem>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedClientForHistory(null)}
            >
              Сбросить фильтр
            </Button>
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            {filteredTransactions.length > 0 ? (
              <div className="space-y-4">
                {filteredTransactions.map(transaction => (
                  <Card key={transaction.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{transaction.clientName}</div>
                          <div className="text-sm text-beauty-600">{transaction.clientPhone}</div>
                        </div>
                        <div className={`font-bold text-base ${
                          transaction.type === "add" ? "text-green-600" : "text-amber-600"
                        }`}>
                          {transaction.type === "add" ? "+" : "-"}{transaction.amount} баллов
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <div><span className="text-beauty-600">Причина:</span> {transaction.reason}</div>
                        {transaction.service && (
                          <div><span className="text-beauty-600">Услуга:</span> {transaction.service}</div>
                        )}
                        <div className="flex justify-between mt-1">
                          <span className="text-beauty-500 text-xs">{transaction.date}</span>
                          <span className="text-beauty-500 text-xs">Выполнил: {transaction.staffName}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-beauty-500">
                <History className="h-12 w-12 mb-2 opacity-30" />
                <p>История транзакций пуста</p>
              </div>
            )}
          </ScrollArea>
          
          <DialogFooter>
            <Button onClick={() => setShowBonusHistory(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* NEW SUBSCRIPTION DIALOG */}
      <Dialog open={showNewSubscriptionDialog} onOpenChange={setShowNewSubscriptionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSubscription ? "Редактировать абонемент" : "Создать абонемент"}
            </DialogTitle>
            <DialogDescription>
              {selectedSubscription 
                ? "Измените параметры абонемента и нажмите Сохранить" 
                : "Заполните форму для создания нового абонемента"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название абонемента</Label>
                <Input
                  id="name"
                  value={subscriptionForm.name}
                  onChange={(e) => setSubscriptionForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Например: Массаж 10 сеансов"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visits">Количество посещений</Label>
                  <Input
                    id="visits"
                    type="number"
                    min="1"
                    value={subscriptionForm.visits}
                    onChange={(e) => setSubscriptionForm(prev => ({ ...prev, visits: e.target.value }))}
                    placeholder="Например: 10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Стоимость (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={subscriptionForm.price}
                    onChange={(e) => setSubscriptionForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Например: 15000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="validityDays">Срок действия (дни)</Label>
                <Input
                  id="validityDays"
                  type="number"
                  min="1"
                  value={subscriptionForm.validityDays}
                  onChange={(e) => setSubscriptionForm(prev => ({ ...prev, validityDays: e.target.value }))}
                  placeholder="Например: 90"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Включенные услуги</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 border border-beauty-100 rounded-md max-h-[200px] overflow-y-auto">
                  {allServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`service-${service}`}
                        checked={subscriptionForm.services.includes(service)}
                        onCheckedChange={(checked) => {
                          setSubscriptionForm(prev => {
                            if (checked) {
                              return { ...prev, services: [...prev.services, service] };
                            } else {
                              return { ...prev, services: prev.services.filter(s => s !== service) };
                            }
                          });
                        }}
                      />
                      <Label 
                        htmlFor={`service-${service}`}
                        className="text-sm font-normal"
                      >
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={subscriptionForm.description}
                  onChange={(e) => setSubscriptionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Опишите условия абонемента"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewSubscriptionDialog(false)}
            >
              Отмена
            </Button>
            <Button onClick={saveSubscription}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* SELL SUBSCRIPTION DIALOG */}
      <Dialog open={showSellSubscriptionDialog} onOpenChange={setShowSellSubscriptionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Продажа абонемента
            </DialogTitle>
            <DialogDescription>
              Выберите клиента и абонемент для продажи
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subscriptionId">Абонемент</Label>
              <Select 
                value={subscriptionSaleForm.subscriptionId} 
                onValueChange={(value) => setSubscriptionSaleForm(prev => ({ ...prev, subscriptionId: value }))}
              >
                <SelectTrigger id="subscriptionId">
                  <SelectValue placeholder="Выберите абонемент" />
                </SelectTrigger>
                <SelectContent>
                  {subscriptions.map((subscription) => (
                    <SelectItem key={subscription.id} value={subscription.id.toString()}>
                      {subscription.name} - {subscription.price}₽
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientName">Клиент</Label>
              <Select 
                value={subscriptionSaleForm.clientName} 
                onValueChange={(value) => setSubscriptionSaleForm(prev => ({ ...prev, clientName: value }))}
              >
                <SelectTrigger id="clientName">
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Елена Петрова">Елена Петрова</SelectItem>
                  <SelectItem value="Мария Соколова">Мария Соколова</SelectItem>
                  <SelectItem value="Светлана Иванова">Светлана Иванова</SelectItem>
                  <SelectItem value="Ольга Смирнова">Ольга Смирнова</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Телефон клиента</Label>
              <Input
                id="clientPhone"
                value={subscriptionSaleForm.clientPhone}
                onChange={(e) => setSubscriptionSaleForm(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSellSubscriptionDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={sellSubscription}
              disabled={!subscriptionSaleForm.subscriptionId || !subscriptionSaleForm.clientName || !subscriptionSaleForm.clientPhone}
            >
              Продать абонемент
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* USE VISIT DIALOG */}
      <Dialog open={showUseVisitDialog} onOpenChange={setShowUseVisitDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Использовать визит
            </DialogTitle>
            <DialogDescription>
              {selectedActiveSubscription && (
                `Клиент: ${selectedActiveSubscription.clientName}, Абонемент: ${selectedActiveSubscription.subscriptionName}`
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedActiveSubscription && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Осталось посещений:</span>
                    <span className="font-bold">{selectedActiveSubscription.remainingVisits} из {selectedActiveSubscription.visitsTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Действителен до:</span>
                    <span>{selectedActiveSubscription.expiryDate}</span>
                  </div>
                </div>
                
                <p className="text-sm text-beauty-700">
                  После подтверждения будет использован 1 визит из абонемента. Эту операцию нельзя отменить.
                </p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUseVisitDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={useVisitFromSubscription}
              disabled={!selectedActiveSubscription || selectedActiveSubscription.remainingVisits <= 0}
            >
              Использовать визит
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyPrograms;
