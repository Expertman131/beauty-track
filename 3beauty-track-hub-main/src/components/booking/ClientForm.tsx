
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export interface ClientFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  comments: string;
  reminderTime: string;
  agreeToTerms: boolean;
}

interface ClientFormProps {
  formData: ClientFormData;
  onChange: (field: keyof ClientFormData, value: string | boolean) => void;
}

const reminderOptions = [
  { value: "none", label: "Не отправлять" },
  { value: "1hour", label: "За 1 час" },
  { value: "2hours", label: "За 2 часа" },
  { value: "3hours", label: "За 3 часа" },
  { value: "1day", label: "За 1 день" },
  { value: "2days", label: "За 2 дня" },
];

const ClientForm: React.FC<ClientFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="lastName" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Фамилия <span className="text-red-500">*</span>
        </Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="Введите фамилию"
          className="border-beauty-200 dark:border-gray-700"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="firstName" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Имя <span className="text-red-500">*</span>
        </Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="Введите имя"
          className="border-beauty-200 dark:border-gray-700"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Телефон <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+7 (___) ___-__-__"
          className="border-beauty-200 dark:border-gray-700"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Введите email"
          className="border-beauty-200 dark:border-gray-700"
        />
      </div>
      
      <div>
        <Label htmlFor="comments" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Комментарий к записи
        </Label>
        <Textarea
          id="comments"
          value={formData.comments}
          onChange={(e) => onChange('comments', e.target.value)}
          placeholder="Например: опоздаю на 10 минут"
          className="border-beauty-200 dark:border-gray-700 min-h-[80px]"
        />
      </div>
      
      <div>
        <Label htmlFor="reminderTime" className="block mb-2 text-beauty-800 dark:text-beauty-200">
          Напоминание
        </Label>
        <Select 
          value={formData.reminderTime} 
          onValueChange={(value) => onChange('reminderTime', value)}
        >
          <SelectTrigger className="border-beauty-200 dark:border-gray-700">
            <SelectValue placeholder="Выберите время напоминания" />
          </SelectTrigger>
          <SelectContent>
            {reminderOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => onChange('agreeToTerms', checked === true)}
          className="mt-1"
        />
        <div className="grid gap-1">
          <Label
            htmlFor="agreeToTerms"
            className="text-sm text-gray-500 dark:text-gray-400 font-normal leading-snug"
          >
            Я предоставляю согласие на обработку персональных данных, а также
            подтверждаю ознакомление и согласие с Политикой конфиденциальности и
            Пользовательским соглашением
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
