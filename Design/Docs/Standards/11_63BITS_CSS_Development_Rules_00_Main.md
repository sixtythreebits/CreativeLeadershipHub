# CSS Development Rules

This document defines the 63BITS standards for project CSS in ASP.NET Core MVC projects: which stylesheet files exist, how pages load them, how `style.css` is organised, how design values are stored as tokens, how classes are named, and how CSS is formatted. The rules apply to **website pages** in full. **Admin pages** use the boilerplate admin theme; for them only the [Admin CSS Standards](#admin-css-standards) and the file, loading and hook rules apply.

*Candidate to move to the code standards repo.*

These rules complement **10 JavaScript Development Rules**: the `js-` hook classes defined there are never styled. If a rule here seems to contradict the code standards repo, the code standards repo wins.

<br>

## Table of Contents

- [Glossary](#glossary)
- [File Standards](#file-standards)
  - [Stylesheet Location Rule (R11-01)](#stylesheet-location-rule-r11-01)
  - [Include Path Case Rule (R11-02)](#include-path-case-rule-r11-02)
  - [File Versioning Rule (R11-03)](#file-versioning-rule-r11-03)
  - [Stylesheet Load Order Rule (R11-04)](#stylesheet-load-order-rule-r11-04)
  - [Plugin CSS Rule (R11-05)](#plugin-css-rule-r11-05)
  - [Font Face Rule (R11-06)](#font-face-rule-r11-06)
  - [Bootstrap Theming Rule (R11-07)](#bootstrap-theming-rule-r11-07)
- [Structure Standards](#structure-standards)
  - [Section Rule (R11-08)](#section-rule-r11-08)
  - [Block Comment Rule (R11-09)](#block-comment-rule-r11-09)
  - [Component Placement Rule (R11-10)](#component-placement-rule-r11-10)
  - [Page Scope Rule (R11-11)](#page-scope-rule-r11-11)
- [Token Standards](#token-standards)
  - [Design Token Rule (R11-12)](#design-token-rule-r11-12)
  - [Token Naming Rule (R11-13)](#token-naming-rule-r11-13)
  - [RGB Pair Rule (R11-14)](#rgb-pair-rule-r11-14)
  - [Responsive Token Rule (R11-15)](#responsive-token-rule-r11-15)
- [Component Standards](#component-standards)
  - [Component Custom Property Rule (R11-16)](#component-custom-property-rule-r11-16)
  - [Modifier Class Rule (R11-17)](#modifier-class-rule-r11-17)
  - [Size Scale Rule (R11-18)](#size-scale-rule-r11-18)
  - [Icon Size Rule (R11-19)](#icon-size-rule-r11-19)
- [Naming Standards](#naming-standards)
  - [Class Naming Rule (R11-20)](#class-naming-rule-r11-20)
  - [Class Prefix Rule (R11-21)](#class-prefix-rule-r11-21)
  - [Descendant Selector Rule (R11-22)](#descendant-selector-rule-r11-22)
  - [State Class Rule (R11-23)](#state-class-rule-r11-23)
  - [No Hook or ID Selector Rule (R11-24)](#no-hook-or-id-selector-rule-r11-24)
- [Inline Style Standards](#inline-style-standards)
  - [Inline Style Rule (R11-25)](#inline-style-rule-r11-25)
  - [Style Block Rule (R11-26)](#style-block-rule-r11-26)
- [Responsive Standards](#responsive-standards)
  - [Breakpoint Rule (R11-27)](#breakpoint-rule-r11-27)
  - [Media Query Placement Rule (R11-28)](#media-query-placement-rule-r11-28)
  - [Fluid Size Rule (R11-29)](#fluid-size-rule-r11-29)
- [Value Standards](#value-standards)
  - [Font Size Unit Rule (R11-30)](#font-size-unit-rule-r11-30)
  - [Transition Rule (R11-31)](#transition-rule-r11-31)
  - [Image Path Rule (R11-32)](#image-path-rule-r11-32)
  - [Important Rule (R11-33)](#important-rule-r11-33)
- [Formatting Standards](#formatting-standards)
  - [Brace and Declaration Rule (R11-34)](#brace-and-declaration-rule-r11-34)
  - [Indentation Rule (R11-35)](#indentation-rule-r11-35)
  - [Nesting Rule (R11-36)](#nesting-rule-r11-36)
  - [No Dead CSS Rule (R11-37)](#no-dead-css-rule-r11-37)
- [Admin CSS Standards](#admin-css-standards)
  - [Admin Theme Rule (R11-38)](#admin-theme-rule-r11-38)
  - [Admin Feature Stylesheet Rule (R11-39)](#admin-feature-stylesheet-rule-r11-39)
- [Sources](#sources)

<br>

## Glossary

- **Project CSS:** the stylesheets written for the project, `css/website/style.css` and `css/website/fonts.css`. Plugin and Bootstrap CSS are not project CSS.
- **Token:** a CSS custom property that holds a design value (a colour, size or spacing), e.g. `--bs-primary`, `--fs-h1`, `--app-header-height`.
- **Component:** a reusable piece of UI with its own block in section 4 of `style.css`, e.g. `.btn`, `.nav-item`, `.card`.
- **Page scope:** the `.page-<name>` class on a page's `main.app-page`, used to limit rules to one page.
- **Hook class:** a class starting with `js-` that exists only for JavaScript (10 JavaScript Development Rules).

<br>

## File Standards

This section defines which stylesheets exist, where they live and how a page loads them.

<br>

### Stylesheet Location Rule (R11-01)

Website project CSS **must** live in exactly two files:

```
SixtyThreeBits.Web/wwwroot/css/website/style.css    (all rules and tokens)
SixtyThreeBits.Web/wwwroot/css/website/fonts.css    (only @font-face rules)
```

Do not create per-page, per-component or `tokens.css` files on the website side. Page rules go in section 5 of `style.css` ([Page Scope Rule](#page-scope-rule-r11-11)); tokens go in `:root` at the top of `style.css` ([Design Token Rule](#design-token-rule-r11-12)).

```
// Wrong
css/website/tokens.css
css/website/checkout.css
css/website/components/product-card.css

// Correct
css/website/style.css
css/website/fonts.css
```

<br>

### Include Path Case Rule (R11-02)

The `href` of a stylesheet link **must** match the folder and file names on disk **exactly, including case**. Windows ignores case, but Linux hosts return 404. Always start the path with `/css/` or `/plugins/`, not `~/`.

```cshtml
@* Wrong — the file is css/admin/sortableTree.css *@
<link href="/css/admin/SortableTree.css" rel="stylesheet" asp-append-version="true" />

@* Correct *@
<link href="/css/admin/sortableTree.css" rel="stylesheet" asp-append-version="true" />
```

<br>

### File Versioning Rule (R11-03)

Every link to a project stylesheet (`/css/...`) **must** have `asp-append-version="true"`, the same as project scripts (**10 JavaScript Development Rules, File Versioning Rule**). ASP.NET adds a hash of the file's content to the address (`?v=...`), so the browser keeps the file until a deploy changes it. Without it, a returning visitor can get new markup styled by old CSS.

```cshtml
@* Wrong — after a deploy the browser can keep the old file *@
<link href="/css/website/style.css" rel="stylesheet" />

@* Wrong — a new address on every request, the file is never cached *@
<link href="/css/website/style.css?v=@Guid.NewGuid()" rel="stylesheet" />

@* Correct *@
<link href="/css/website/style.css" rel="stylesheet" asp-append-version="true" />
```

The project **must** tell browsers to keep versioned files for a year. It is set once in `Program.cs`, and only for requests that carry the `v` hash, so an unversioned file is never stuck in a cache:

```csharp
// Correct: Program.cs
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context =>
    {
        if (context.Context.Request.Query.ContainsKey("v"))
        {
            context.Context.Response.Headers.CacheControl = "public,max-age=31536000,immutable";
        }
    }
});
```

This also passes the PageSpeed / Lighthouse check *"Serve static assets with an efficient cache policy"* for project files.

<br>

### Stylesheet Load Order Rule (R11-04)

Stylesheets **must** load in this order, so project CSS overrides Bootstrap and plugins, and page CSS comes last:

1. Bootstrap and plugin CSS — through `PluginsClientHeaderPartial` ([Plugin CSS Rule](#plugin-css-rule-r11-05))
2. `/css/website/fonts.css`
3. `/css/website/style.css`
4. Page-only CSS — inside `@section HeaderSection { ... }`

```cshtml
@* Website _Layout.cshtml <head> *@
@await Html.PartialAsync(ViewNamesShared63.PluginsClientHeaderPartial, Model.PluginsClient)
<link href="/css/website/fonts.css" rel="stylesheet" asp-append-version="true" />
<link href="/css/website/style.css" rel="stylesheet" asp-append-version="true" />

@RenderSection(ViewSections63.HeaderSection, false)
```

A view with `Layout = null` (auth pages, not-found page) keeps the same order in its own `<head>`.

<br>

### Plugin CSS Rule (R11-05)

Plugin CSS (Bootstrap, Swiper, Tom Select, Fancybox, …) **must** be enabled from the controller through `Model.LayoutViewModel.PluginsClient.EnableX(true)`, exactly like plugin scripts (10 JavaScript Development Rules, Plugin Loading Rule). Never add a plugin `<link>` directly in a view, and never copy plugin CSS into `style.css`. To change how a plugin looks, override it in `style.css`, in that plugin's component block.

```cshtml
@* Wrong *@
@section HeaderSection {
    <link href="/plugins/swiper/swiper-bundle.min.css" rel="stylesheet" />
}
```

```csharp
// Correct — in the controller action
Model.LayoutViewModel.PluginsClient.EnableSwiper(true);
```

<br>

### Font Face Rule (R11-06)

`fonts.css` holds only `@font-face` rules: one per family and weight, `woff2` first with `woff` as fallback, and `font-display: swap;` in every rule. Font files live in `/fonts/<family>/`. Start each family with a `/* Family Name */` comment.

```css
/* Mark Geo */
@font-face {
    font-family: 'Mark Geo';
    src: url('/fonts/markgeo/light.woff2') format('woff2'),
    url('/fonts/markgeo/light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
```

The family is used through a token, never repeated in rules: `--font-family: 'Mark Geo', sans-serif;` and `--bs-font-sans-serif: var(--font-family);`.

<br>

### Bootstrap Theming Rule (R11-07)

Bootstrap is used as the **compiled** CSS file from `plugins/bootstrap/`. It is themed by overriding its `--bs-*` custom properties in `:root`, and per component by setting `--bs-<component>-*` inside the component rule. Do not use Sass, rebuild Bootstrap, or edit files in `plugins/bootstrap/`.

```css
/* Wrong — overrides the result, not the variable */
.btn-primary{
    background-color: #57449A;
}

/* Correct */
:root{
    --bs-primary-rgb: 87,68,154;
    --bs-primary: #57449A;
}

.badge{
    --bs-badge-padding-x: .5rem;
    --bs-badge-font-size: 12px;
}
```

<br>

## Structure Standards

This section defines how `style.css` is organised.

<br>

### Section Rule (R11-08)

`style.css` **must** start with a table of contents, then the `:root` tokens, then five numbered sections in this order:

```css
/* ==================== 
1. resets & defaults
2. base styles
3. layout
4. components
5. content by pages
==================== */


:root{
    ...
}


/* ==================== 1. resets & defaults ==================== */
/* ==================== 2. base styles ==================== */
/* ==================== 3. layout ==================== */
/* ==================== 4. components ==================== */
/* ==================== 5. content by pages ==================== */
```

| Section | Holds |
|---|---|
| 1. resets & defaults | element resets, `a`, `img`, `button`, `.disabled` helpers |
| 2. base styles | fonts, headings, container, row, icon and size helpers |
| 3. layout | `.app`, `.app-header`, `.app-footer`, `.app-bottom-bar`, `.app-page`, `.page-with-aside` |
| 4. components | reusable components: buttons, forms, cards, badges, modals, sliders, plugin overrides |
| 5. content by pages | rules for one page only, scoped with `.page-<name>` |

<br>

### Block Comment Rule (R11-09)

Every block inside a section **must** be opened with `/* ----------- name ----------- */` and closed with `/* ----------- /name ----------- */`. A sub-block inside a block uses `/* --- name --- */` and has no closing marker. Block names are lowercase words.

```css
/* ----------- header ----------- */
.app-header{
    ...
}

/* --- search --- */
.app-header .search{
    ...
}
/* ----------- /header ----------- */
```

<br>

### Component Placement Rule (R11-10)

A new component **must** get its own block in section 4. Before adding one, search `style.css` for an existing component or modifier that already does the job, and extend it instead. Plugin overrides are components too: one block per plugin (`/* ----------- swiper ----------- */`).

<br>

### Page Scope Rule (R11-11)

Rules that apply to one page only go in section 5, in a block named after the page. **Every** selector in the block starts with `.page-<name>`, the class on that page's `main.app-page`.

```css
/* Wrong — in section 5 but not scoped, so it changes every page */
.btn-filters{
    ...
}

/* Correct */
/* ----------- products ----------- */
.page-products .btn-filters{
    ...
}
.page-products .filters-card .card-title{
    ...
}
/* ----------- /products ----------- */
```

When a second page needs the same rule, move it to a component in section 4.

<br>

## Token Standards

This section defines how design values are stored and used.

<br>

### Design Token Rule (R11-12)

Colours, font sizes, element sizes, container widths and layout spacing **must** be custom properties. Global values go in `:root` at the top of `style.css`; values that belong to one component go at the top of that component's rule ([Component Custom Property Rule](#component-custom-property-rule-r11-16)). Every other rule uses `var(--…)`. A literal colour (`#…`, `rgb(…)`) is written **only** in a custom property declaration.

```css
/* Wrong */
.product-card .price{
    color: #57449A;
    font-size: 1.125rem;
}

/* Correct */
.product-card .price{
    color: var(--bs-primary);
    font-size: var(--fs-text2);
}
```

<br>

### Token Naming Rule (R11-13)

Bootstrap tokens keep the `--bs-*` name. Custom tokens are kebab-case, without a project prefix, and grouped by family:

| Family | Example |
|---|---|
| `--app-*` | `--app-header-height`, `--app-content-px` |
| `--fs-*` | `--fs-h1` … `--fs-h6`, `--fs-text1` … `--fs-text6` |
| `--element-size-N` | `--element-size-1` … `--element-size-6` |
| `--container-size-N` | `--container-size-1` … `--container-size-5` |
| `--form-control-*` | `--form-control-height`, `--form-control-active-border-color` |
| `--btn-<variant>-*` | `--btn-primary`, `--btn-primary-hover`, `--btn-primary-active`, `--btn-primary-disabled-bg` |

Spacing tokens end with `-px` / `-py` (horizontal / vertical padding). State tokens use `-hover`, `-active`, `-disabled`. Group families with a blank line between them in `:root`.

<br>

### RGB Pair Rule (R11-14)

Every colour used with transparency **must** have a paired `-rgb` token with comma-separated channels, declared next to it. Transparency is written as `rgba(var(--x-rgb), alpha)`.

```css
/* Wrong */
--form-control-active-border-color: rgba(87,68,154,.7);

/* Correct */
:root{
    --bs-primary-rgb: 87,68,154;
    --bs-primary: #57449A;

    --form-control-active-border-color: rgba(var(--bs-primary-rgb),.7);
}
```

<br>

### Responsive Token Rule (R11-15)

When a layout value changes at a breakpoint, redefine the token in `:root` inside a media query, directly below the main `:root` block. Do not override each rule that uses it.

```css
/* Wrong */
@media (min-width: 992px) {
    .app-header{ height: 92px; }
    .app-page{ padding-top: 92px; }
}

/* Correct */
@media (min-width: 992px) {
    :root{
        --app-header-height: 92px;
        --app-bottom-bar-height: 0rem;
    }
}
```

<br>

## Component Standards

This section defines how a component rule is written.

<br>

### Component Custom Property Rule (R11-16)

A component rule **must** declare its own custom properties first, named `--<component>-*`, then a blank line, then the properties that use them. Changing the component later means changing the custom property, not the declarations.

```css
.nav-item{
    --nav-item-px: 0.75rem;
    --nav-item-py: 0.75rem;
    --nav-item-gap: 0.75rem;
    --nav-item-bg: transparent;
    --nav-item-hover-bg: var(--bs-light-bg-subtle);

    display: flex;
    align-items: center;
    gap: var(--nav-item-gap);
    padding: var(--nav-item-py) var(--nav-item-px);
    background-color: var(--nav-item-bg);
}
.nav-item:hover{
    --nav-item-bg: var(--nav-item-hover-bg);
}
```

<br>

### Modifier Class Rule (R11-17)

A size or variant modifier class **only** reassigns the component's custom properties. It does not repeat declarations.

```css
/* Wrong */
.btn-sm{
    min-height: 2rem;
    padding: 0 .75rem;
}

/* Correct */
.btn-sm{
    --btn-size: var(--element-size-2);
    --bs-btn-padding-x: .75rem;
    --icon-size: 1rem;
}
```

<br>

### Size Scale Rule (R11-18)

Size modifiers use the suffixes `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, or numeric steps `1…N` when they map to numbered tokens (`.size-1` … `.size-5` → `--element-size-N`). Do not invent other suffixes (`-small`, `-big`, `-2x`).

<br>

### Icon Size Rule (R11-19)

Icon sizes **must** use the seven classes `.i-xxs`, `.i-xs`, `.i-sm`, `.i-md`, `.i-lg`, `.i-xl`, `.i-xxl`. Each one only sets `--icon-size`. A component that sizes its own icons sets `--icon-size` (or `--<component>-icon-size`) instead of a `width`.

```css
.i-xxs{ --icon-size: 0.875rem; }
.i-xs{ --icon-size: 1rem; }
.i-sm{ --icon-size: 1.25rem; }
.i-md{ --icon-size: 1.5rem; }
.i-lg{ --icon-size: 1.75rem; }
.i-xl{ --icon-size: 2rem; }
.i-xxl{ --icon-size: 2.25rem; }
```

<br>

## Naming Standards

This section defines how classes are named and selected.

<br>

### Class Naming Rule (R11-20)

Class names **must** be kebab-case: lowercase words joined with `-`. Do not use BEM `__` / `--`, camelCase or underscores. The existing helpers `active__i-fill`, `active__i-stroke`, `bg-img--contain` and `bg-img--cover` are the only exceptions; do not add new ones.

```css
/* Wrong */
.productCard{ }
.product-card__title{ }
.product_card{ }

/* Correct */
.product-card{ }
.product-card .card-title{ }
```

<br>

### Class Prefix Rule (R11-21)

| Prefix | Used for | Example |
|---|---|---|
| `app-` | layout pieces that appear on every page | `.app-header`, `.app-footer`, `.app-bottom-bar`, `.app-page` |
| `page-` | page scopes | `.page-products`, `.page-auth`, `.page-with-aside` |
| `i-` | icon helpers | `.i-md`, `.i-toggle`, `.i-accordion-toggle` |
| `btn-` | button variants and sizes | `.btn-white`, `.btn-primary-subtle`, `.btn-sm` |
| `js-` | JavaScript hooks — **never styled** | `.js-main-slider` |

<br>

### Descendant Selector Rule (R11-22)

Children of a component or page are styled with descendant selectors from the component or page class, using short, reusable child classes. Do not give every child a long unique class.

```css
/* Wrong */
.page-auth-head-card-logo{ }

/* Correct */
.page-auth .head-card .logo{ }
.app-header .header-btn{ }
```

Keep selectors to at most four parts. Do not chain element names (`div ul li a`).

<br>

### State Class Rule (R11-23)

State **must** be expressed with one of these classes, toggled by JavaScript or Bootstrap:

| Class | Meaning | Example |
|---|---|---|
| `.active` / `.show` | Bootstrap states | `.page-products .btn-filters.active .i-chevron` |
| `.is-*` | the element is in a state | `.btn.is-loading`, `.btn-cart.is-active` |
| `.has-*` | the element contains something | `.has-error .form-control` |
| `.<component>-is-open` | a component is open, set on a parent | `.app-search-is-open`, `.accordion-is-open` |

Never style a state through a `js-` class or an inline style.

<br>

### No Hook or ID Selector Rule (R11-24)

CSS **must not** select `js-` hook classes or IDs. An element that is both styled and used by JavaScript carries two classes side by side.

```css
/* Wrong */
.js-main-slider{ height: 400px; }
#mainSlider{ height: 400px; }

/* Correct */
.main-slider{ height: 400px; }
```

```html
<div class="swiper main-slider js-main-slider">
```

<br>

## Inline Style Standards

<br>

### Inline Style Rule (R11-25)

An inline `style` attribute is allowed **only** to pass a per-instance value that comes from data: a CSS custom property (an image URL, a colour), or a `width` that shows a percentage (progress bars). Every other style goes in `style.css`.

```cshtml
@* Wrong *@
<div class="category-card" style="background-image: url('@item.ImageUrl'); border-radius: 12px;">
<div style="display:none">

@* Correct *@
<div class="category-card" style="--category-img-url: url('@item.ImageUrl')">
<div class="progress-bar" style="width: @(item.Percent)%">
<div class="d-none js-details-wrap">
```

To hide or show an element, use a class (`d-none`, `.show`, `.is-*`), never `style="display:none"`.

<br>

### Style Block Rule (R11-26)

A `<style>` block in a view is allowed **only** on a page without the site header or bottom bar (auth pages), and only to reset `:root` layout tokens. Nothing else goes in a `<style>` block.

```cshtml
<style>
    :root{
        --app-header-height: 0px;
        --app-bottom-bar-height: 0px;
    }
</style>
```

<br>

## Responsive Standards

<br>

### Breakpoint Rule (R11-27)

Media queries **must** use Bootstrap's breakpoints. `min-width` uses the breakpoint; `max-width` uses the breakpoint minus 1, so the two never overlap.

| Breakpoint | `min-width` | `max-width` |
|---|---|---|
| sm | 576px | 575px |
| md | 768px | 767px |
| lg | 992px | 991px |
| xl | 1200px | 1199px |
| xxl | 1400px | 1399px |

```css
/* Wrong — overlaps with min-width: 992px at exactly 992px */
@media (max-width: 992px) { ... }
@media (max-width: 1039px) { ... }

/* Correct */
@media (max-width: 991px) { ... }
```

Prefer `min-width` (mobile first). Use `max-width` only for a rule that must not reach larger screens.

<br>

### Media Query Placement Rule (R11-28)

Media queries are written directly below the rule they change, **inside** the same `/* ----------- name ----------- */` block. Do not collect media queries at the end of the file or of a section.

```css
/* ----------- nav item card ----------- */
.nav-item-card{
    ...
}

@media (min-width: 768px) {
    .nav-item-card{
        ...
    }
}
/* ----------- /nav item card ----------- */
```

<br>

### Fluid Size Rule (R11-29)

`clamp()` is allowed for sizes that should scale smoothly between mobile and desktop, mainly large headings and hero spacing. Write it as `clamp(<min>rem, <preferred>, <max>rem)`, with the minimum and maximum in `rem`. Do not use bare `vw` font sizes.

```css
/* Wrong */
font-size: 4vw;

/* Correct */
font-size: clamp(1.5rem, 0.808rem + 1.923vw, 2rem);
```

<br>

## Value Standards

<br>

### Font Size Unit Rule (R11-30)

Font sizes come from `--fs-*` tokens. The type scale (headings and text from `16px` up) is in `rem`. Small UI text, `14px` and below, may be in `px`. The body base is `--bs-body-font-size: 14px`.

```css
/* Wrong */
--fs-h3: 24px;
.card-title{ font-size: 1.5rem; }

/* Correct */
:root{
    --fs-h3: 1.5rem;
    --fs-text3: 1rem;
    --fs-text4: 14px;
    --fs-text5: 12px;
}
.card-title{ font-size: var(--fs-h3); }
```

A component's own font size goes in its custom property (`--nav-item-fs: 0.875rem;`) and follows the same unit rule.

<br>

### Transition Rule (R11-31)

Transitions use `.15s ease-in-out`. List each property; do not use `transition: all`.

```css
/* Wrong */
transition: all .3s;

/* Correct */
transition: background-color .15s ease-in-out, color .15s ease-in-out;
```

<br>

### Image Path Rule (R11-32)

Images referenced from `style.css` use a path relative to the stylesheet: `../../images/...`. Per-instance images come from data through a custom property ([Inline Style Rule](#inline-style-rule-r11-25)), not from CSS.

```css
background-image: url('../../images/icons/chevron_lg.svg');
```

<br>

### Important Rule (R11-33)

`!important` is allowed only to beat plugin CSS or an inline style set by a plugin, and in the `.i-*` icon size helpers. Do not use it to win against the project's own rules; fix the selector or the order instead. Put a short comment next to every new `!important` that overrides a plugin.

```css
/* Wrong — fights our own .card rule */
.page-basket .card{ padding: 0 !important; }

/* Correct — Select2 sets the height inline */
.form-select-sm + .select2-container--bootstrap4 .select2-selection--single{
    height: 28px !important; /* select2 inline height */
}
```

<br>

## Formatting Standards

<br>

### Brace and Declaration Rule (R11-34)

Write the selector and `{` with **no space** between them: `selector{`. One declaration per line, each ending with `;`. One selector per line in a selector list. A helper with one declaration may be written on one line.

```css
/* Wrong */
.app-header { height: var(--app-header-height); padding: 0 var(--app-content-px) }

/* Correct */
.app-header{
    height: var(--app-header-height);
    padding: 0 var(--app-content-px);
}

a.is-active{ cursor: default; }
```

Media queries keep the space: `@media (min-width: 768px) {`.

<br>

### Indentation Rule (R11-35)

Indent with 4 spaces. Never tabs.

<br>

### Nesting Rule (R11-36)

Native CSS nesting is allowed only for a state or pseudo-element of the rule it sits in (`&.selected`, `&::before`, `&:hover`), one level deep. Write children as descendant selectors, not nested rules.

```css
/* Wrong */
.compare-table{
    .row{
        .cell{ ... }
    }
}

/* Correct */
.compare-table .cell{
    ...

    &::before{
        ...
    }
}
```

<br>

### No Dead CSS Rule (R11-37)

Committed CSS **must not** contain commented-out rules or tokens, or rules for markup that no longer exists. Delete them; git keeps the history. When a component is removed from the views, remove its block from `style.css` in the same change.

```css
/* Wrong */
/*--quinary-color: ;*/
/*--bs-secondary-rgb: 65,70,81;*/
```

<br>

## Admin CSS Standards

Admin pages are built on the admin theme shipped with the boilerplate (`plugins/theme-borex/`) and DevExtreme. They do not use the website `style.css`.

<br>

### Admin Theme Rule (R11-38)

Admin pages use the theme's classes and Bootstrap utilities. Project overrides go in **one** file, `css/admin/style.css`, loaded by the admin `_Layout.cshtml` after the plugin partial. Do not edit files in `plugins/theme-borex/` or the DevExtreme CSS.

The website rules on [Block Comment Rule](#block-comment-rule-r11-09), [Class Naming Rule](#class-naming-rule-r11-20), [No Hook or ID Selector Rule](#no-hook-or-id-selector-rule-r11-24), [Inline Style Rule](#inline-style-rule-r11-25) and all [Formatting Standards](#formatting-standards) apply to `css/admin/*.css` too.

<br>

### Admin Feature Stylesheet Rule (R11-39)

CSS for an admin feature that several views share (a sortable tree, the page text editor, tabs, the file manager) goes in its own file in `css/admin/`, named after the feature in camelCase. Views that need it include it inside `@section HeaderSection { ... }`; a view with `Layout = null` includes it last in its `<head>`.

```
wwwroot/css/admin/sortableTree.css
wwwroot/css/admin/pageText.css
```

```cshtml
@section HeaderSection {
    <link href="/css/admin/sortableTree.css" rel="stylesheet" asp-append-version="true" />
}
```

Do not create a stylesheet for a single admin view; put its few rules in `css/admin/style.css`.

<br>

## Sources

Rules are taken from the MusicHouse frontend developer's code: the static template `SixtyThreeBits.Web/html` (24 pages, `style.css` lines 1–8880; the Claude-written block at lines 8881–9268 is excluded) and its Razor version in `wwwroot`. The GebrunderWeiss and Peani CSS standards were derived from copies of the same template and agree with it. The admin CSS (`css/admin/*`) is the same in MusicHouse, Peani and the 63BITS boilerplate.

Where the code is mixed, the majority practice was taken (`selector{` 1,280 vs 172; 4 spaces vs tabs; `rem` scale with small `px` text). Small improvements on the practice: no new BEM helpers, `max-width` always the breakpoint minus 1, `!important` only against plugins, no commented-out CSS.

Full evidence with `file:line` references is kept in the framework repo under `evidences/docs-analysis/` (`05_musichouse_html_css.md`, `02_gaps.md` §2). Open questions for the lead developer are in `Questions_For_Mike.md`, in the framework repo.
