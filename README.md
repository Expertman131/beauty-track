# Beauty Track Hub

Система управления салоном красоты - современное веб-приложение для управления записями, клиентами и услугами салона красоты.

## 🚀 Технологии

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Netlify (с Functions для API)
- **State Management**: React Query + Zustand

## 📦 Установка

1. **Клонируйте репозиторий**:
```bash
git clone https://github.com/Expertman131/beauty-track.git
cd beauty-track
```

2. **Установите зависимости**:
```bash
npm install
```

3. **Настройте переменные окружения**:
```bash
cp .env.example .env
```

Отредактируйте `.env` файл с вашими данными Supabase.

## 🛠️ Разработка

### Локальная разработка

```bash
# Обычная разработка
npm run dev

# Разработка с Netlify Functions
npm run dev:netlify
```

### Сборка

```bash
# Production сборка
npm run build

# Development сборка
npm run build:dev
```

## 🌐 Развертывание

### Автоматическое развертывание на Netlify

1. **Подключите репозиторий к Netlify**:
   - Перейдите на [app.netlify.com](https://app.netlify.com)
   - Нажмите "Add new site" → "Import an existing project"
   - Выберите GitHub и найдите репозиторий `beauty-track`

2. **Настройки сборки** (автоматически настроены в `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Переменные окружения** (настроены в `netlify.toml`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_ENV`

### Ручное развертывание

```bash
# Предварительный просмотр
npm run netlify:deploy:preview

# Production развертывание
npm run netlify:deploy
```

## 🗄️ База данных (Supabase)

### Настройка

1. Создайте проект на [supabase.com](https://supabase.com)
2. Скопируйте URL и anon key в переменные окружения
3. Настройте RLS (Row Level Security) политики

### Схема базы данных

```sql
-- Клиенты
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Услуги
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  duration INTEGER NOT NULL, -- в минутах
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Записи
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  service_id UUID REFERENCES services(id),
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Конфигурация

### Netlify Functions

API функции находятся в папке `netlify/functions/`. Пример:

```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' })
  };
};
```

### Переменные окружения

| Переменная | Описание | Обязательная |
|------------|----------|--------------|
| `VITE_SUPABASE_URL` | URL проекта Supabase | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Публичный ключ Supabase | ✅ |
| `VITE_APP_ENV` | Окружение приложения | ❌ |
| `VITE_API_BASE_URL` | Базовый URL для API | ❌ |

## 📁 Структура проекта

```
beauty-track/
├── src/
│   ├── components/     # React компоненты
│   ├── pages/         # Страницы приложения
│   ├── hooks/         # Пользовательские хуки
│   ├── lib/           # Утилиты и конфигурация
│   ├── types/         # TypeScript типы
│   └── styles/        # Стили
├── netlify/
│   └── functions/     # Serverless функции
├── public/            # Статические файлы
├── netlify.toml       # Конфигурация Netlify
└── package.json
```

## 🔒 Безопасность

- Все API ключи хранятся в переменных окружения
- Настроены заголовки безопасности в `netlify.toml`
- RLS политики в Supabase для защиты данных
- CORS настроен для API функций

## 📈 Мониторинг

- Логи Netlify Functions доступны в панели Netlify
- Аналитика Supabase для мониторинга базы данных
- Встроенная аналитика Netlify для трафика

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 🆘 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте [Issues](https://github.com/Expertman131/beauty-track/issues)
2. Создайте новый Issue с описанием проблемы
3. Обратитесь к документации [Netlify](https://docs.netlify.com) и [Supabase](https://supabase.com/docs)

---

**Beauty Track Hub** - создано с ❤️ для салонов красоты 