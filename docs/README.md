# Developer docs

In-repo documentation for contributors and agents working on WP Plugin Info Card.

**User-facing** shortcode and block docs stay on [DLX Plugins](https://docs.dlxplugins.com/product/wp-plugin-info-card/). WordPress.org listing copy lives in [`readme.txt`](../readme.txt).

## Start here

1. [`../AGENTS.md`](../AGENTS.md) — orientation for AI agents (stack, edit rules, pitfalls)
2. [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — local setup, build, dual-template rule, releases
3. Then the topic pages below

## Topics

| Doc | What it covers |
|-----|----------------|
| [architecture.md](architecture.md) | React vs PHP, why shortcodes remain, bootstrap and layouts |
| [history-and-debt.md](history-and-debt.md) | Origin story and known technical debt (cards, styles, dual templates) |
| [rest-api.md](rest-api.md) | Internal `wppic/v1|v2` routes and public custom-plugin REST |
| [github-cards.md](github-cards.md) | Why GitHub cards belong here; spin-off assessment |

## Root Markdown drafts

Files such as `badges-documentation.md`, `badges-shortcode.md`, `badge-flex-layout.md`, `shortcode.md`, and `changelog.md` at the repo root are **feature drafts or branch notes**. They are not the canonical architecture guide. Prefer this `docs/` set for orientation; treat root drafts as historical or work-in-progress for specific features.
