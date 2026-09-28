import type { Metadata } from "next";

import { EditorShell } from "@/components/editor/EditorShell";

export const metadata: Metadata = {
  title: "Editor",
};

export default async function EditorPage({ params }: PageProps<"/editor/[projectId]">) {
  const { projectId } = await params;

  return <EditorShell projectName={projectId} />;
}
