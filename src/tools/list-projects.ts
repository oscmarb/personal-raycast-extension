import { fuseSearch } from "../actions/fuseSearch";

type Input = {
  query?: string;
  section?: string;
};

export default function (input: Input) {
  if (!input.query && !input.section) {
    return "Please enter a query or section.";
  }

  return fuseSearch(input.query, input.section).map((project) => project.name);
}
