import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { demoProject } from "@/builder/fixtures/demoProject";
import { EditorShell } from "@/components/editor/EditorShell";

export const metadata: Metadata = {
  title: "Editor",
};

export default async function EditorPage({ params }: PageProps<"/editor/[projectId]">) {
  const { projectId } = await params;

  // Пока есть только демо-проект; загрузка из repository появится в Sprint 11.1.
  if (projectId !== demoProject.id) {
    notFound();
  }

  return <EditorShell project={demoProject} />;
}
