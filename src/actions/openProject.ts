import { execSync } from "child_process";
import { matchProject } from "./matchProject";
import { ProjectNotFoundError } from "../errors/projectNotFoundError";

export function openProject(data: {
  project: string;
  resource: "editor" | "terminal" | "finder";
}): void {
  const { project, resource } = data;

  const projectObject = matchProject(project);

  if (!projectObject) {
    throw new ProjectNotFoundError();
  }

  if (resource === "editor") {
    execSync(`project::open ${projectObject.path}`, { shell: "/bin/bash" });
    return;
  }

  if (resource === "terminal") {
    execSync(`/opt/homebrew/bin/kitty ${projectObject.path}`, {
      shell: "/bin/zsh",
    });
    return;
  }

  execSync(`open ${projectObject.path}`, { shell: "/bin/bash" });
}
