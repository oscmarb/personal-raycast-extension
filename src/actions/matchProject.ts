import { Project } from "../entity/project";
import { fuseSearch } from "./fuseSearch";

export function matchProject(
  query: string,
  section?: string,
): Project | undefined {
  return fuseSearch(query, section).at(0);
}
