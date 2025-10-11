import { useEffect, useState } from "react";
import {
  Action,
  ActionPanel,
  List,
  showToast,
  Toast,
  closeMainWindow,
  PopToRootType,
} from "@raycast/api";
import { openProject } from "./actions/openProject";
import { getProjects } from "./actions/getProjects";
import { fuseSearch } from "./actions/fuseSearch";
import { Project } from "./entity/project";
import { getEditorName } from "./actions/getEditorName";
import { getDefaultEditor } from "./actions/getDefaultEditor";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [editor, setEditor] = useState("");

  useEffect(() => {
    setIsLoading(true);

    setEditor(getEditorName(getDefaultEditor()));
    setFilteredProjects(getProjects());

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (sections.length === 0) {
      setSections(
        Array.from(new Set(getProjects().map((project) => project.section))),
      );
    }

    setFilteredProjects(fuseSearch(searchText, selectedSection));

    setIsLoading(false);
  }, [searchText, selectedSection]);

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Project Section"
          value={selectedSection}
          onChange={setSelectedSection}
        >
          <List.Dropdown.Item key="all" value="all" title="all" />
          {sections.map((section) => (
            <List.Dropdown.Item key={section} value={section} title={section} />
          ))}
        </List.Dropdown>
      }
    >
      {filteredProjects.map((project) => (
        <List.Item
          title={project.name}
          subtitle={project.section}
          key={project.path}
          actions={
            <ActionPanel title={project.name}>
              <Action
                title={`Open in ${editor}`}
                onAction={async () => {
                  const toast = await showToast({
                    style: Toast.Style.Animated,
                    title: `Opening ${project.name} in ${editor}`,
                  });

                  openProject({ project: project.path, resource: "editor" });
                  await new Promise((resolve) => setTimeout(resolve, 500));

                  toast.style = Toast.Style.Success;
                  toast.title = `Project ${project.name} opened in ${editor}`;

                  await new Promise((resolve) => setTimeout(resolve, 500));
                  await closeMainWindow({
                    clearRootSearch: true,
                    popToRootType: PopToRootType.Immediate,
                  });
                }}
              />
              <Action
                title="Open in Terminal"
                onAction={async () => {
                  openProject({ project: project.path, resource: "terminal" });
                  await closeMainWindow({
                    clearRootSearch: true,
                    popToRootType: PopToRootType.Immediate,
                  });
                }}
              />
              <Action.CopyToClipboard content={project.path} />
              <Action.OpenWith path={project.path} />
              <Action.Open title="Open in Finder" target={project.path} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
