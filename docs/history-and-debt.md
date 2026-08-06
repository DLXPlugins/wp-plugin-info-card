# History and technical debt

Context for the next developer. This is not a full changelog (see WordPress.org [`readme.txt`](../readme.txt) and root `changelog.md` drafts). It explains why the codebase looks the way it does and what hurts when you change it.

## Brief history

WP Plugin Info Card started as a **shortcode-driven card plugin** with a distinctive visual system from Brice Capobianco / [b-website](https://www.b-website.com/): flip cards, numbered color schemes, Open Sans, and fixed card chrome.

Under MediaRon / DLX the product grew into a multi-source card suite:

- Gutenberg blocks (dynamic, PHP-rendered)
- React admin settings tabs
- Easy Digital Downloads integration
- Custom (third-party) plugins with import/export and site-to-site REST sync
- GitHub info cards
- Profile badges and plugin screenshots cards

Newer features brought their own SCSS, lazy-load JS, and admin React apps. They sit **beside** the original card system rather than replacing it. That layering is the main source of debt below.

## Known technical debt

Frame these as constraints, not a rewrite mandate. Prefer incremental fixes that keep shortcode and block paths working.

### Inflexible classic cards and styles

[`src/scss/wppic-style.scss`](../src/scss/wppic-style.scss) is a large monolithic stylesheet (thousands of lines) for the classic card family: flip front/back, scheme classes (`.wp-pic.schemeN`), fixed-ish widths, and long-lived visual assumptions.

Restyling or making layouts more flexible is high-regression work. Scheme overrides and flip behavior are intertwined with markup in PHP templates. Newer features (GitHub CSS variables, badges, screenshots/carousel) live in separate SCSS files and do not remodel the classic stack.

**Practical rule:** treat a classic card visual change as a three-way update — SCSS + PHP `templates/` + React `src/blocks/templates/`.

### Dual templates (easy drift)

| Production | Editor preview |
|------------|----------------|
| `templates/wppic-template-*.php` | `src/blocks/templates/*.js` |

Markup and conditionals (icons, requires, ratings, etc.) are duplicated. The editor can show a different card than the frontend if only one side is updated. See the dual-template rule in [`CONTRIBUTING.md`](../CONTRIBUTING.md).

### God file: `Shortcodes.php`

[`php/Shortcodes.php`](../php/Shortcodes.php) is very large. It holds:

- Shortcode registration and rendering
- Much of the internal REST API
- Orchestration for queries, screenshots, badges
- Large inlined HTML for features such as GitHub cards

High change risk: unrelated features share one file. Prefer extracting focused classes when touching a feature heavily (especially GitHub — see [`github-cards.md`](github-cards.md)).

### TinyMCE lag

The Classic Editor / TinyMCE UI exposes a thinner layout set (historically card / large / wordpress) than the block UI (which also includes flex and ratings). Classic users do not get full parity with block layouts unless TinyMCE is updated intentionally.

### Mixed asset pipelines

- Modern: `@wordpress/scripts` + webpack → `build/` and `dist/`
- Release: Grunt zip with `composer install --no-dev`
- Legacy frontend: jQuery flip/AJAX in `assets/js/wppic-script.js` alongside newer lazy-load scripts

You need both webpack knowledge and awareness of Grunt’s Composer step for safe releases.

### Orphan admin React views

`src/react/views/screenshots/` and `src/react/views/advanced/` contain `createRoot` entry-style code but are not listed as webpack entries in [`webpack.config.js`](../webpack.config.js). Treat them as unused or unfinished until wired up or removed.

### Back-compat shims

Examples still in the tree:

- Badge attribute rename (`medal` → `badge`) in helpers
- Legacy EDD-related flags in import/export for older data

Do not remove shims without checking stored content and imported JSON.

## Modernizing cards safely

If you invest in more flexible card styles:

1. Decide whether you are evolving the classic layouts or introducing a new layout name.
2. Update PHP templates, React editor templates, and SCSS together.
3. Keep shortcode attribute names stable for page-builder content.
4. Avoid a React-only frontend renderer unless you also replace every shortcode consumer.

## Related docs

- [`architecture.md`](architecture.md) — how the dual stack works today
- [`github-cards.md`](github-cards.md) — coupling and extraction notes
- [`rest-api.md`](rest-api.md) — REST surfaces living partly in `Shortcodes.php`
