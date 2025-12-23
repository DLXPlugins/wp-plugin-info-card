# Profile Badges Shortcode Implementation Plan

## Overview
Implementing a shared helper function approach for Profile Badges rendering that supports both block and shortcode usage. Starting with a "hello world" implementation that includes all wrapper attributes and structure.

## Architecture: Option 1 - Shared Helper Function

### Core Concept
- **Shared Helper**: `Shortcodes::render_profile_badges()` - Single source of truth for rendering
- **Block Render**: Calls the shared helper with block attributes
- **Shortcode**: Parses shortcode attributes, normalizes them, then calls the shared helper
- **Shortcode Name**: `wp-pic-badges`
- **Shortcode Attributes**: lowercase separated by underscores. Use built-in lower in `php/Functions.php`.
- **Badge Display Logic**: Will use the CSS classes to differentiate between different badges.

### Benefits
- DRY principle - no code duplication
- Consistent output between block and shortcode
- Easier maintenance - one place to update rendering logic
- Block and shortcode stay in sync automatically

---

## Affected Files

### Primary Files (Will Be Modified)
1. **`php/Shortcodes.php`**
   - Add `render_profile_badges()` helper function
   - Add `shortcode_profile_badges()` shortcode handler
   - Register shortcode in `run()` method

2. **`php/Blocks.php`**
   - Update `profile_badges_render()` to call shared helper
   - Remove inline rendering logic

### Future Files (Phase 2 - Not in Initial Implementation)
3. **`php/Functions.php`** (or new file)
   - Badge data array/helper (mirroring JS badges structure)
   - Badge validation functions
   - WordPress.org API integration for dynamic badges

---

## Implementation Plan

### Phase 1: Hello World with Full Wrapper Structure

#### Step 1: Create Shared Helper Function in Shortcodes.php

**Location**: `php/Shortcodes.php`

**Function Signature**:
```php
/**
 * Render profile badges (shared helper for block and shortcode).
 *
 * @param array $args {
 *     Array of arguments.
 *
 *     @type string  $uniqueId      Unique identifier for the wrapper.
 *     @type string  $anchor        Anchor ID (overrides uniqueId if set).
 *     @type string  $align         Alignment: left|center|right.
 *     @type string  $type          Badge type: static|dynamic.
 *     @type string  $authorSlug    WordPress.org author slug (for dynamic).
 *     @type int     $baseSize      Base font size in pixels.
 *     @type array   $badges        Array of badge class names (for static).
 *     @type string  $lastUpdated   Last update timestamp (for dynamic).
 *     @type int     $colGap        Column gap in pixels.
 *     @type int     $rowGap        Row gap in pixels.
 *     @type int     $cols          Number of columns.
 *     @type string  $layout        Layout: horizontal|centered.
 *     @type bool    $hideHeading   Whether to hide badge headings.
 *     @type string  $headingColor  Heading text color.
 * }
 * @return string Rendered HTML.
 */
public static function render_profile_badges( $args = array() )
```

**Initial Implementation** (Hello World):
- Accept and normalize all arguments
- Build wrapper classes array
- Generate CSS variables/styles
- Output wrapper structure with "Hello World" placeholder
- Return complete HTML string

#### Step 2: Update Block Render Function

**Location**: `php/Blocks.php` - `profile_badges_render()` method

**Changes**:
- Remove inline rendering logic (lines 778-787)
- Call `Shortcodes::render_profile_badges( $block_attributes )`
- Return the result directly

**Code Pattern**:
```php
public function profile_badges_render( $attributes, $content, $block ) {
    if ( is_admin() || defined( 'REST_REQUEST' ) ) {
        return;
    }

    // Gather attributes from context (existing code).
    $block_attributes = array();
    // ... existing attribute gathering ...

    // Call shared helper.
    return Shortcodes::render_profile_badges( $block_attributes );
}
```

#### Step 3: Create Shortcode Handler

**Location**: `php/Shortcodes.php`

**Shortcode Name**: `wp-pic-badges`

**Function**: `shortcode_badges()`

**Attribute Parsing**:
- Use `wp_parse_args()` with defaults matching block.json defaults
- Parse `badges` attribute (comma-separated string → array)
- Handle `type="dynamic"` vs `type="static"`
- Convert string booleans to actual booleans
- Convert string numbers to integers

**Default Attributes**:
```php
array(
    'unique_id'     => '',      // Generated if empty.
    'anchor'        => '',
    'align'         => 'center',
    'type'          => 'static',
    'author_slug'   => '',
    'base_size'     => 16,
    'badges'        => '',      // Comma-separated string.
    'last_updated'  => '',
    'col_gap'       => 20,
    'row_gap'       => 20,
    'cols'          => 2,
    'layout'        => 'horizontal',
    'hide_heading'  => false,
    'heading_color' => '#000000',
)
```

**Attribute Normalization**:
- Convert shortcode attribute names (snake_case) to block attribute names (camelCase)
- Parse `badges` from comma-separated string to array
- Generate `uniqueId` if not provided
- Sanitize all inputs

#### Step 4: Register Shortcode

**Location**: `php/Shortcodes.php` - `run()` method

**Add**:
```php
add_shortcode( 'wp-pic-badges', array( static::class, 'shortcode_badges' ) );
```

---

## Shortcode Usage Examples

### Static Badges (Comma-Separated)
```
[wp-pic-badges badges="badge-code,badge-plugins,badge-design has-overlay" cols="3" layout="horizontal"]
```

### Dynamic Badges (WordPress.org API)
```
[wp-pic-badges type="dynamic" author_slug="ronaldhuereca" cols="2"]
```

### Full Example with All Attributes
```
[wp-pic-badges 
    badges="badge-code,badge-plugins,badge-design-contributor"
    cols="3"
    col_gap="30"
    row_gap="20"
    layout="centered"
    base_size="18"
    heading_color="#333333"
    hide_heading="false"
    align="center"
]
```

---

## Attribute Mapping

### Shortcode → Block Attribute Names
| Shortcode Attribute | Block Attribute | Type | Default |
|---------------------|----------------|------|---------|
| `unique_id` | `uniqueId` | string | Generated | [ not needed for block output at this time ]
| `anchor` | `anchor` | string | '' | [ optional ]
| `align` | `align` | string | 'center' |
| `type` | `type` | string | 'static' |
| `author_slug` | `authorSlug` | string | '' |
| `base_size` | `baseSize` | int | 16 |
| `badges` | `badges` | array | [] |
| `last_updated` | `lastUpdated` | string | '' |
| `col_gap` | `colGap` | int | 20 |
| `row_gap` | `rowGap` | int | 20 |
| `cols` | `cols` | int | 2 |
| `layout` | `layout` | string | 'horizontal' |
| `hide_heading` | `hideHeading` | bool | false |
| `heading_color` | `headingColor` | string | '#000000' |

---

## Wrapper Structure (Hello World Output)

### HTML Structure
```html
<div class="wppic-badges-grid is-grid align{align} layout-{layout} cols-{cols} {has-no-title}" id="{uniqueId}">
    <style>
        #{uniqueId}.wppic-badges-grid {
            --wppic-grid-row-gap: {rowGap}px;
            --wppic-grid-col-gap: {colGap}px;
            --wppic-base-size: {baseSize}px;
            --wppic-heading-color: {headingColor};
        }
    </style>
    <div class="wppic-badges-grid">
        <!-- Hello World placeholder -->
        <div>Hello World - Profile Badges</div>
    </div>
</div>
```

### CSS Classes Applied
- `wppic-badges-grid` - Base class
- `is-grid` - Grid layout indicator
- `align{center|left|right}` - Alignment class
- `layout-{horizontal|centered}` - Layout class
- `cols-{1|2|3}` - Column count class
- `has-no-title` - Applied when `hideHeading` is true

### CSS Variables Set
- `--wppic-grid-row-gap` - Row spacing
- `--wppic-grid-col-gap` - Column spacing
- `--wppic-base-size` - Base font size
- `--wppic-heading-color` - Heading text color

---

## Implementation Checklist

### Phase 1: Hello World (Current Goal)
- [ ] Create `render_profile_badges()` helper in `Shortcodes.php`
  - [ ] Accept and normalize all arguments
  - [ ] Build wrapper classes
  - [ ] Generate CSS variables
  - [ ] Output wrapper HTML with "Hello World" placeholder
- [ ] Update `profile_badges_render()` in `Blocks.php`
  - [ ] Remove inline rendering
  - [ ] Call shared helper
- [ ] Create `shortcode_badges()` in `Shortcodes.php`
  - [ ] Parse shortcode attributes
  - [ ] Normalize attribute names
  - [ ] Convert badges string to array
  - [ ] Call shared helper
- [ ] Register shortcode in `Shortcodes::run()`
- [ ] Test block rendering (should show "Hello World")
- [ ] Test shortcode rendering (should show "Hello World")

### Phase 2: Badge Data & Rendering (Future)
- [ ] Create badge data structure in PHP (mirror JS badges)
- [ ] Implement badge lookup function
- [ ] Render actual badge HTML in helper
- [ ] Handle dynamic badge fetching (WordPress.org API)
- [ ] Handle lazy loading, and secure data fetching, similar to the GitHub Cards loading techniques.
- [ ] Add badge validation
- [ ] Handle icon types (dashicons vs images)

### Phase 3: Polish (Future)
- [ ] Add error handling
- [ ] Add caching for dynamic badges
- [ ] Add filters/hooks for customization
- [ ] Add documentation
- [ ] Add unit tests

---

## Testing Plan

### Block Testing
1. Add Profile Badges block to a post/page
2. Configure attributes in block editor
3. Verify "Hello World" appears with correct wrapper structure
4. Inspect HTML to verify classes and CSS variables

### Shortcode Testing
1. Add shortcode to post: `[wp-pic-badges]`
2. Test with minimal attributes
3. Test with all attributes
4. Test badges attribute parsing: `badges="badge-code,badge-plugins"`
5. Verify wrapper structure matches block output

### Validation Testing
- Verify CSS variables are set correctly
- Verify wrapper classes are applied
- Verify unique ID generation
- Verify attribute sanitization

---

## Notes & Considerations

### Badge Data Structure (Future)
The JS badges array contains:
- `id` - Badge identifier
- `class` - CSS class name
- `iconType` - 'dashicon' or 'image'
- `icon` - Dashicon class or image URL
- `label` - Display label
- `source` - 'wporg' or 'custom'

This will need to be replicated in PHP for Phase 2.

### Dynamic Badges (Future)
For `type="dynamic"`, will need to:
1. Fetch profile data from WordPress.org API
2. Parse member badges from API response
3. Map to badge class names
4. Cache results (similar to plugin/theme caching)
5. This functionality should already exist in `php/Functions.php`.

### Attribute Naming Convention
- **Shortcode**: Uses snake_case (WordPress convention)
- **Block**: Uses camelCase (JavaScript/React convention)
- **Helper**: Accepts camelCase (matches block attributes)
- **Normalization**: Convert snake_case → camelCase in shortcode handler

---

## File Structure Summary

```
php/
├── Blocks.php                    # Block render → calls helper
└── Shortcodes.php                # Helper function + shortcode handler
    ├── render_profile_badges()   # Shared rendering logic
    └── shortcode_profile_badges() # Shortcode handler
```

---

## Next Steps After Phase 1

Once "Hello World" is working with full wrapper structure:
1. Implement badge data lookup
2. Render actual badge HTML
3. Add dynamic badge fetching
4. Add validation and error handling
5. Add caching layer

---

## Badge Implementation Progress

### Badges Added to PHP (59 total - COMPLETE!)

**First 10 badges:**
1. badge-code
2. badge-code-committer
3. badge-design
4. badge-design-contributor
5. badge-plugins
6. badge-themes
7. badge-organizer
8. badge-speaker
9. badge-meta-contributor
10. badge-translation-contributor

**Next 10 badges:**
11. badge-translation-editor
12. badge-marketing
13. badge-marketing-contributor
14. badge-support-contributor
15. badge-community-contributor
16. badge-plugins-reviewer
17. badge-themes-reviewer
18. badge-wordpress-tv-contributor
19. badge-wordcamp-volunteer
20. badge-documentation

**Next 20 badges:**
21. badge-documentation-contributor
22. badge-accessibility-contributor
23. badge-accessibility
24. badge-mobile
25. badge-training
26. badge-training-contributor
27. badge-media-corps-team
28. badge-media-corps-contributor
29. badge-wp-cli
30. badge-wp-cli-contributor
31. badge-hosting
32. badge-hosting-contributor
33. badge-tide
34. badge-tide-contributor
35. badge-security-team
36. badge-security-contributor
37. badge-bbpress
38. badge-bbpress-contributor
39. badge-test
40. badge-test-contributor

**Next 5 badges:**
41. badge-patterns-team
42. badge-pattern-author
43. badge-photos-team
44. badge-photo-contributor
45. badge-sustainability-team

**Next 5 badges:**
46. badge-sustainability-contributor
47. badge-playground
48. badge-playground-contributor
49. badge-core-ai-team
50. badge-core-ai-contributor

**Next 5 badges:**
51. badge-buddypress
52. badge-buddypress-contributor
53. badge-openverse
54. badge-openverse-contributor
55. badge-performance-team

**Final 4 badges:**
56. badge-performance-contributor
57. badge-credits-graduate
58. badge-credits-mentor
59. badge-campus-connect-participant

### ✅ All Badges Complete!
All 59 badges from the JS file have been successfully added to PHP.

---

## Questions to Resolve Later

1. Should we create a separate `Badges.php` class for badge data/utilities?
2. How should we handle badge icon URLs (relative vs absolute)?
3. Should we support custom badges in shortcode?
4. What caching strategy for dynamic badges? (transients, similar to plugins/themes)
5. Should shortcode support JSON badges array? `badges='["badge-code","badge-plugins"]'`

