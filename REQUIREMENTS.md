# Requirements Management - Development Requirements

## Auto Save & Git Push

Every time a project is uploaded or any modification is made, the system must **automatically save and push changes to the Git repository**.

### Rules

- **On project upload**: After uploading a new project, automatically run `git add`, `git commit`, and `git push` to sync changes to the remote repository.
- **On every modification**: After each code or file modification, automatically stage, commit, and push the changes.
- **Commit messages**: Should be descriptive and reflect the nature of the change (e.g., `feat: add new requirement`, `fix: update dashboard layout`).
- **Target branch**: Push to the current working branch (default: `main`).
