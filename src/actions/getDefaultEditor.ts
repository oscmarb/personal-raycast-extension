import { execSync } from "child_process";

export function getDefaultEditor() {
  return execSync(`echo $EDITOR`, { shell: "/bin/bash" }).toString().trim();
}
