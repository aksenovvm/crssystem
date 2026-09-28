# Visual Site Builder

Визуальный конструктор сайтов: страницы собираются из готовых секций, стили
настраиваются визуальными контролами, результат экспортируется как статический сайт.

Документы проекта:

- [PRD.md](PRD.md) — что строим и для кого;
- [SPEC.md](SPEC.md) — архитектура, модель данных, API;
- [TASKS.md](TASKS.md) — учебные спринты с checkpoint'ами (отмеченные checkbox = сделано).

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # проверка TypeScript
npm run build      # production build
```

## Стек

Next.js (App Router) · React · TypeScript strict · Tailwind CSS 4 · shadcn/ui (Radix) · Lucide Icons.

Компоненты shadcn/ui лежат в `src/components/ui`, конфигурация — `components.json`.
Новые компоненты добавляются командой `npx shadcn@latest add <name>`.

## Структура

```text
src/
├─ app/                 # маршруты Next.js
├─ components/
│  ├─ editor/           # оболочка редактора (Topbar, BlockLibrary, Canvas, Inspector, EditorBlockFrame)
│  ├─ controls/         # контролы Inspector (Text, Textarea, Select)
│  └─ ui/               # shadcn/ui
├─ builder/
│  ├─ registry/         # Block Registry: типы и API (registerBlock, createBlock, ...)
│  ├─ renderer/         # PageRenderer, EditableText, fallback для неизвестных блоков
│  ├─ blocks/           # блоки сайта (hero, features, services, text-image, cta) + blocks.css
│  └─ fixtures/         # демо-проект
├─ store/               # Zustand store редактора
├─ types/               # модель данных проекта
├─ repositories/        # сохранение проекта (Sprint 11.1)
└─ lib/                 # утилиты
```

## Как добавить новый блок

1. Создать папку `src/builder/blocks/<type>/` с renderer-компонентом и `definition.ts`
   (type, label, category, variants, createDefault, renderer, inspector).
2. Добавить definition в массив в `src/builder/blocks/index.ts`.
3. Стили блока — в `src/builder/blocks/blocks.css` (обычный CSS, container queries).

Ядро (registry, PageRenderer, Canvas) менять не нужно.

## Работа по спринтам

Каждый запуск AI-агента — один спринт из `TASKS.md`:

```text
Прочитай PRD.md, SPEC.md и TASKS.md.
Выполни только Sprint N.
Не переходи к следующему sprint.
После выполнения отметь сделанные checkbox в TASKS.md,
запусти проверки из CHECKPOINT и остановись.
```
