# Personal Workflows - Raycast Extension

Currently focused on project management, this extension helps you quickly open
your projects in your favorite editor or terminal. Browse, search, and filter
your projects by section/category for fast access to your development workspace.

## Features

### Project Management Workflow

- 🔍 **Fuzzy Search**: Quickly find projects by name using fuzzy search
- 📂 **Project Sections**: Filter projects by custom sections/categories
- 🚀 **Quick Actions**: Open projects in your editor, terminal, or Finder
- 📋 **Copy Path**: Easily copy project paths to clipboard
- 🤖 **AI Tools**: Integration with Raycast AI for natural language project
  commands

## Prerequisites

This extension requires a `project::list` bash command that outputs your project
paths (one per line). You'll need to define this command in your shell
configuration.

### Setting up the `project::list` command

Add one of the following implementations to your `~/.bashrc` or `~/.zshrc`:

**Option 1: Simple directory listing**

```bash
function project::list() {
  find ~/Documents/projects -maxdepth 2 -type d -not -path "*/\.*"
}
```

**Option 2: Multiple project directories**

```bash
function project::list() {
  find ~/Documents/projects ~/Work ~/Projects -maxdepth 2 -type d -not -path "*/\.*" 2>/dev/null
}
```

**Option 3: Custom paths**

```bash
function project::list() {
  # List your project directories here, one per line
  echo "/Users/yourusername/projects/personal/my-app"
  echo "/Users/yourusername/projects/work/client-project"
  echo "/Users/yourusername/projects/own/raycast-extension"
}
```

**Important**: The extension expects paths in the format
`/.../section/project-name/`, where:

- The last directory is the **project name**
- The second-to-last directory is the **section** (used for categorization)

For example, `/Users/oscar/projects/own/raycast-extension` will appear as:

- **Name**: `raycast-extension`
- **Section**: `own`

## Installation

1. Clone this repository or download the source code
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Import the extension into Raycast:
   - Open Raycast
   - Go to Extensions
   - Click the `+` button
   - Select "Import Extension"
   - Choose the extension directory

## Usage

### Command: Open Project

Open Raycast and type "Open Project" to launch the extension.

**Features:**

- Search for projects by name (fuzzy search enabled)
- Filter by section using the dropdown menu
- Press `Enter` to open in your default editor (from `$EDITOR` environment
  variable)
- Press `⌘+T` to open in Terminal
- Press `⌘+C` to copy the project path
- Press `⌘+O` to open in Finder

### AI Tools

The extension includes AI tools that work with Raycast AI:

**`@open-project`**: Open a project using natural language

```
@open-project open padel
@open-project open padel terminal
```

## Configuration

### Setting Your Default Editor

The extension uses your `$EDITOR` environment variable to determine which editor
to use. Set it in your `~/.zshrc` or `~/.bashrc`:

```bash
export EDITOR="code"  # VS Code
# or
export EDITOR="cursor"  # Cursor
# or
export EDITOR="nvim"  # Neovim
```

## Development

### Available Commands

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build the extension for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run fix-lint` - Automatically fix linting issues

### Project Structure

```
raycast-extension/
├── src/
│   ├── actions/          # Core functionality
│   │   ├── getProjects.ts    # Fetch projects from project::list
│   │   ├── openProject.ts    # Open projects in editor/terminal
│   │   ├── fuseSearch.ts     # Fuzzy search implementation
│   │   └── ...
│   ├── entity/
│   │   └── project.ts        # Project entity model
│   ├── tools/            # AI tool implementations
│   │   ├── open-project.ts
│   │   └── list-projects.ts
│   └── open-project.tsx  # Main UI component
├── assets/
│   └── extension-icon.png
└── package.json
```

## Troubleshooting

### "project::list command not found"

Make sure you've added the `project::list` function to your shell configuration
and reloaded your shell:

```bash
source ~/.zshrc
```

### Projects not showing up

1. Test the command directly in your terminal:
   ```bash
   project::list
   ```
2. Ensure the output shows valid directory paths
3. Check that paths follow the format: `.../section/project-name/`

### Editor not opening

1. Check that your `$EDITOR` environment variable is set:
   ```bash
   echo $EDITOR
   ```
2. Ensure the editor command is in your PATH
3. Restart Raycast after changing environment variables

## Future Workflows

This extension is designed to support multiple personal workflows. The current
focus is project management, but the architecture allows for easy expansion.
Potential future workflows include:

- Quick notes and snippets
- Bookmarks and favorites
- Task management
- File and folder quick access
- Custom commands and scripts

Stay tuned for updates!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created by [oscmarb](https://github.com/oscmarb)
