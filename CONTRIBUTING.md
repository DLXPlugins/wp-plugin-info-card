# Contributing to WP Plugin Info Card

Thanks for helping maintain WP Plugin Info Card. User-facing docs live at [docs.dlxplugins.com](https://docs.dlxplugins.com/product/wp-plugin-info-card/). This guide covers local development and how to contribute code.

For architecture and debt context, start at [`docs/README.md`](docs/README.md). Agents should also read [`AGENTS.md`](AGENTS.md).

## Prerequisites

- A local WordPress install with this repo under `wp-content/plugins/wp-plugin-info-card`
- Node.js matching [`.nvmrc`](.nvmrc) (currently 22.21.1) — use `nvm use`
- Composer
- Familiarity with WordPress PHP and modern block editor JS

## Setup

```bash
nvm use
npm i --legacy-peer-deps
composer install
```

## Development loop

| Command | Purpose |
|---------|---------|
| `npm run start` (or `npm run dev`) | Watch build for development |
| `npm run build` | Production assets |

Webpack ([`webpack.config.js`](webpack.config.js)) produces two output trees:

| Output | Contents |
|--------|----------|
| `build/` | Gutenberg blocks (`wppic-blocks.js`), block metadata, `blocks-manifest.php` |
| `dist/` | Admin React apps, frontend styles, lazy-load scripts |

Edit sources under `src/`, `php/`, and `templates/`. Do not hand-edit `build/` or `dist/`.

## Where to contribute

| Area | Path |
|------|------|
| Block editor UI | `src/blocks/` |
| Shared block components / editor templates | `src/blocks/components/`, `src/blocks/templates/` |
| Admin React tabs | `src/react/views/` |
| Frontend SCSS / lazy JS | `src/scss/`, `src/js/` |
| PHP logic, REST, shortcodes | `php/` |
| Production card markup | `templates/` |
| Caching / API parser | `functions.php` |

### Dual-template rule

Production cards are PHP templates under `templates/`. The block editor uses React mirrors in `src/blocks/templates/`.

If you change a PHP card layout, update the matching React preview in the same PR so the editor does not drift from the frontend.

## PHP quality

```bash
composer phpstan
```

PHPCS rules live in [`phpcs.xml.dist`](phpcs.xml.dist) (WordPress-Core / Docs / Extra). Follow WordPress PHP coding standards. Put periods after code comments. After PHP edits, run PHP Code Beautifier (PHPCBF) as configured in your editor.

## Release / zip

For a WordPress.org-ready zip:

1. `npm run build`
2. `grunt` (runs `composer install --no-dev`, zips, then restores full Composer deps)

`grunt` matters: shipping `lib/` with PHPStan autoload loaded on every request breaks the frontend. See comments in [`Gruntfile.js`](Gruntfile.js).

`npm run zip` packages files listed in `package.json` but does not perform the Composer `--no-dev` dance. Prefer `grunt` for release artifacts.

## Pull requests

- Use [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).
- Keep changes focused; match existing naming (`MediaRon\WPPIC`, `wppic_*` hooks/options, `wp-plugin-info-card/*` blocks).
- Shortcodes are intentional (page-builder / classic compatibility), not a temporary shim — see [`docs/architecture.md`](docs/architecture.md).
- Do not move user docs into this repo unless you are also updating WordPress.org [`readme.txt`](readme.txt). Product docs stay on DLX.

## Sponsorship

If you use the plugin but are not contributing code, consider [sponsoring on GitHub](https://github.com/sponsors/MediaRon).
