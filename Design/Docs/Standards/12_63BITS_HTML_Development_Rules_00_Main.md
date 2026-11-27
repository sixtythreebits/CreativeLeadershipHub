# HTML Development Rules

This document defines the 63BITS standards for website HTML: the static HTML template the frontend developer delivers (`SixtyThreeBits.Web/html/`) and the markup inside website Razor views built from it. It covers the page head, the page shell, headings, naming, buttons, images, forms, accessibility and formatting. A few rules apply **only to the static template** and are marked so. Admin pages use the boilerplate admin theme and are not covered here.

*Candidate to move to the code standards repo.*

These rules complement **10 JavaScript Development Rules** (hook classes, scripts), **11 CSS Development Rules** (classes, inline styles, stylesheet loading) and **13 Razor Views Development Rules** (layouts, forms, `Resources` text, encoding). If a rule here seems to contradict the code standards repo, the code standards repo wins.

<br>

## Table of Contents

- [Glossary](#glossary)
- [File Standards](#file-standards)
  - [Template Location Rule (R12-01)](#template-location-rule-r12-01)
  - [Component Catalogue Rule (R12-02)](#component-catalogue-rule-r12-02)
- [Document Standards](#document-standards)
  - [Head Rule (R12-03)](#head-rule-r12-03)
  - [Language Attribute Rule (R12-04)](#language-attribute-rule-r12-04)
  - [Page Title Rule (R12-05)](#page-title-rule-r12-05)
  - [Script Placement Rule (R12-06)](#script-placement-rule-r12-06)
- [Structure Standards](#structure-standards)
  - [Page Shell Rule (R12-07)](#page-shell-rule-r12-07)
  - [Modal Placement Rule (R12-08)](#modal-placement-rule-r12-08)
  - [Heading Rule (R12-09)](#heading-rule-r12-09)
- [Naming Standards](#naming-standards)
  - [Class Rule (R12-10)](#class-rule-r12-10)
  - [Hook Class Rule (R12-11)](#hook-class-rule-r12-11)
  - [ID Rule (R12-12)](#id-rule-r12-12)
  - [Data Attribute Rule (R12-13)](#data-attribute-rule-r12-13)
- [Element Standards](#element-standards)
  - [Button Type Rule (R12-14)](#button-type-rule-r12-14)
  - [Icon-Only Button Rule (R12-15)](#icon-only-button-rule-r12-15)
  - [Placeholder Link Rule (R12-16)](#placeholder-link-rule-r12-16)
  - [Table Rule (R12-17)](#table-rule-r12-17)
- [Image Standards](#image-standards)
  - [Icon Rule (R12-18)](#icon-rule-r12-18)
  - [Image Alt Rule (R12-19)](#image-alt-rule-r12-19)
  - [Image Loading Rule (R12-20)](#image-loading-rule-r12-20)
- [Form Standards](#form-standards)
  - [Form Element Rule (R12-21)](#form-element-rule-r12-21)
  - [Field Markup Rule (R12-22)](#field-markup-rule-r12-22)
  - [Checkbox and Radio Rule (R12-23)](#checkbox-and-radio-rule-r12-23)
- [Accessibility Standards](#accessibility-standards)
  - [ARIA Rule (R12-24)](#aria-rule-r12-24)
- [Inline Code Standards](#inline-code-standards)
  - [Inline Style Rule (R12-25)](#inline-style-rule-r12-25)
  - [No Inline Script Rule (R12-26)](#no-inline-script-rule-r12-26)
- [Formatting Standards](#formatting-standards)
  - [Indentation Rule (R12-27)](#indentation-rule-r12-27)
  - [Attribute Rule (R12-28)](#attribute-rule-r12-28)
  - [Void Element Rule (R12-29)](#void-element-rule-r12-29)
  - [Comment Rule (R12-30)](#comment-rule-r12-30)
  - [Design Variant Rule (R12-31)](#design-variant-rule-r12-31)
- [Sources](#sources)

<br>

## Glossary

- **Static template:** the HTML pages the frontend developer delivers in `SixtyThreeBits.Web/html/`, before the backend developer turns them into Razor views.
- **Page shell:** the fixed outer markup of every page: `div.app` with the header, `main.app-page` and the footer.
- **Hook class:** a class starting with `js-` that exists only for JavaScript (10 JavaScript Development Rules).
- **Icon-only button:** a button with an icon and no visible text, e.g. a close, favourite or menu button.
- **Design variant:** an alternative version of a block the designer drew (an empty state, a second layout), kept in the static template as commented-out markup.

<br>

## File Standards

This section defines where the static template lives and what it contains.

<br>

### Template Location Rule (R12-01)

The static template **must** live in `SixtyThreeBits.Web/html/`. All pages sit flat in that folder and are named in kebab-case after the page. Shared files go in subfolders: `css/`, `js/`, `images/`, `plugins/`.

```
// Wrong
Peani/html/index.html                    (outside SixtyThreeBits.Web)
SixtyThreeBits.Web/html/pages/Account_Orders.html

// Correct
SixtyThreeBits.Web/html/index.html
SixtyThreeBits.Web/html/account-orders.html
SixtyThreeBits.Web/html/images/icons/chevron_lg.svg
```

<br>

### Component Catalogue Rule (R12-02)

*Static template only.* The template **must** include `components.html`: one page that shows every shared component (buttons, form fields and their error state, badges, modals, cards) with its variants. The backend developer copies component markup from this page, not from a random page. Sample text such as lorem ipsum is allowed only in `components.html`.

<br>

## Document Standards

This section defines the `<head>` of every page and where scripts go.

<br>

### Head Rule (R12-03)

Every page **must** start with this head, in this order: lowercase doctype, `<html lang>`, `charset`, `viewport`, `<title>`, then the stylesheets in the order of **11 CSS Development Rules, Stylesheet Load Order Rule**.

```html
<!-- Wrong -->
<!DOCTYPE html>
<html>
<head>
	<title>Music House</title>
	<meta charset="utf-8" />

<!-- Correct -->
<!doctype html>
<html lang="ka">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Amboli - კალათა</title>
	<link href="css/fonts.css" rel="stylesheet" type="text/css" />
```

<br>

### Language Attribute Rule (R12-04)

`<html lang>` **must** name the language of the page text: `ka` for Georgian, `en` for English. In the static template, write the language of the sample text. In Razor, the layout writes it from the current culture, so every language version gets its own value.

```cshtml
@* Wrong — Georgian text, English lang *@
<html lang="en">

@* Wrong — no lang *@
<html>

@* Correct *@
<html lang="@System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName">
```

<br>

### Page Title Rule (R12-05)

Every page **must** have its own `<title>`: `<Site name> - <Page name>`. The home page uses the site name alone. In Razor, the title text comes from the page's data or `Resources` (13, Resources rule).

The meta description, canonical link and Open Graph tags are written by the Razor layout from page data. The static template does not need them.

```html
<!-- Wrong — the same title on every page -->
<title>Music House</title>

<!-- Correct -->
<title>Music House - კალათა</title>
```

<br>

### Script Placement Rule (R12-06)

All `<script>` tags **must** sit at the end of `<body>`, after the modals, in the order of **10 JavaScript Development Rules**: vendor scripts, plugins, `layout.js`, then the page script. No `<script>` goes in `<head>`.

<br>

## Structure Standards

This section defines the page shell, where modals go and how headings are used.

<br>

### Page Shell Rule (R12-07)

Every page **must** use this shell: `div.app` holds the `<header>`, one `main.app-page` and the `<footer>`. The `main` element carries the page scope class `page-<name>` (11, Page Scope Rule), plus layout modifiers such as `page-with-aside`. Auth and checkout funnel pages may leave out the header and footer.

In the static template, the header, footer and shared modals are copied into every page. In Razor, they come from the layout and partials (13).

```html
<!-- Correct -->
<body>
	<div class="app">
		<header>...</header>
		<main class="app-page container page-basket page-with-aside">
			...
		</main>
		<footer>...</footer>
	</div>
	<!-- =========== modals =========== -->
	<div class="modal fade" id="loginModal" tabindex="-1">...</div>
	<script src="plugins/jquery/jquery.min.js"></script>
</body>
```

<br>

### Modal Placement Rule (R12-08)

Modals, toasts and client templates **must** sit after `div.app`, behind the `<!-- =========== modals =========== -->` marker. A modal is `div.modal.fade` with `tabindex="-1"`. Never put a modal inside `main` or inside a component.

```html
<!-- Wrong -->
<main class="app-page">
	<div class="modal fade" id="addressModal">...</div>
</main>

<!-- Correct -->
</div>
<!-- =========== modals =========== -->
<div class="modal fade" id="addressModal" tabindex="-1">...</div>
```

<br>

### Heading Rule (R12-09)

A page **must** have exactly one `<h1>`: the page's main title. A page with steps or states (password recovery, success/error) has one `<h1>` per visible step. The heading level follows the structure of the page. The visual size comes from a class, never from picking another level.

```html
<!-- Wrong — an h1 used for its look, in the header cart and in cards -->
<h1 class="title title-xs">კალათა ცარიელია</h1>

<!-- Correct -->
<h1 class="title">კალათა</h1>
<h3 class="title title-xs">კალათა ცარიელია</h3>
```

<br>

## Naming Standards

This section defines class, hook, id and data attribute names.

<br>

### Class Rule (R12-10)

Classes **must** be Bootstrap classes or project classes named by **11 CSS Development Rules, Class Naming Rule** (kebab-case, no BEM). Do not add classes that nothing styles or uses.

<br>

### Hook Class Rule (R12-11)

Every element JavaScript uses **must** have a `js-` hook class, named by **10 JavaScript Development Rules** (JS Hook Class Rule, Hook Class Naming Rule, Button Hook Suffix Rule). A button hook ends with `-button`, not `-btn`. Hook classes are never styled.

```html
<!-- Wrong -->
<button type="button" class="icon-btn js-favorite-btn">...</button>

<!-- Correct -->
<button type="button" class="icon-btn js-favorite-button">...</button>
```

<br>

### ID Rule (R12-12)

An `id` is allowed only where HTML or Bootstrap needs one: to link a `<label for>` to its control, as a Bootstrap target (modal, collapse, tab), or as a page anchor. IDs are camelCase. JavaScript never selects by `id` (10, JS Hook Class Rule).

```html
<!-- Wrong -->
<input type="text" id="user-full-name" class="form-control" />
<div id="mainSlider" class="swiper">       <!-- only for JS -->

<!-- Correct -->
<input type="text" id="userFullName" class="form-control" />
<div class="swiper js-main-slider">
```

<br>

### Data Attribute Rule (R12-13)

Custom `data-*` attributes **must** be kebab-case and hold one value for one element (10, per-element values). Bootstrap attributes use the Bootstrap 5 form `data-bs-*`. The Bootstrap 4 forms (`data-toggle`, `data-dismiss`, `data-target`) stay only in legacy projects that still run Bootstrap 4.

```html
<!-- Wrong -->
<button type="button" data-toggle="modal" data-target="#loginModal" data-productId="5">

<!-- Correct -->
<button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" data-product-id="5">
```

<br>

## Element Standards

This section defines buttons, links and tables.

<br>

### Button Type Rule (R12-14)

Every `<button>` **must** have a `type`: `type="button"` for actions, `type="submit"` only for the button that submits its form. A button without a type inside the Razor `<form id="form">` submits the form.

```html
<!-- Wrong -->
<button class="btn btn-primary js-add-to-basket-button">დამატება</button>

<!-- Correct -->
<button type="button" class="btn btn-primary js-add-to-basket-button">დამატება</button>
```

<br>

### Icon-Only Button Rule (R12-15)

A button or link with only an icon **must** use the `.icon-btn` class and **must** have an `aria-label` that says what it does. Do not use `.btn-icon`.

```html
<!-- Wrong -->
<button type="button" class="btn-icon js-close-button">
	<img src="images/icons/close.svg" alt="close icon" />
</button>

<!-- Correct -->
<button type="button" class="icon-btn js-close-button" aria-label="დახურვა">
	<img src="images/icons/close.svg" alt="close icon" />
</button>
```

In Razor, the `aria-label` text comes from `Resources` like every other visible text (13).

<br>

### Placeholder Link Rule (R12-16)

In the static template, a link whose target is not known yet uses `href="#"`. In Razor, every link **must** have a real URL from the ViewModel. A clickable element that does not navigate is a `<button>`, not `<a href="#">`.

```cshtml
@* Wrong — in a Razor view *@
<a href="#" class="product-title">@item.ProductName</a>

@* Correct *@
<a href="@Html.Raw(item.UrlProduct)" class="product-title">@item.ProductName</a>
```

<br>

### Table Rule (R12-17)

A data table **must** be wrapped in `.table-responsive` and **must** have a `<thead>` with the column titles.

```html
<!-- Wrong -->
<table class="table">
	<tr><td>შეკვეთა</td><td>თარიღი</td></tr>

<!-- Correct -->
<div class="table-responsive">
	<table class="table">
		<thead>
			<tr><th>შეკვეთა</th><th>თარიღი</th></tr>
		</thead>
		<tbody>...</tbody>
	</table>
</div>
```

<br>

## Image Standards

This section defines icons, `alt` text and image loading.

<br>

### Icon Rule (R12-18)

Icons **must** be SVG files in `images/icons/`, shown with `<img>`. Name the file `<name>_<variant>.svg` (`chevron_lg.svg`, `arrow-left_round.svg`). When an icon must change colour on hover or when it's active, add `js-svg-icon`: the img-to-svg plugin turns it into inline SVG that CSS can colour. Size icons with the `.i-*` classes (11, Icon Size Rule).

Do not write inline `<svg>` by hand, and do not use icon fonts (Material Symbols, Font Awesome) unless the design itself is built on one.

```html
<!-- Wrong -->
<span class="material-symbols-rounded">favorite</span>
<svg viewBox="0 0 24 24"><path d="..." /></svg>

<!-- Correct -->
<img src="images/icons/heart.svg" class="i-md js-svg-icon" alt="heart icon" />
```

<br>

### Image Alt Rule (R12-19)

Every `<img>` **must** have an `alt`:

| Image | `alt` |
|---|---|
| Icon | `"<file name> icon"`, e.g. `alt="heart icon"` |
| Content image (product, blog, banner with meaning) | In Razor: the item's name from data. In the static template, `alt=""` is a placeholder. |
| Decorative image (background shape, divider) | `alt=""` |

```cshtml
@* Wrong — in a Razor view *@
<img src="@Html.Raw(item.UrlImage)" alt="" />

@* Correct *@
<img src="@Html.Raw(item.UrlImage)" alt="@item.ProductName" />
```

<br>

### Image Loading Rule (R12-20)

An image below the first screen **must** have `loading="lazy"`. An image in the first screen (hero, logo, first slide) must not have it.

A content image **must** sit in a fixed-ratio box (`.ratio` or `.img-wrap`), so the page doesn't jump while it loads. An image outside such a box **must** have `width` and `height`.

```html
<!-- Wrong -->
<img src="images/0/product-1.webp" alt="" />

<!-- Correct -->
<div class="ratio ratio-1x1">
	<img src="images/0/product-1.webp" alt="" loading="lazy" />
</div>
<img src="images/logos/logo.svg" width="120" height="32" alt="Amboli" />
```

<br>

## Form Standards

This section defines form markup. Razor-side form rules (one post-back form, `name="@nameof(...)"`, anti-forgery, `enctype`) are in **13 Razor Views Development Rules**.

<br>

### Form Element Rule (R12-21)

Fields that are posted together **must** be wrapped in a `<form>` in the static template too, so the Razor view keeps the same structure. A search or filter block that only drives JavaScript may stay without one.

<br>

### Field Markup Rule (R12-22)

A text field **must** use this markup: `.form-group` → `label.form-label[for]` → the control with a camelCase `id` → an empty `div.invalid-feedback`. The error state is `.has-error` on `.form-group`, set by the `validation` script (13, Error Container Rule; 11, State Class Rule). Error text is never written into the markup.

```html
<!-- Wrong -->
<div class="form-group">
	<label class="floating-label">
		<input type="text" class="form-control" placeholder="&nbsp;" />
		<span>სახელი</span>
	</label>
	<span class="help-block error-text">Error !!!</span>
</div>

<!-- Correct -->
<div class="form-group">
	<label for="userFullName" class="form-label">სახელი</label>
	<input type="text" id="userFullName" class="form-control" />
	<div class="invalid-feedback"></div>
</div>
```

<br>

### Checkbox and Radio Rule (R12-23)

A checkbox or radio **must** be wrapped in `label.form-check`, so the whole row is clickable. No `for`/`id` pair is needed.

```html
<!-- Wrong -->
<div class="form-check">
	<input type="checkbox" class="form-check-input" id="agree" />
	<label class="form-check-label" for="agree">ვეთანხმები</label>
</div>

<!-- Correct -->
<label class="form-check">
	<input type="checkbox" class="form-check-input" />
	<span class="form-check-label">ვეთანხმები</span>
</label>
```

<br>

## Accessibility Standards

<br>

### ARIA Rule (R12-24)

Use these ARIA attributes, and only where they add something:

- `aria-label` on every icon-only button and link ([Icon-Only Button Rule](#icon-only-button-rule-r12-15)).
- `aria-current="page"` on the last breadcrumb item and the active navigation item. Breadcrumbs are `nav > ol > li`.
- `aria-hidden="true"` on an inline SVG made by `js-svg-icon` that sits next to visible text.

Do not add `role` to native elements (`<button role="button">`, `<nav role="navigation">`). Do not write `aria-expanded` by hand on Bootstrap toggles: Bootstrap sets it.

<br>

## Inline Code Standards

<br>

### Inline Style Rule (R12-25)

Inline `style` attributes and `<style>` blocks follow **11 CSS Development Rules** (Inline Style Rule, Style Block Rule): a `style` attribute only passes a per-instance value (a CSS custom property, a progress `width`).

```html
<!-- Correct -->
<div class="category-item" style="--category-img-url: url('images/0/category-1.webp')">
```

<br>

### No Inline Script Rule (R12-26)

Markup **must not** contain `on…=` attributes (`onclick`, `onchange`) or inline `<script>` blocks with code. Behaviour goes in the page script, bound through hook classes (10). Client-side templates (`<script type="text/template7">`) are not code and may stay, after the modals.

```html
<!-- Wrong -->
<button type="button" onclick="addToBasket(5)">დამატება</button>

<!-- Correct -->
<button type="button" class="js-add-to-basket-button" data-product-id="5">დამატება</button>
```

<br>

## Formatting Standards

<br>

### Indentation Rule (R12-27)

Indent the static template (`html/`) with **tabs**, one tab per level. When you change a template file that has space-indented blocks, convert the blocks you touch to tabs. Do not reformat whole legacy files. Website Razor views follow the boilerplate: 4 spaces, never tabs.

<br>

### Attribute Rule (R12-28)

Attribute values use double quotes. `class` comes first, then `id`, `href`/`src`/`type`/`name`, then `data-*`, then `aria-*`. Single quotes are allowed only around a JSON value (`data-bs-popper-config='{"strategy":"fixed"}'`).

```html
<!-- Wrong -->
<a data-bs-toggle='dropdown' href="#" class="nav-link">

<!-- Correct -->
<a class="nav-link" href="#" data-bs-toggle="dropdown">
```

<br>

### Void Element Rule (R12-29)

Void elements are closed with ` />`: `<img … />`, `<input … />`, `<meta … />`, `<link … />`, `<br />`. This is the same as the Razor examples in 13.

<br>

### Comment Rule (R12-30)

Blocks after `div.app` are separated by section markers: `<!-- =========== modals =========== -->`. Do not add closing markers or comments that only repeat what the markup says.

<br>

### Design Variant Rule (R12-31)

*Static template only.* A design variant (an empty state, a second layout) **may** stay in the template as commented-out markup, directly after the block it replaces, written `<!--<tag …>…</tag>-->`. It shows the backend developer what to build.

In Razor views, commented-out markup **must not** stay. The view renders the variants with `if`/`else` from the ViewModel, or leaves them out.

```cshtml
@* Wrong — in a Razor view *@
<!--<div class="products-empty">...</div>-->

@* Correct *@
@if (Model.HasProducts)
{
	...
}
else
{
	<div class="products-empty">...</div>
}
```

<br>

## Sources

Rules are taken from the static templates of the 63BITS frontend developer: MusicHouse (24 pages, 37,293 lines; the original template) and Amboli (29 pages, 42,600 lines; an earlier, independent project by the same developer). Both show the same shell, modal placement, hook classes, icons, `alt` style, checkbox markup and tabs. Peani (13 pages, built with AI from the MusicHouse rules) was used only to see which improvements the user had already tried.

Where the code is mixed or breaks its own docs, these small improvements on the practice were taken: `type` on every button (22 of 1,213 in MusicHouse), one `<h1>` per page, `lang` set to the page language (MusicHouse `en` and Amboli none, both with Georgian text), `aria-label` on icon-only buttons (the MusicHouse doc's own rule), a unique `<title>`, `loading="lazy"`, `<thead>` in tables, and `<form>` around posted fields. Hook suffixes, validation markup, inline styles and loading order follow the earlier standards 10, 11 and 13.

Full evidence with `file:line` references is kept in the framework repo under `evidences/html/`.
