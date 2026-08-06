# AGENTS.md — WP Plugin Info Card

Orientation for Cursor and other AI agents working in this repo.

## What this is

WordPress plugin that renders plugin/theme (and related) **info cards**. Production card HTML is **PHP**. React powers the **block editor** and **admin settings UIs**, not the frontend card markup.

User-facing shortcode/block docs live at [docs.dlxplugins.com](https://docs.dlxplugins.com/product/wp-plugin-info-card/). In-repo docs under [`docs/`](docs/README.md) are for developers and agents.

## Bootstrap

Entry: [`wp-plugin-info-card.php`](wp-plugin-info-card.php).

On `plugins_loaded`, the singleton boots (among others):

- `Blocks`, `Shortcodes`, `GitHub`, `Add_Plugin`, `Add_Theme`
- `Import_Export` (custom-plugin REST)
- `TinyMCE\Init`, `Admin`, `Admin\Init` (when `is_admin()`)
- `EDD` when Easy Digital Downloads is present

Hooks: `pre_wppic_loaded` / `wppic_loaded`.

PHP namespace: `MediaRon\WPPIC` (PSR-4 under [`php/`](php/)).

## Canonical render path

Blocks are dynamic (`save() { return null }`). PHP `render_callback`s in [`php/Blocks.php`](php/Blocks.php) call into [`php/Shortcodes.php`](php/Shortcodes.php). Shortcodes are the **shared frontend renderer**.

When changing frontend card HTML or behavior, prefer `Shortcodes` + [`templates/`](templates/), then keep React editor previews in sync (`src/blocks/templates/`).

Do **not** treat shortcodes as deprecated. They remain for classic themes and page builders (Elementor, Divi, Beaver Builder). See [`docs/architecture.md`](docs/architecture.md).

## Source vs build

| Edit | Output |
|------|--------|
| `src/` (JS, React, SCSS) | `build/` (blocks), `dist/` (admin apps, styles, lazy-load scripts) |
| `php/`, `templates/`, `functions.php` | Served directly |

Never hand-edit `build/` or `dist/`.

Webpack: [`webpack.config.js`](webpack.config.js) — blocks via `@wordpress/scripts`; separate entries for admin React and frontend CSS/JS.

## Data funnel

Asset data goes through `wppic_api_parser()` in [`functions.php`](functions.php), with parsers hooked via `wppic_add_api_parser` (plugins, themes, GitHub). Results are cached as transients + options.

## Coding standards

- WordPress PHP and JS coding standards.
- Put periods after code comments.
- After PHP edits, run VS Code PHP Code Beautifier / PHPCBF as used in this project.
- PHPCS: [`phpcs.xml.dist`](phpcs.xml.dist). PHPStan: `composer phpstan`.

## Release caution

Production zips use Grunt (`grunt`), which runs `composer install --no-dev` before packaging. Shipping `lib/` with PHPStan autoload breaks the frontend. See [`Gruntfile.js`](Gruntfile.js). Prefer `npm run build` then `grunt` over `npm run zip` alone for release artifacts.

## Do not

- Invent a second production HTML path that bypasses shortcodes/templates without a clear migration plan.
- Spin GitHub cards into a separate plugin casually — read [`docs/github-cards.md`](docs/github-cards.md) first.
- Change classic card styles in SCSS only; PHP templates and React previews must stay aligned.

## Deeper docs

| Doc | Topic |
|-----|--------|
| [`docs/README.md`](docs/README.md) | Index |
| [`docs/architecture.md`](docs/architecture.md) | React vs PHP, shortcodes vs blocks |
| [`docs/history-and-debt.md`](docs/history-and-debt.md) | History and technical debt |
| [`docs/rest-api.md`](docs/rest-api.md) | Internal REST + custom-plugin API |
| [`docs/github-cards.md`](docs/github-cards.md) | GitHub feature and spin-off assessment |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Setup, build, PR expectations |
