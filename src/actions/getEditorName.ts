export function getEditorName(editor: string) {
  if (!editor) {
    throw new Error("Unknown editor");
  }

  if (editor === "cursor") {
    return "Cursor";
  }

  if (editor === "code") {
    return "VSCode";
  }

  if (editor === "idea") {
    return "IntelliJ";
  }

  return editor;
}
