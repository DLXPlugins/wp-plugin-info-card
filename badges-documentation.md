# Profile Badges - User Guide

## Welcome to Profile Badges

Profile Badges lets you showcase your WordPress.org contributions on your website! Display your badges from WordPress.org profiles in beautiful, customizable layouts using the block editor.

[image - Hero image showing a beautiful badge display with various WordPress.org badges arranged in a grid]

---

## What Are Profile Badges?

WordPress.org recognizes contributors with badges for their contributions to the WordPress project. These badges include:

- **Core Contributor** - For contributing to WordPress core
- **Plugin Developer** - For publishing plugins
- **Theme Developer** - For publishing themes
- **Design Contributor** - For design contributions
- **Translation Contributor** - For translation work
- **And many more!**

[image - Animated GIF showing various badge types with their labels appearing on hover]

---

## Getting Started

Profile Badges uses the WordPress block editor, providing a visual, drag-and-drop interface that makes it easy to add and customize your badges.

[image - Screenshot of the WordPress block editor with Profile Badges block highlighted]

---

## Using the Block Editor

### Step 1: Add the Profile Badges Block

1. In the WordPress block editor, click the **+** button to add a new block
2. Search for "Profile Badges" or "Badges"
3. Click on **Profile Badges - Custom** to insert the block

[image - Animated GIF showing the block inserter with Profile Badges block being selected and inserted]

### Step 2: Choose Your Badge Type

You'll see two options in the block sidebar:

#### Option A: Static Badges (Manual Selection)

Select specific badges to display manually.

[image - Screenshot of block sidebar showing "Static" type selected with badge selection options]

#### Option B: Dynamic Badges (Automatic from WordPress.org)

Automatically fetch badges from any WordPress.org profile.

[image - Screenshot of block sidebar showing "Dynamic" type selected with author slug input field]

---

## Static Badges - Step by Step

### Selecting Your Badges

1. With the block selected, click the **Edit Badges** button in the toolbar
2. A modal will open showing all available badges
3. Click on badges to select/deselect them
4. Use **Select All** or **Select None** for quick selection
5. Click **Save** when done

[image - Animated GIF showing the badge selection modal opening, badges being clicked to select, and the selection being saved]

### Available Badges

The badge selector shows all available WordPress.org badges organized by category. Each badge includes:
- Badge icon/visual
- Badge name/label
- Description (on hover)

[image - Screenshot of the badge selection modal showing various badge categories and badges with tooltips]

---

## Dynamic Badges - Step by Step

### Setting Up Dynamic Badges

1. Select the Profile Badges block
2. In the sidebar, choose **Dynamic** as the type
3. Enter the WordPress.org **Author Slug** (username)
4. The badges will automatically load from that profile

[image - Animated GIF showing the type being changed to Dynamic, author slug being entered, and badges loading]

### How Dynamic Badges Work

- Badges are automatically fetched from WordPress.org
- Data is cached for 14 days for performance
- A loading skeleton appears while fetching
- Badges update automatically when cache expires

[image - Animated GIF showing the loading skeleton animation, then badges appearing]

### Finding Your Author Slug

Your author slug is your WordPress.org username. You can find it in your profile URL:
- Profile URL: `https://profiles.wordpress.org/your-username/`
- Author Slug: `your-username`

[image - Screenshot showing a WordPress.org profile URL with the author slug highlighted]

---

## Layout Options

Profile Badges offers two powerful layout systems: **Grid** and **Flex**.

### Grid Layout (Structured Columns)

Grid layout provides structured, column-based layouts perfect for organized displays.

**Features:**
- Fixed column count (1, 2, or 3 columns)
- Consistent spacing
- Perfect alignment
- Best for: Showcasing specific badges in an organized way

[image - Screenshot showing a 3-column grid layout with badges perfectly aligned]

**Setting Up Grid Layout:**

1. In the block sidebar, ensure **Display Layout** is set to **Grid**
2. Choose your column count (1, 2, or 3)
3. Adjust column and row gaps as needed

[image - Screenshot of block sidebar showing Grid layout selected with column selector visible]

### Flex Layout (Fluid Wrapping)

Flex layout provides fluid, responsive layouts that adapt to your container width.

**Features:**
- Badges wrap naturally based on available space
- Responsive to container width
- No fixed column count
- Best for: Responsive designs and varying content widths

[image - Animated GIF showing flex layout with badges wrapping as the container width changes]

**Setting Up Flex Layout:**

1. In the block sidebar, set **Display Layout** to **Flex**
2. Column controls are hidden (not needed for flex)
3. Adjust gap spacing for your desired look

[image - Screenshot of block sidebar showing Flex layout selected with column controls hidden]

### Grid vs Flex - Which Should I Use?

[image - Comparison table or side-by-side images showing Grid vs Flex layouts]

**Use Grid when:**
- You want a structured, organized look
- You need consistent column alignment
- You're displaying a specific number of badges

**Use Flex when:**
- You want responsive, fluid layouts
- Your container width varies
- You want badges to wrap naturally

---

## Customization Options

### Badge Item Layout

Control how each badge item is displayed:

- **Horizontal** - Badge icon and title side by side
- **Centered** - Badge icon centered above the title

[image - Side-by-side comparison showing horizontal vs centered badge layouts]

### Alignment

Control the overall alignment of your badge grid:

- **Left** - Align badges to the left
- **Center** - Center badges (default)
- **Right** - Align badges to the right

[image - Three examples showing left, center, and right alignment]

### Spacing Controls

Fine-tune the spacing between badges:

- **Column Gap** - Horizontal spacing between badges (default: 20px)
- **Row Gap** - Vertical spacing between badge rows (default: 20px)

[image - Animated GIF showing column gap and row gap being adjusted with visual feedback]

### Styling Options

**Base Font Size:**
- Control the overall size of badges (default: 16px)
- Larger values = bigger badges

[image - Animated GIF showing base size slider being adjusted with badges resizing]

**Heading Color:**
- Customize the color of badge titles
- Use hex color codes (e.g., #1e73be)

[image - Screenshot showing color picker with heading color being selected]

**Hide Heading:**
- Toggle to hide badge titles for a cleaner, icon-only display
- Tooltips appear on hover when headings are hidden

[image - Animated GIF showing hide heading toggle with tooltips appearing on hover]

---

## Common Use Cases

### Showcase Your Contributions

Display your WordPress.org badges on your personal website or portfolio.

[image - Example of badges displayed on a personal website]

**Steps:**
1. Add Profile Badges block
2. Choose Dynamic type
3. Enter your WordPress.org username
4. Customize layout and styling

### Highlight Team Members

Show badges for team members or contributors.

[image - Example showing multiple badge displays for different team members]

**Steps:**
1. Add Profile Badges block
2. Choose Static type
3. Select relevant badges
4. Use Grid layout with 2-3 columns

### Minimal Badge Display

Create a clean, icon-only badge display.

[image - Example showing badges without headings, just icons]

**Steps:**
1. Add Profile Badges block
2. Select your badges
3. Toggle "Hide Heading" on
4. Adjust spacing for tight layout

### Responsive Badge Gallery

Use flex layout for badges that adapt to any screen size.

[image - Animated GIF showing flex layout adapting from desktop to tablet to mobile]

**Steps:**
1. Add Profile Badges block
2. Set Display Layout to Flex
3. Adjust gap spacing
4. Badges will wrap naturally on all devices

---

## Tips and Best Practices

### Badge Selection Tips

- **Quality over Quantity**: Select badges that are most relevant to showcase
- **Group Related Badges**: Display related badges together (e.g., all design-related badges)
- **Use Modifiers**: Some badges include `has-overlay` modifier for special styling

[image - Example showing well-organized badge selection vs cluttered selection]

### Layout Tips

**Grid Layout:**
- Use 1 column for narrow spaces or single-column layouts
- Use 2-3 columns for wider areas
- Adjust gaps to match your site's spacing

**Flex Layout:**
- Perfect for responsive designs
- Badges wrap naturally on mobile devices
- Adjust gap for consistent spacing

[image - Responsive examples showing grid and flex on different screen sizes]

### Performance Tips

- **Static Badges**: Load instantly (no API calls)
- **Dynamic Badges**: Use caching (14 days) for optimal performance
- **Multiple Instances**: You can use multiple badge blocks on the same page

[image - Performance comparison showing static vs dynamic loading times]

### Accessibility

Profile Badges includes built-in accessibility features:
- ARIA labels for screen readers
- Semantic HTML structure
- Keyboard navigation support
- Tooltips when headings are hidden

[image - Screenshot showing accessibility features being tested with screen reader]

---

## Troubleshooting

### Badges Not Displaying

**Problem:** Badges don't appear on the frontend.

**Solutions:**
1. Check that badge names are spelled correctly
2. For dynamic badges, verify the author slug is correct
3. Clear your site cache
4. Check browser console for JavaScript errors

[image - Screenshot showing browser console with common errors highlighted]

### Layout Issues

**Problem:** Badges aren't aligning correctly.

**Solutions:**
1. Check column count (1, 2, or 3 for grid layout)
2. Verify container has sufficient width
3. Check for CSS conflicts with your theme
4. Try switching between grid and flex layouts

[image - Before/after comparison showing layout issues and fixes]

### Dynamic Badges Not Loading

**Problem:** Dynamic badges show loading skeleton but never load.

**Solutions:**
1. Verify the author slug exists on WordPress.org
2. Check network connectivity
3. Wait for cache to expire (14 days) or clear cache
4. Check WordPress REST API is accessible

[image - Screenshot showing loading skeleton and troubleshooting steps]

---

## Advanced Customization

### Custom CSS

You can add custom CSS to further style your badges:

```css
.wppic-badges-grid {
    /* Your custom styles */
}
```

[image - Example showing custom CSS being applied with before/after results]

### Using with Page Builders

Profile Badges works with popular page builders:
- Gutenberg (native)
- Elementor
- Beaver Builder
- Divi

[image - Screenshot showing badges in different page builders]

### Integration Examples

[image - Examples showing badges integrated into different website sections: sidebar, footer, about page, etc.]

---

## Frequently Asked Questions

### Can I display badges from multiple profiles?

Yes! You can add multiple Profile Badges blocks, each with a different author slug.

[image - Example showing multiple badge displays on one page]

### How often do dynamic badges update?

Dynamic badges are cached for 14 days. After that, they automatically refresh.

### Can I customize badge colors?

Badge icons use their original WordPress.org colors. You can customize heading colors and overall sizing.

[image - Example showing heading color customization]

### Do badges work on mobile?

Yes! Both grid and flex layouts are fully responsive and work great on mobile devices.

[image - Mobile view showing badges displayed correctly]

### Can I use badges in widgets?

Yes! You can add the Profile Badges block to widget areas that support blocks, or use the shortcode in text widgets. See the [Shortcode Documentation](badges-shortcode.md) for shortcode usage.

[image - Screenshot showing badges in a sidebar widget]

---

## Need Help?

- **Support**: Visit [Support Center](https://dlxplugins.com/support/) for assistance
- **Technical Documentation**: See [Shortcode Documentation](badges-shortcode.md) for advanced shortcode usage
- **Feature Requests**: Submit ideas on [GitHub](https://github.com/dlxplugins/wp-plugin-info-card)

[image - Support resources with links and contact information]

---

## Examples Gallery

### Example 1: Portfolio Badge Showcase

[image - Full example showing badges on a portfolio website]

### Example 2: Team Page

[image - Example showing badges for multiple team members]

### Example 3: About Page

[image - Example showing badges integrated into an about page]

### Example 4: Minimal Design

[image - Example showing minimal, icon-only badge display]

---

## What's Next?

Now that you know how to use Profile Badges, try:

1. **Experiment with Layouts**: Try both grid and flex to see which works best
2. **Customize Styling**: Adjust colors, spacing, and sizing to match your site
3. **Combine with Other Blocks**: Use badges alongside other content blocks
4. **Share Your Creations**: Show off your badge displays!

[image - Call-to-action image encouraging users to get started]

---

*Last updated: [Date]*

