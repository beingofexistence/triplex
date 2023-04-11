import { useEffect } from "react";
import { ContextPanel } from "./ui/context-panel";
import { EditorMenu } from "./ui/editor-menu";
import { ScenePanel } from "./ui/scene-panel";
import { ScenesDrawer } from "./ui/scenes-drawer";
import { SceneFrame } from "./scence-bridge";
import { useEditor } from "./stores/editor";
import { ControlsMenu } from "./ui/controls-menu";
import { newFilename } from "./util/file";

export function EditorFrame() {
  const { path, save, undo, redo, deleteComponent } = useEditor();

  useEffect(() => {
    if (!path) {
      return;
    }

    const callback = (e: KeyboardEvent) => {
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        save();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [path, save]);

  useEffect(() => {
    if (!path) {
      return;
    }

    const callback = (e: KeyboardEvent) => {
      if (
        e.key === "z" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
        e.shiftKey
      ) {
        redo();
      } else if (
        e.key === "z" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        undo();
      } else if (
        e.key === "Backspace" &&
        document.activeElement === document.body
      ) {
        deleteComponent();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [deleteComponent, path, redo, save, undo]);

  useEffect(() => {
    if (path) {
      const filename = path.split("/").at(-1);
      const parsedFilename = filename === newFilename ? "Untitled" : filename;

      window.document.title = parsedFilename + " • Triplex";
    }
  }, [path]);

  return (
    <div className="relative h-screen bg-neutral-900">
      <SceneFrame>
        <ScenesDrawer />

        <div className="absolute top-4 left-4 bottom-4 flex flex-col gap-3">
          <EditorMenu />
          {path && <ScenePanel />}
        </div>

        <div className="pointer-events-none absolute left-4 right-4 bottom-4 flex justify-center">
          <ControlsMenu />
        </div>
        <ContextPanel />
      </SceneFrame>
    </div>
  );
}
