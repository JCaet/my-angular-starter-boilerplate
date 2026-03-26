# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code Global Policy

### Efficiency Guidelines

- Do not perform "Deep Scans" on the whole repo unless explicitly asked.
- Confirm before any task that requires scanning the entire `/node_modules` or `/dist` folders, or equivalent dependency installations for python.
- Prefer `grep` or `ripgrep` over reading multiple files to find definitions.
- For documentation updates, use the smallest possible context window.
- Before executing any code changes, provide a Plan including which files will be read. Do not read the files until the Plan is approved.

### Token Conservation

- If the projected cost/token count for a plan looks high, provide a summary and wait for approval.
- Avoid repeating entire file contents in the chat if only one line changed.

## Known Configuration Notes

- **`security.allowedHosts` in `angular.json`** is set to `[]`, which means only `localhost` is permitted by the dev server. If you run `ng serve` inside a VM, container, or remote dev environment and hit an "Invalid Host header" error, add your hostname: `"allowedHosts": ["my-dev-host.internal"]`.

## Shared Conventions

- **Commits:** Conventional Commits format across all projects (`feat:`, `fix:`, `chore:`, etc.)
- **Versioning:** Semantic versioning automated via GitHub Actions
- **CI/CD:** GitHub Actions for testing and deployment; Cloud Run for Telegram bots
- **Containerization:** Docker multi-stage builds where applicable