import Fuse from "fuse.js";
import { Project } from "../entity/project";
import { getProjects, projectByPath } from "./getProjects";

export function fuseSearch(
  query: string | undefined,
  section: string | undefined,
): Project[] {
  const project = projectByPath(query);

  if (project) {
    return [project];
  }

  let projects = getProjects();

  if (section && section !== "all") {
    projects = projects.filter((project) => project.section === section);
  }

  if (!query) {
    return projects;
  }

  const fuse = new Fuse(projects, {
    threshold: 0.4,
    keys: ["name"],
  });

  return fuse.search(query).map((result) => result.item);
}
