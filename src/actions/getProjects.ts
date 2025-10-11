import { execSync } from "child_process";
import { Project } from "../entity/project";

let projectsMap: Map<string, Project> | undefined;

export function projectByPath(path: string | undefined): Project | undefined {
  return projectsMap?.get(path ?? "");
}

export function getProjects(): Project[] {
  if (projectsMap) {
    return Array.from(projectsMap.values());
  }

  const projectPaths = execSync("project::list", { shell: "/bin/bash" })
    .toString()
    .split("\n")
    .map((projectPath) => projectPath.trim())
    .filter((projectPath) => projectPath.length > 0);

  projectsMap = new Map();

  projectPaths.forEach((projectPath) => {
    const projectSplittedPath = projectPath.split("/");

    const projectName = projectSplittedPath.pop();
    const projectSection = projectSplittedPath.pop();

    if (!projectName || !projectSection) {
      throw new Error("Invalid project path: " + projectPath);
    }

    projectsMap?.set(
      projectPath,
      new Project(projectName, projectSection, projectPath),
    );
  });

  return Array.from(projectsMap.values());
}
