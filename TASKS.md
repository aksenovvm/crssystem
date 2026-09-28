# TASKS — Visual Site Builder

## Как пользоваться этим файлом

Проект разбит на маленькие учебные спринты.

Каждый спринт содержит примерно 5–10 задач.

После каждого спринта есть обязательная точка:

> ✅ CHECKPOINT — проект должен запускаться и текущий функционал должен быть проверяемым.

Не проси AI-агента делать весь файл сразу.

Используй команду:

```text
Прочитай PRD.md, SPEC.md и TASKS.md.
Выполни только Sprint N.
Не переходи к следующему sprint.
После выполнения отметь сделанные checkbox в TASKS.md,
запусти проверки из CHECKPOINT и остановись.
```

---

# PHASE 0 — Bootstrap

## Sprint 0.1 — Создание проекта

- [x] 1. Создать Next.js проект с App Router и TypeScript strict.
- [x] 2. Подключить Tailwind CSS.
- [x] 3. Подключить shadcn/ui.
- [x] 4. Подключить Lucide Icons.
- [x] 5. Создать базовые директории `builder`, `store`, `types`, `repositories`.
- [x] 6. Создать главную страницу-заглушку.
- [x] 7. Добавить общий layout приложения.
- [x] 8. Проверить TypeScript и dev server.

### ✅ CHECKPOINT 0.1

Ученик должен увидеть стартовую страницу.

Проверки:

```bash
npm run dev
npm run build
```

Ожидается:

- приложение открывается;
- ошибок TypeScript нет;
- production build проходит.

---

# PHASE 1 — Editor Shell

## Sprint 1.1 — Каркас редактора

- [x] 1. Создать `/editor/demo`.
- [x] 2. Создать `EditorShell`.
- [x] 3. Создать `EditorTopbar`.
- [x] 4. Создать `BlockLibrary`.
- [x] 5. Создать `EditorCanvas`.
- [x] 6. Создать `Inspector`.
- [x] 7. Сделать layout: left / center / right.
- [x] 8. Добавить адаптивную минимальную стилизацию editor UI.

### ✅ CHECKPOINT 1.1

Страница `/editor/demo` должна показывать:

```text
Blocks | Canvas | Inspector
```

Все панели видны, приложение запускается.

---

## Sprint 1.2 — Основные типы данных

- [x] 1. Создать `Breakpoint`.
- [x] 2. Создать `LocalizedText`.
- [x] 3. Создать `ResponsiveValue<T>`.
- [x] 4. Создать `SpacingValue`.
- [x] 5. Создать `BlockStyles`.
- [x] 6. Создать `PageBlock`.
- [x] 7. Создать `Page`.
- [x] 8. Создать `SiteProject`.
- [x] 9. Создать demo project fixture.

### ✅ CHECKPOINT 1.2

Editor должен продолжать запускаться.

В Canvas вывести:

- имя demo project;
- название текущей страницы;
- количество блоков.

---

# PHASE 2 — Block Registry + Renderer

## Sprint 2.1 — Block Registry

- [x] 1. Создать `BlockDefinition`.
- [x] 2. Создать `BlockVariant`.
- [x] 3. Создать singleton/simple registry.
- [x] 4. Реализовать `registerBlock`.
- [x] 5. Реализовать `getBlockDefinition`.
- [x] 6. Реализовать `getAllBlocks`.
- [x] 7. Реализовать `getBlocksByCategory`.
- [x] 8. Реализовать `createBlock`.

### ✅ CHECKPOINT 2.1

В левой панели вывести список зарегистрированных блоков.

На этом этапе достаточно одного тестового блока.

---

## Sprint 2.2 — Первый реальный блок Hero

- [x] 1. Создать Hero block.
- [x] 2. Добавить variant `centered`.
- [x] 3. Добавить variant `split`.
- [x] 4. Создать default content.
- [x] 5. Зарегистрировать Hero в registry.
- [x] 6. Создать `PageRenderer`.
- [x] 7. Отрендерить Hero из Page JSON.
- [x] 8. Добавить fallback для неизвестного block type.

### ✅ CHECKPOINT 2.2

Canvas должен показывать Hero из JSON.

Важно: Hero должен появляться через Registry + PageRenderer, а не быть захардкожен в Canvas.

---

# PHASE 3 — Editor State

## Sprint 3.1 — Zustand store

- [x] 1. Установить Zustand.
- [x] 2. Создать `editorStore`.
- [x] 3. Перенести demo project в store.
- [x] 4. Добавить `selectedPageId`.
- [x] 5. Добавить `selectedBlockId`.
- [x] 6. Добавить `currentBreakpoint`.
- [x] 7. Добавить `currentLocale`.
- [x] 8. Подключить Canvas к store.

### ✅ CHECKPOINT 3.1

Hero отображается из Zustand state.

В Topbar вывести:

- текущий breakpoint;
- текущий locale.

---

## Sprint 3.2 — Выбор блока

- [x] 1. Создать `EditorBlockFrame`.
- [x] 2. Добавить hover outline.
- [x] 3. Добавить selected outline.
- [x] 4. Клик по блоку выбирает его.
- [x] 5. Клик по пустой области снимает выбор.
- [x] 6. Inspector показывает ID выбранного блока.
- [x] 7. Inspector показывает block type.
- [x] 8. Добавить label выбранного блока.

### ✅ CHECKPOINT 3.2

Ученик может кликнуть Hero и увидеть его данные справа.

---

# PHASE 4 — CRUD блоков

## Sprint 4.1 — Добавление и удаление

- [x] 1. Реализовать `addBlock`.
- [x] 2. Реализовать `removeBlock`.
- [x] 3. Добавить кнопку Add Hero.
- [x] 4. Добавить Delete в `EditorBlockFrame`.
- [x] 5. Добавить `duplicateBlock`.
- [x] 6. После удаления корректно очищать selection.
- [x] 7. Добавить confirm/undo-friendly UX без browser alert.
- [x] 8. Проверить уникальность ID.

### ✅ CHECKPOINT 4.1

Пользователь может:

- добавить Hero;
- создать несколько Hero;
- дублировать;
- удалить.

После reload пока данные могут сбрасываться.

---

## Sprint 4.2 — Ещё 4 блока

- [x] 1. Создать Features.
- [x] 2. Создать Services.
- [x] 3. Создать TextImage.
- [x] 4. Создать CTA.
- [x] 5. Зарегистрировать все блоки.
- [x] 6. Добавить категории блоков.
- [x] 7. Добавить поиск по библиотеке.
- [x] 8. Добавить выбор variant при необходимости.

### ✅ CHECKPOINT 4.2

В Library минимум 5 типов блоков.

Любой из них можно добавить на страницу.

---

# PHASE 5 — Drag-and-drop

## Sprint 5.1 — Сортировка блоков

- [x] 1. Установить `@dnd-kit/core`.
- [x] 2. Установить `@dnd-kit/sortable`.
- [x] 3. Обернуть Canvas в DndContext.
- [x] 4. Сделать блоки sortable.
- [x] 5. Реализовать `moveBlock`.
- [x] 6. Добавить drag handle.
- [x] 7. Добавить DragOverlay.
- [x] 8. Сохранить selection после reorder.

### ✅ CHECKPOINT 5.1

Ученик добавляет 3–4 блока и меняет их порядок мышью.

После drop порядок должен реально меняться в JSON/store.

---

# PHASE 6 — Content Editing

## Sprint 6.1 — Базовые editor controls

- [ ] 1. Создать `TextControl`.
- [ ] 2. Создать `TextareaControl`.
- [ ] 3. Создать `SelectControl`.
- [ ] 4. Создать utility `setByPath`.
- [ ] 5. Реализовать `updateBlockContent`.
- [ ] 6. Подключить Hero title к Inspector.
- [ ] 7. Подключить Hero description.
- [ ] 8. Подключить variant selector.

### ✅ CHECKPOINT 6.1

При изменении текста в Inspector Hero обновляется сразу без reload.

---

## Sprint 6.2 — Inline editing

- [ ] 1. Сделать редактируемый title в Hero.
- [ ] 2. Сделать редактируемый description.
- [ ] 3. Синхронизировать inline edit со store.
- [ ] 4. Не ломать block selection.
- [ ] 5. Обработать Enter/Escape.
- [ ] 6. Добавить визуальный edit state.

### ✅ CHECKPOINT 6.2

Текст можно менять:

- через Inspector;
- прямо в Canvas.

Оба способа меняют одни данные.

---

# PHASE 7 — Style Controls

## Sprint 7.1 — SliderControl

- [ ] 1. Создать `SliderControl`.
- [ ] 2. Добавить slider.
- [ ] 3. Добавить numeric input.
- [ ] 4. Синхронизировать slider/input.
- [ ] 5. Добавить min/max/step.
- [ ] 6. Добавить unit.
- [ ] 7. Добавить reset.
- [ ] 8. Добавить `updateBlockStyle`.

### ✅ CHECKPOINT 7.1

В Inspector должен быть тестовый slider.

Изменение slider должно менять стиль выбранного блока в реальном времени.

---

## Sprint 7.2 — SpacingControl

- [ ] 1. Создать `SpacingControl`.
- [ ] 2. Добавить linked mode.
- [ ] 3. Добавить unlinked mode.
- [ ] 4. Добавить Top.
- [ ] 5. Добавить Right.
- [ ] 6. Добавить Bottom.
- [ ] 7. Добавить Left.
- [ ] 8. Подключить padding выбранного блока.

### ✅ CHECKPOINT 7.2

Ученик двигает padding и визуально видит изменение секции.

Проверить linked/unlinked.

---

## Sprint 7.3 — Основные visual controls

- [ ] 1. ColorControl.
- [ ] 2. SegmentedControl.
- [ ] 3. ToggleControl.
- [ ] 4. columns control.
- [ ] 5. alignment control.
- [ ] 6. border-radius slider.
- [ ] 7. gap slider.
- [ ] 8. max-width slider.

### ✅ CHECKPOINT 7.3

Минимум один блок должен визуально поддерживать:

- background;
- padding;
- gap;
- max-width;
- radius;
- alignment.

---

# PHASE 8 — Responsive

## Sprint 8.1 — Breakpoint switcher

- [ ] 1. Добавить Desktop кнопку.
- [ ] 2. Добавить Tablet кнопку.
- [ ] 3. Добавить Mobile кнопку.
- [ ] 4. Менять ширину Canvas.
- [ ] 5. Хранить currentBreakpoint в store.
- [ ] 6. Создать `resolveResponsiveValue`.
- [ ] 7. Написать простые unit-like проверки функции.
- [ ] 8. Подключить resolver к renderer.

### ✅ CHECKPOINT 8.1

Canvas реально меняет ширину.

Стили пока могут быть одинаковыми, но resolver должен работать.

---

## Sprint 8.2 — Responsive styles

- [ ] 1. Сделать padding responsive.
- [ ] 2. Сделать gap responsive.
- [ ] 3. Сделать font-size responsive.
- [ ] 4. Сделать max-width responsive.
- [ ] 5. Inspector пишет значение в текущий breakpoint.
- [ ] 6. Реализовать fallback mobile → tablet → desktop.
- [ ] 7. Добавить reset только текущего breakpoint.
- [ ] 8. Проверить значения на Hero.

### ✅ CHECKPOINT 8.2

Пример проверки:

```text
Desktop padding = 80
Tablet padding = 48
Mobile padding = 20
```

При переключении viewport визуально видны разные значения.

---

# PHASE 9 — Typography

## Sprint 9.1 — Typography controls

- [ ] 1. font-size.
- [ ] 2. font-weight.
- [ ] 3. line-height.
- [ ] 4. letter-spacing.
- [ ] 5. text-align.
- [ ] 6. text color.
- [ ] 7. responsive font-size.
- [ ] 8. применить к Hero heading.

### ✅ CHECKPOINT 9.1

Heading Hero полностью редактируется из Inspector.

---

# PHASE 10 — Global Styles

## Sprint 10.1 — Design tokens

- [ ] 1. Создать `GlobalStyles`.
- [ ] 2. Добавить primary.
- [ ] 3. Добавить secondary.
- [ ] 4. Добавить text/background.
- [ ] 5. Добавить heading/body fonts.
- [ ] 6. Добавить global radius.
- [ ] 7. Добавить container width.
- [ ] 8. Генерировать CSS variables.

### ✅ CHECKPOINT 10.1

Изменение primary color в Site Settings меняет блоки, которые используют global token.

---

# PHASE 11 — Persistence

## Sprint 11.1 — localStorage repository

- [ ] 1. Создать `ProjectRepository`.
- [ ] 2. Создать `LocalStorageProjectRepository`.
- [ ] 3. Реализовать save.
- [ ] 4. Реализовать load.
- [ ] 5. Добавить Zod validation при load.
- [ ] 6. Обработать corrupted data.
- [ ] 7. Подключить repository к editor.
- [ ] 8. Добавить кнопку Save для проверки.

### ✅ CHECKPOINT 11.1

Изменить страницу → сохранить → reload.

Данные должны восстановиться.

---

## Sprint 11.2 — Autosave

- [ ] 1. Добавить `isDirty`.
- [ ] 2. Добавить `saveStatus`.
- [ ] 3. Добавить debounce 700ms.
- [ ] 4. Не сохранять на каждый pixel движения slider.
- [ ] 5. Показать Saving.
- [ ] 6. Показать Saved.
- [ ] 7. Показать Error.
- [ ] 8. Проверить reload.

### ✅ CHECKPOINT 11.2

После редактирования:

```text
Saving... → Saved
```

После reload состояние сохраняется.

---

# PHASE 12 — Undo / Redo

## Sprint 12.1 — History

- [ ] 1. Создать `past`.
- [ ] 2. Создать `future`.
- [ ] 3. Реализовать undo.
- [ ] 4. Реализовать redo.
- [ ] 5. Ограничить history до 50.
- [ ] 6. Добавить кнопки в Topbar.
- [ ] 7. Добавить Ctrl/Cmd+Z.
- [ ] 8. Добавить Ctrl/Cmd+Shift+Z.

### ✅ CHECKPOINT 12.1

Добавить блок → изменить padding → undo → redo.

Состояние должно корректно возвращаться.

---

# PHASE 13 — Pages

## Sprint 13.1 — Несколько страниц

- [ ] 1. Создать page list.
- [ ] 2. Создать add page.
- [ ] 3. Создать delete page.
- [ ] 4. Создать rename page.
- [ ] 5. Добавить slug.
- [ ] 6. Переключение текущей страницы.
- [ ] 7. Отдельные blocks для каждой страницы.
- [ ] 8. Сохранять всё через repository.

### ✅ CHECKPOINT 13.1

Создать:

- Home;
- About;
- Services.

У каждой страницы собственный набор блоков.

---

# PHASE 14 — Multilingual

## Sprint 14.1 — Locale system

- [ ] 1. Добавить locales в project.
- [ ] 2. Добавить defaultLocale.
- [ ] 3. Переключатель RU/EN/UZ.
- [ ] 4. Создать helper `getLocalizedText`.
- [ ] 5. Hero title сделать LocalizedText.
- [ ] 6. Hero description сделать LocalizedText.
- [ ] 7. Inspector редактирует текущий locale.
- [ ] 8. Проверить сохранение переводов.

### ✅ CHECKPOINT 14.1

У Hero должны быть три независимых текста:

- RU;
- EN;
- UZ.

---

## Sprint 14.2 — Static translations

- [ ] 1. Создать translations dictionary.
- [ ] 2. Добавить ключи кнопок.
- [ ] 3. Добавить меню.
- [ ] 4. Создать редактор translation entries.
- [ ] 5. Добавить fallback locale.
- [ ] 6. Подключить хотя бы CTA button.
- [ ] 7. Сохранить словарь.
- [ ] 8. Проверить переключение языка.

### ✅ CHECKPOINT 14.2

Переключение языка меняет:

- content;
- одну статическую кнопку через translation key.

---

# PHASE 15 — SEO

## Sprint 15.1 — Page SEO

- [ ] 1. Добавить SEO model.
- [ ] 2. SEO title.
- [ ] 3. SEO description.
- [ ] 4. canonical.
- [ ] 5. OG title.
- [ ] 6. OG description.
- [ ] 7. OG image.
- [ ] 8. noIndex.

### ✅ CHECKPOINT 15.1

В настройках страницы можно заполнить SEO и сохранить после reload.

---

# PHASE 16 — Preview

## Sprint 16.1 — Preview route

- [ ] 1. Создать preview route.
- [ ] 2. Использовать тот же PageRenderer.
- [ ] 3. Убрать editor frames.
- [ ] 4. Добавить выбранный locale.
- [ ] 5. Добавить Desktop view.
- [ ] 6. Добавить Tablet view.
- [ ] 7. Добавить Mobile view.
- [ ] 8. Добавить Open in new tab.

### ✅ CHECKPOINT 16.1

Preview выглядит как сайт, без UI редактора.

---

# PHASE 17 — Дополнительные блоки

## Sprint 17.1 — Marketing blocks

- [ ] 1. Gallery.
- [ ] 2. Statistics.
- [ ] 3. Pricing.
- [ ] 4. Team.
- [ ] 5. Reviews.
- [ ] 6. FAQ.
- [ ] 7. Contacts.
- [ ] 8. Footer.

### ✅ CHECKPOINT 17.1

В библиотеке минимум 13 типов секций.

Собрать тестовый полноценный landing page.

---

# PHASE 18 — Templates

## Sprint 18.1 — Page templates

- [ ] 1. Создать template type.
- [ ] 2. Landing template.
- [ ] 3. Corporate template.
- [ ] 4. Services template.
- [ ] 5. About template.
- [ ] 6. Contacts template.
- [ ] 7. Выбор шаблона при создании.
- [ ] 8. Template создаёт обычный Page JSON.

### ✅ CHECKPOINT 18.1

Создание Landing template сразу создаёт готовый набор секций, которые можно редактировать как обычные блоки.

---

# PHASE 19 — Posts

## Sprint 19.1 — Posts data

- [ ] 1. Создать Post type.
- [ ] 2. Создать Category type.
- [ ] 3. Список статей.
- [ ] 4. Создание статьи.
- [ ] 5. Редактирование title.
- [ ] 6. slug.
- [ ] 7. category.
- [ ] 8. draft/published.

### ✅ CHECKPOINT 19.1

Можно создать и сохранить статью.

---

## Sprint 19.2 — Article blocks

- [ ] 1. Paragraph.
- [ ] 2. Heading.
- [ ] 3. Image.
- [ ] 4. Quote.
- [ ] 5. List.
- [ ] 6. Code.
- [ ] 7. reorder article blocks.
- [ ] 8. preview статьи.

### ✅ CHECKPOINT 19.2

Создать тестовую статью минимум из 5 блоков.

---

# PHASE 20 — Media

## Sprint 20.1 — Media library MVP

- [ ] 1. Создать MediaAsset type.
- [ ] 2. Media page.
- [ ] 3. Добавление image URL / local demo upload.
- [ ] 4. alt text.
- [ ] 5. delete asset.
- [ ] 6. ImageControl.
- [ ] 7. Использовать image в Hero.
- [ ] 8. Использовать image в TextImage.

### ✅ CHECKPOINT 20.1

Из Media Library можно выбрать изображение для блока.

---

# PHASE 21 — Menus

## Sprint 21.1 — Menu builder

- [ ] 1. Создать Menu type.
- [ ] 2. Добавить menu items.
- [ ] 3. Page link.
- [ ] 4. External link.
- [ ] 5. reorder.
- [ ] 6. label translations.
- [ ] 7. подключить Header.
- [ ] 8. сохранить меню.

### ✅ CHECKPOINT 21.1

Header показывает реальное меню из проекта.

---

# PHASE 22 — Export

## Sprint 22.1 — Export foundation

- [ ] 1. Установить JSZip.
- [ ] 2. Создать `ExportService`.
- [ ] 3. Создать простой HTML renderer.
- [ ] 4. Экспортировать Home.
- [ ] 5. Добавить CSS.
- [ ] 6. Создать ZIP.
- [ ] 7. Скачать ZIP.
- [ ] 8. Проверить `index.html`.

### ✅ CHECKPOINT 22.1

Скачать ZIP, распаковать, открыть `index.html`.

Страница должна отображаться без запуска Next.js.

---

## Sprint 22.2 — Multi-page export

- [ ] 1. Экспортировать все published pages.
- [ ] 2. Создать slug directories.
- [ ] 3. Исправить внутренние ссылки.
- [ ] 4. Собрать assets.
- [ ] 5. Добавить favicon.
- [ ] 6. Добавить page titles.
- [ ] 7. Добавить meta descriptions.
- [ ] 8. Проверить 3-страничный сайт.

### ✅ CHECKPOINT 22.2

Экспортировать:

- Home;
- About;
- Services.

Все ссылки работают локально.

---

## Sprint 22.3 — SEO export

- [ ] 1. sitemap.xml.
- [ ] 2. robots.txt.
- [ ] 3. canonical.
- [ ] 4. OpenGraph.
- [ ] 5. lang.
- [ ] 6. hreflang.
- [ ] 7. noIndex handling.
- [ ] 8. базовая validation экспортированных файлов.

### ✅ CHECKPOINT 22.3

В ZIP присутствуют:

```text
sitemap.xml
robots.txt
```

HTML содержит SEO meta.

---

# PHASE 23 — UX polish

## Sprint 23.1 — Editor usability

- [ ] 1. Empty states.
- [ ] 2. Tooltips.
- [ ] 3. Keyboard shortcuts help.
- [ ] 4. Better drag feedback.
- [ ] 5. Loading states.
- [ ] 6. Error states.
- [ ] 7. Confirmation UI.
- [ ] 8. Accessibility basics.

### ✅ CHECKPOINT 23.1

Пройти полный пользовательский сценарий без console errors.

---

# PHASE 24 — AI Extension

## Sprint 24.1 — AI page schema

- [ ] 1. Создать Zod schema для AI page response.
- [ ] 2. Ограничить allowed block types Registry.
- [ ] 3. Создать AI service interface.
- [ ] 4. Создать mock AI provider.
- [ ] 5. Prompt input modal.
- [ ] 6. Получить JSON.
- [ ] 7. Validate JSON.
- [ ] 8. Создать Page из результата.

### ✅ CHECKPOINT 24.1

Даже без реального API:

```text
"Сайт стоматологии"
```

через mock provider создаёт страницу из существующих блоков.

---

## Sprint 24.2 — Реальный AI provider (опционально)

- [ ] 1. Добавить server-side API route.
- [ ] 2. Спрятать API key на сервере.
- [ ] 3. Передавать Registry schema.
- [ ] 4. Требовать JSON-only output.
- [ ] 5. Валидировать Zod.
- [ ] 6. Обрабатывать invalid response.
- [ ] 7. Обрабатывать API error.
- [ ] 8. Добавить rate-limit/cost guard.

### ✅ CHECKPOINT 24.2

AI создаёт страницу только из зарегистрированных блоков.

---

# PHASE 25 — Final MVP verification

## Sprint 25.1 — Полный smoke test

- [ ] 1. Создать новый проект.
- [ ] 2. Создать 3 страницы.
- [ ] 3. Добавить 8+ типов блоков.
- [ ] 4. Изменить content.
- [ ] 5. Изменить visual styles.
- [ ] 6. Настроить responsive.
- [ ] 7. Заполнить RU/EN/UZ.
- [ ] 8. Заполнить SEO.
- [ ] 9. Перезагрузить и проверить persistence.
- [ ] 10. Экспортировать ZIP.

### ✅ FINAL CHECKPOINT

MVP готов, если:

- `npm run dev` работает;
- `npm run build` проходит;
- нет TypeScript errors;
- editor работает;
- autosave работает;
- responsive работает;
- multilingual работает;
- preview работает;
- экспортированный сайт открывается отдельно от конструктора.

---

# Шаблон запроса к AI на каждый новый запуск

```text
Прочитай полностью:
- PRD.md
- SPEC.md
- TASKS.md

Работай только над Sprint <номер>.

Правила:
1. Не переходи к следующему sprint.
2. Не реализуй функции "на будущее", если они не нужны текущему sprint.
3. Сначала изучи существующий код.
4. Сохраняй текущую архитектуру проекта.
5. После каждой существенной правки проверяй TypeScript.
6. В конце выполни CHECKPOINT текущего sprint.
7. Исправь ошибки, если checkpoint не проходит.
8. Отметь выполненные задачи в TASKS.md.
9. Кратко запиши, какие файлы изменены.
10. После успешного checkpoint остановись.

Если не хватает токенов:
- не начинай следующий sprint;
- зафиксируй, какие checkbox завершены;
- оставь незавершённые checkbox без отметки;
- опиши последнюю стабильную точку проекта.
```

# Рекомендуемый размер работы для бесплатного агента

Оптимально выдавать:

- 1 sprint за запуск;
- примерно 5–10 задач;
- максимум 1 новую крупную концепцию за sprint.

Не рекомендуется:

```text
"Сделай Phase 1-10"
```

Рекомендуется:

```text
"Сделай только Sprint 7.2"
```

Так ученик после каждой небольшой серии изменений получает рабочий проект, а новый AI-сеанс может продолжить с последнего checkbox.
