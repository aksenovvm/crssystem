/**
 * Регистрация всех блоков проекта.
 * Чтобы подключить новый блок, добавь его definition в массив ниже —
 * ядро (registry, PageRenderer, Canvas) менять не нужно.
 *
 * Модули, которые читают registry, импортируют этот файл ради side effect:
 * `import "@/builder/blocks";`
 */
import { registerBlock } from "../registry/blockRegistry";
import type { BlockDefinition } from "../registry/types";

import { testDefinition } from "./test/definition";

const definitions: BlockDefinition[] = [testDefinition];

definitions.forEach(registerBlock);
