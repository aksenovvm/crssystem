import { Blocks } from "lucide-react";

import { EditorPanel } from "./EditorPanel";

interface BlockLibraryProps {
  className?: string;
}

export function BlockLibrary({ className }: BlockLibraryProps) {
  return (
    <EditorPanel title="Blocks" icon={Blocks} className={className}>
      <p className="text-sm text-muted-foreground">
        Здесь появится библиотека секций из Block Registry.
      </p>
    </EditorPanel>
  );
}
