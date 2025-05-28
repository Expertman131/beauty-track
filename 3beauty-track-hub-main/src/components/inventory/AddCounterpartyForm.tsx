
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.string({
    required_error: "Пожалуйста, выберите тип контрагента",
  }),
  name: z.string().min(2, {
    message: "Название должно содержать не менее 2 символов",
  }),
  inn: z.string().regex(/^\d{10}$|^\d{12}$/, {
    message: "ИНН должен содержать 10 цифр для юрлиц или 12 цифр для физлиц",
  }),
  kpp: z.string().regex(/^\d{9}$/, {
    message: "КПП должен содержать 9 цифр",
  }).optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({
    message: "Неверный формат email",
  }).optional(),
  address: z.string().optional(),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCounterpartyFormProps {
  onSave: (data: FormValues) => void;
  onCancel: () => void;
}

const AddCounterpartyForm = ({ onSave, onCancel }: AddCounterpartyFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "legal",
      name: "",
      inn: "",
      kpp: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      comment: "",
    },
  });

  function onSubmit(data: FormValues) {
    onSave(data);
    toast.success("Контрагент успешно добавлен");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип контрагента" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="legal">Юр. лицо</SelectItem>
                    <SelectItem value="individual">Физ. лицо</SelectItem>
                    <SelectItem value="entrepreneur">ИП</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название*</FormLabel>
                <FormControl>
                  <Input placeholder="ООО Поставщик Красоты" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="inn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ИНН*</FormLabel>
                <FormControl>
                  <Input placeholder="7712345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kpp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>КПП</FormLabel>
                <FormControl>
                  <Input placeholder="773301001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактное лицо</FormLabel>
              <FormControl>
                <Input placeholder="Иванов Иван Иванович" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input placeholder="+7 (999) 123-45-67" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="г. Москва, ул. Примерная, д. 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea placeholder="Дополнительная информация" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Отмена
          </Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCounterpartyForm;
