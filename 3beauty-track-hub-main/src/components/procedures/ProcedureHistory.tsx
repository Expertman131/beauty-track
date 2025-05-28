import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Treatment } from '@/components/staff/types/staffTypes';
import { 
  Calendar, 
  Search, 
  Filter, 
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowDown,
  ArrowUp,
  FileText
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, isAfter, isBefore, parseISO } from 'date-fns';

interface ProcedureHistoryProps {
  procedures: Treatment[];
  clientsMock: { id: string; name: string; phone: string }[];
  dateRange: { from: Date | null; to: Date | null };
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
  onViewProcedure: (procedure: Treatment) => void;
}

const ProcedureHistory = ({ 
  procedures, 
  clientsMock, 
  dateRange, 
  onDateRangeChange, 
  onViewProcedure 
}: ProcedureHistoryProps) => {
  const [historyFilter, setHistoryFilter] = useState("");
  const [sortField, setSortField] = useState<"date" | "clientName" | "procedureName" | "staffName">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [clientFilterHistory, setClientFilterHistory] = useState("all");
  const [procedureTypeFilter, setProcedureTypeFilter] = useState("all");

  // Извлекаем все исторические записи из всех процедур
  const getAllHistoryItems = () => {
    const items: {
      id: string;
      date: string;
      procedureName: string;
      clientId: string;
      clientName: string;
      staffName: string;
      notes: string;
      originalProcedure: Treatment;
    }[] = [];

    procedures.forEach(procedure => {
      // Добавляем самую последнюю процедуру
      items.push({
        id: `${procedure.id}-latest`,
        date: procedure.date,
        procedureName: procedure.name,
        clientId: procedure.clientId,
        clientName: getClientName(procedure.clientId),
        staffName: procedure.staffName,
        notes: procedure.notes || "",
        originalProcedure: procedure
      });

      // Добавляем историю процедур
      if (procedure.history) {
        procedure.history.forEach((historyItem, index) => {
          // Пропускаем самую последнюю запись, так как она уже добавлена выше
          if (historyItem.date !== procedure.date) {
            items.push({
              id: `${procedure.id}-${index}`,
              date: historyItem.date,
              procedureName: historyItem.procedure,
              clientId: procedure.clientId,
              clientName: getClientName(procedure.clientId),
              staffName: historyItem.staffName,
              notes: historyItem.notes,
              originalProcedure: procedure
            });
          }
        });
      }
    });

    return items;
  };

  const getClientName = (clientId: string) => {
    return clientsMock.find(c => c.id === clientId)?.name || "Unknown Client";
  };

  // Фильтрация и сортировка истории
  const filteredHistory = getAllHistoryItems()
    .filter(item => {
      const matchesSearch = 
        item.procedureName.toLowerCase().includes(historyFilter.toLowerCase()) || 
        item.clientName.toLowerCase().includes(historyFilter.toLowerCase()) || 
        item.staffName.toLowerCase().includes(historyFilter.toLowerCase()) ||
        item.notes.toLowerCase().includes(historyFilter.toLowerCase());
      
      const matchesClient = clientFilterHistory === "all" || item.clientId === clientFilterHistory;
      const matchesProcedureType = procedureTypeFilter === "all" || item.procedureName === procedureTypeFilter;

      // Проверка на диапазон дат
      let matchesDateRange = true;
      if (dateRange.from || dateRange.to) {
        try {
          const itemDate = parseISO(item.date);
          if (dateRange.from && dateRange.to) {
            matchesDateRange = isAfter(itemDate, dateRange.from) && isBefore(itemDate, dateRange.to);
          } else if (dateRange.from) {
            matchesDateRange = isAfter(itemDate, dateRange.from);
          } else if (dateRange.to) {
            matchesDateRange = isBefore(itemDate, dateRange.to);
          }
        } catch (e) {
          // Если дата имеет неверный формат, просто включаем запись
          console.error("Ошибка при парсинге даты:", e);
        }
      }
      
      return matchesSearch && matchesClient && matchesProcedureType && matchesDateRange;
    })
    .sort((a, b) => {
      try {
        if (sortField === "date") {
          const dateA = parseISO(a.date);
          const dateB = parseISO(b.date);
          return sortDirection === "asc" 
            ? dateA.getTime() - dateB.getTime() 
            : dateB.getTime() - dateA.getTime();
        } else if (sortField === "clientName") {
          return sortDirection === "asc"
            ? a.clientName.localeCompare(b.clientName)
            : b.clientName.localeCompare(a.clientName);
        } else if (sortField === "procedureName") {
          return sortDirection === "asc"
            ? a.procedureName.localeCompare(b.procedureName)
            : b.procedureName.localeCompare(a.procedureName);
        } else if (sortField === "staffName") {
          return sortDirection === "asc"
            ? a.staffName.localeCompare(b.staffName)
            : b.staffName.localeCompare(a.staffName);
        }
        return 0;
      } catch (e) {
        console.error("Ошибка при сортировке:", e);
        return 0;
      }
    });

  // Переключение сортировки
  const toggleSort = (field: "date" | "clientName" | "procedureName" | "staffName") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Все уникальные типы процедур
  const procedureTypes = [...new Set(procedures.map(p => p.name))];

  // Форматируем диапазон дат для отображения
  const formatDateRangeDisplay = () => {
    let display = "За всё время";
    if (dateRange.from && dateRange.to) {
      display = `${format(dateRange.from, "dd.MM.yyyy")} - ${format(dateRange.to, "dd.MM.yyyy")}`;
    } else if (dateRange.from) {
      display = `С ${format(dateRange.from, "dd.MM.yyyy")}`;
    } else if (dateRange.to) {
      display = `По ${format(dateRange.to, "dd.MM.yyyy")}`;
    }
    return display;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-xl font-semibold text-beauty-800">История процедур</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-beauty-500" />
            <span className="text-sm text-beauty-700">{formatDateRangeDisplay()}</span>
          </div>
          
          <div className="flex gap-2">
            <Input 
              type="date" 
              className="w-32" 
              value={dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                onDateRangeChange({
                  ...dateRange,
                  from: e.target.value ? new Date(e.target.value) : null
                });
              }}
            />
            <span className="self-center text-beauty-500">—</span>
            <Input 
              type="date" 
              className="w-32" 
              value={dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                onDateRangeChange({
                  ...dateRange,
                  to: e.target.value ? new Date(e.target.value) : null
                });
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="w-full md:w-auto flex flex-wrap gap-2 md:gap-4">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-beauty-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Поиск в истории..."
              className="pl-9"
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
            />
          </div>
          
          <Select value={clientFilterHistory} onValueChange={setClientFilterHistory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Фильтр по клиенту" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все клиенты</SelectItem>
              {clientsMock.map(client => (
                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={procedureTypeFilter} onValueChange={setProcedureTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Тип процедуры" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все процедуры</SelectItem>
              {procedureTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={() => {
            setHistoryFilter("");
            setClientFilterHistory("all");
            setProcedureTypeFilter("all");
            onDateRangeChange({ from: null, to: null });
          }}
          variant="outline"
          size="sm"
          className="whitespace-nowrap"
        >
          <Filter className="h-4 w-4 mr-2" />
          Сбросить фильтры
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          {filteredHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("date")}>
                    <div className="flex items-center">
                      Дата
                      {sortField === "date" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("clientName")}>
                    <div className="flex items-center">
                      Клиент
                      {sortField === "clientName" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("procedureName")}>
                    <div className="flex items-center">
                      Процедура
                      {sortField === "procedureName" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => toggleSort("staffName")}>
                    <div className="flex items-center">
                      Специалист
                      {sortField === "staffName" && (
                        sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Заметки</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((historyItem) => (
                  <TableRow key={historyItem.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-beauty-500" />
                        {historyItem.date}
                      </div>
                    </TableCell>
                    <TableCell>{historyItem.clientName}</TableCell>
                    <TableCell>{historyItem.procedureName}</TableCell>
                    <TableCell>{historyItem.staffName}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {historyItem.notes || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => onViewProcedure(historyItem.originalProcedure)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-beauty-300 mb-3" />
              <h3 className="text-lg font-medium text-beauty-900 mb-1">История не найдена</h3>
              <p className="text-beauty-600 mb-4">
                Нет записей, соответствующих выбранным фильтрам
              </p>
              <Button 
                onClick={() => {
                  setHistoryFilter("");
                  setClientFilterHistory("all");
                  setProcedureTypeFilter("all");
                  onDateRangeChange({ from: null, to: null });
                }}
                variant="outline"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center mt-6">
        <Button className="bg-beauty-500 hover:bg-beauty-600">
          Экспорт истории
        </Button>
      </div>
    </div>
  );
};

export default ProcedureHistory;
