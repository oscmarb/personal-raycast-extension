import { getDefaultEditor } from "../actions/getDefaultEditor";
import { getEditorName } from "../actions/getEditorName";
import { matchProject } from "../actions/matchProject";
import { openProject } from "../actions/openProject";
import { ProjectNotFoundError } from "../errors/projectNotFoundError";

type Input = {
  project: string;
  resource?: "editor" | "terminal" | "finder";
  section?: string;
};

export default function (input: Input) {
  if (!input.project) {
    return "Please enter a project name.";
  }

  const project = matchProject(input.project, input.section);

  if (!project) {
    return "Project not found.";
  }

  try {
    openProject({
      project: project.name,
      resource: input.resource ?? "editor",
    });
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return "Project not found.";
    }

    throw error;
  }

  if (!input.resource || input.resource === "editor") {
    return `Opening ${project.name} in ${getEditorName(getDefaultEditor())}`;
  }

  if (input.resource === "terminal") {
    return `Opening ${project.name} in the terminal`;
  }

  if (input.resource === "finder") {
    return `Opening ${project.name} in finder`;
  }

  return `Opening ${project.name}`;
}
