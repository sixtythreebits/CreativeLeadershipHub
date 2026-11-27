# home-v1 audit against 63BITS front-end standards

Scope: `html/home-v1.html`, `html/css/website/home-v1.css`, `html/css/website/clh-fonts.css`, `html/js/home-v1.js` (paths below are relative to `Design/`). Rules: R12 (HTML), R11 (CSS), R10 (JS). Audit date: 2026-11-27. No files were changed.

## 1. Summary

| Document | Fail | Pass | N/A / at Razor |
|---|---|---|---|
| 12 HTML (R12-01…31) | 17 | 8 | 6 |
| 11 CSS (R11-01…39) | 26 | 8 | 5 |
| 10 JS (R10-01…46) | 6 | 16 | 24 |
| **Total** | **49** | | |

Top 5 fixes:
1. **Use the shared shell and components** (R12-07, R12-02, R11-10, R11-21): wrap the page in `div.app` with `main.app-page.page-home`. Reuse the `.app-header`, `.app-footer`, `.btn` and `.social-links` markup from `components.html` and `style.css` instead of the new `.site-header`, `.site-footer`, `.btn` redefinition and `.social`.
2. **Fold the CSS into the two allowed files** (R11-01, R11-08, R11-09, R11-11): move `home-v1.css` into section 5 of `style.css` under `.page-home` (shared parts go to sections 3 and 4), and move `clh-fonts.css` into `fonts.css` as woff2/woff (R11-06).
3. **Tokens** (R11-12, R11-13, R11-14, R11-30): drop the `--clh-*` prefix and use the standard families (`--bs-primary`, `--app-header-height`, `--fs-h1…`, `--font-family`). Add `-rgb` pairs for every `rgba()`, and stop writing literal colours and font sizes in rules.
4. **JS hooks** (R10-21, R10-23, R10-24, R12-11, R11-24): select only by `js-` hooks (no `#mainNav`, no `.reveal`), rename the button hooks to `-button`, use jQuery instead of `classList`/`getElementById`, and stop styling `.js-reveal`.
5. **Script structure** (R10-10, R10-13, R10-08, R12-06): rename `homeModel` to `model` and call each `init` from the ready block. Move the header logic to `layoutModel` and include `layout.js` before the page script.

## 2. Findings table

### 12 HTML Development Rules

| Rule ID | Rule name | Status | Count | Locations | What to change |
|---|---|---|---|---|---|
| R12-01 | Template Location | Fail | 1 | `Design/html/` | Move to `SixtyThreeBits.Web/html/` (planned). See open question Q1 on the `-v1` name. |
| R12-02 | Component Catalogue | Fail | 5 | home-v1.html:28 `header.site-header`, :219 `footer.site-footer`, :74 `btn-accent`/:96 `btn-ghost`, :249 `ul.social`, :177 `voices-btn` | `components.html` already has `header.app-header` (:47), `footer.app-footer` (:2010), `.btn-primary`/`.btn-secondary` (:433+) and `.social-links` (:2025). Reuse or extend them. New variants must be added to `components.html`. |
| R12-03 | Head | Fail | 3 | home-v1.html:4 `charset="UTF-8">`, :18 preload before the stylesheets, :19–22 stylesheet order | Use `charset="utf-8" />`. Keep doctype, lang, charset, viewport, title, then the stylesheets in R11-04 order (Bootstrap and plugins, fonts.css, style.css). |
| R12-04 | Language Attribute | Pass | | | `lang="en"` matches the English text. |
| R12-05 | Page Title | Fail | 1 | home-v1.html:6 `CLH: Leadership programs and coaching…` | The home page uses the site name alone, e.g. `Creative Leadership Hub`. |
| R12-06 | Script Placement | Fail | 1 | home-v1.html:260–263 | Order is vendor, plugins, **layout.js**, page script. `layout.js` is missing. |
| R12-07 | Page Shell | Fail | 2 | home-v1.html:28–258 (no `div.app`), :80 `<main id="main">` | `div.app` holds `header`, `main.app-page.page-home` and `footer`. |
| R12-08 | Modal Placement | N/A | | | No modals. |
| R12-09 | Heading | Pass | | | One `h1` (:91). |
| R12-10 | Class | Fail | 1 | home-v1.html:189 `js-logo-grid` | No JS or CSS uses this class. Remove it. |
| R12-11 | Hook Class | Fail | 4 | :38 `#mainNav` used by JS; `.reveal` (×10, first :107, :121, :126) used by JS without a hook; css:233–234 styles `.js-reveal` | Add `js-` hooks (for example `js-main-nav`, `js-reveal`) and style a separate class. |
| R12-12 | ID | Fail | 7 | :82 `aria-labelledby="heroTitle"` plus 5 more `*Title` ids (:103, :119, :149, :186, :202); `mainNav` selected by JS (js:44, :55, :56) | Ids only for `label for`, Bootstrap targets and anchors, and JS never selects by id. See Q3 on `aria-labelledby`. |
| R12-13 | Data Attribute | Pass | | | |
| R12-14 | Button Type | Pass | | | All 7 buttons have `type`. |
| R12-15 | Icon-Only Button | Fail | 5 | :177, :179 `voices-btn`; :250–252 social links | Use `.icon-btn` and keep the `aria-label`. |
| R12-16 | Placeholder Link | Pass | | | |
| R12-17 | Table | N/A | | | |
| R12-18 | Icon | Fail | 3 groups | Hand-written `<svg>`: :84 hero arcs, :250–252 social (4). Text glyphs as icons `→`/`←`: :130, :136, :142, :177, :179, js:27 (6). Icon outside `images/icons/`: :128, :134, :140 `images/clh/icon-placeholder.svg` (3) | Use SVG files in `images/icons/<name>_<variant>.svg` with `<img>` (`arrow-left_round.svg`, `arrow-right_round.svg` and `facebook_*`/`instagram_*` already exist). Add `js-svg-icon` where colour changes on hover, and size with `.i-*`. |
| R12-19 | Image Alt | Fail | 3 | :128, :134, :140 `alt=""` on an icon | Icons use `alt="<file name> icon"`. |
| R12-20 | Image Loading | Fail | 4 | :128, :134, :140 (programs, below the fold); :223 footer logo | Add `loading="lazy"`. |
| R12-21 | Form Element | N/A | | | No forms. |
| R12-22 | Field Markup | N/A | | | |
| R12-23 | Checkbox and Radio | N/A | | | |
| R12-24 | ARIA | Fail | 5 | :34, :41, :49, :57, :65 `aria-expanded="false"` written by hand | Remove it. Bootstrap sets it. See Q3 for the other ARIA attributes. |
| R12-25 | Inline Style | Pass | | | |
| R12-26 | No Inline Script | Pass | | | |
| R12-27 | Indentation | Pass | | | Tabs. |
| R12-28 | Attribute | Fail | 1 | :82 `class="hero" aria-labelledby="heroTitle" data-enter` | `data-*` goes before `aria-*`. |
| R12-29 | Void Element | Fail | 32 | :4 `<meta charset="UTF-8">`, :17 `<link …>`, :32 `<img …>` | Close with ` />`. |
| R12-30 | Comment | Fail | 8 | :81 `<!-- 1 Hero -->`, :102, :118 (also :148, :185, :201, :218, and the design note at :25) | Remove comments that repeat the markup. The webinar comment at :115 adds information and can stay. |
| R12-31 | Design Variant | N/A | | | |

### 11 CSS Development Rules (css = home-v1.css, fonts = clh-fonts.css)

| Rule ID | Rule name | Status | Count | Locations | What to change |
|---|---|---|---|---|---|
| R11-01 | Stylesheet Location | Fail | 2 | `css/website/home-v1.css`, `css/website/clh-fonts.css` | Only `style.css` and `fonts.css` are allowed. See section 3. |
| R11-02 | Include Path Case | Pass | | | All paths match the files on disk. The leading `/css/` applies at Razor. |
| R11-03 | File Versioning | N/A | | | Applies at Razor. |
| R11-04 | Stylesheet Load Order | Fail | 1 | home-v1.html:19–22 (fonts before Bootstrap and Swiper) | Order: Bootstrap and plugins, `fonts.css`, `style.css`. |
| R11-05 | Plugin CSS | N/A | | | Applies at Razor. The template includes plugin CSS directly, as the old pages do. |
| R11-06 | Font Face | Fail | 4 | fonts:2–7 otf/ttf only; fonts:1 one header comment instead of `/* Family */` per family; `fonts/clh/` is not `/fonts/<family>/`; fonts:6–7 re-declare `Helvetica Neue LT GEO`, which `fonts.css` already declares from `fonts/2026/` | Use woff2 with a woff fallback, one comment per family and one folder per family. Do not declare a family twice. |
| R11-07 | Bootstrap Theming | Fail | 3 | css:51 `body{ background…; color… }` repeats `--bs-body-*`; css:82 `.nav-link{ color: … }` instead of `--bs-nav-link-color`; css:93 `.dropdown-menu{ border:0; background… }` instead of `--bs-dropdown-*` | Override the `--bs-*` variables, not the result. |
| R11-08 | Section Rule | Fail | 1 | css:1–14 own 11-part table of contents | Use the 5 numbered sections of `style.css`. |
| R11-09 | Block Comment | Fail | 12 | css:16 `/* 1. tokens & base */`, :63, :71 … :243 | Open each block with `/* ----------- name ----------- */` and close it with `/* ----------- /name ----------- */`. |
| R11-10 | Component Placement | Fail | 6 | css:53 `.container` (style.css:292 has one); css:64–69 `.btn`, `.btn-lg` redefined globally (style.css:1173 buttons); css:72 `.site-header` (style.css:431); css:208 `.site-footer` (style.css:908); css:217 `.social`; css:181–185 Swiper overrides outside a swiper block | Extend the existing component blocks. One block per plugin. |
| R11-11 | Page Scope | Fail | ~110 selectors | css:106 `.hero`, :121 `.stats`, :150 `.programs` (no `.page-home` anywhere) | Prefix page-only rules with `.page-home` in section 5. |
| R11-12 | Design Token | Fail | 2 groups | Literal colour outside a token: css:73, :108, :154 (+:179, :190, :191). Literal font sizes in rules: css:60 `.8125rem`, :82, :114 (+14 more) | Use `var(--…)`. Literal colours only in token declarations. |
| R11-13 | Token Naming | Fail | 11 | css:18–25 `--clh-*` (project prefix); :41 `--header-h`; :27–29 `--font-head/-sub/-body`; :39 `--text-muted`, :40 `--line`, :43 `--ease`; :45–47 `--fs-display`, `--fs-stat` | Use `--bs-primary` and similar, `--app-header-height`, `--font-family`, `--fs-h1…`/`--fs-text1…`. |
| R11-14 | RGB Pair | Fail | 10 | css:39 `rgba(255,246,243,.72)`, :40, :69 (+:73, :86, :108, :154, :179, :190, :191) | Declare `--x-rgb` next to the colour and use `rgba(var(--x-rgb), a)`. |
| R11-15 | Responsive Token | Fail | 2 | css:54 `.container` max-width in a media query; css:136 `.stat-num` font-size override | Redefine the token in `:root` inside the media query. |
| R11-16 | Component Custom Property | Fail | ~15 | css:72 `.site-header`, :153 `.program-row`, :181 `.voices-btn` | Declare `--<component>-*` first, then use them. |
| R11-17 | Modifier Class | Fail | 2 | css:67 `.btn-lg{ … min-height: 56px; }`, :88 `.btn-nav{ margin… }` | Modifiers only reassign custom properties. |
| R11-18 | Size Scale | Pass | | | |
| R11-19 | Icon Size | Fail | 2 | css:157 `.icon-box img{ width: 64px; height: 64px }`, :220 `.social svg{ width: 18px }` | Use `.i-*` or `--icon-size`. |
| R11-20 | Class Naming | Pass | | | |
| R11-21 | Class Prefix | Fail | 2 | `.site-header` (css:72), `.site-footer` (css:208) | Layout pieces use `app-` (`.app-header`, `.app-footer`). |
| R11-22 | Descendant Selector | Fail | 1 | css:178 `.quote-author span span` | Do not chain element names. Give the child a short class. |
| R11-23 | State Class | Fail | 2 | css:80–81 `[aria-expanded="true"]` as state; css:233–234 `.js-reveal .reveal.is-in` | Use `.is-*`, `.show` or `.<component>-is-open`, never a `js-` class. |
| R11-24 | No Hook or ID Selector | Fail | 3 | css:233, :234, :239 `.js-reveal` | Do not style `js-` classes. |
| R11-25 | Inline Style | Pass | | | |
| R11-26 | Style Block | Pass | | | |
| R11-27 | Breakpoint | Fail | 3 | css:90 `max-width: 1199.98px`, :116 and :205 `575.98px` | Use `1199px` and `575px`. |
| R11-28 | Media Query Placement | Fail | 3 | css:90–103 header queries grouped after 8 rules; css:236 reduced-motion query at file end, touching all blocks | Put each query directly below the rule it changes, inside its block. |
| R11-29 | Fluid Size | Fail | 10 | css:42 `clamp(80px, 9vw, 140px)`, :110, :112 (+:151, :171, :174 ×2, :188, :199, :208) | `clamp()` minimum and maximum must be in `rem`. |
| R11-30 | Font Size Unit | Fail | 2 | css:34 `--bs-body-font-size: 1.0625rem` (rule: 14px); font sizes not from `--fs-*` (see R11-12) | Body base 14px. Font sizes from `--fs-*` tokens. See Q5. |
| R11-31 | Transition | Fail | ~20 | css:56 `top .2s`, :64 `.2s var(--ease)`, :72 `.3s var(--ease)` | `.15s ease-in-out`. See Q4. |
| R11-32 | Image Path | N/A | | | No images in CSS. |
| R11-33 | Important | Fail | 5 | css:78 (no comment), :101 (Popper, no comment), :185 ×2 (Swiper, no comment), :238 (against own rules) | Allowed only against plugins, with a comment. |
| R11-34 | Brace and Declaration | Fail | most rules + 10 media + all fonts | css:50, :56, :64 several declarations on one line; css:73, :83, :100, :117, :224 selector lists on one line; css:54, :90, :96 `@media (…){` without a space; fonts:2–7 minified | One declaration per line, one selector per line, `@media (…) {`. |
| R11-35 | Indentation | Pass | | | 4 spaces. |
| R11-36 | Nesting | Pass | | | |
| R11-37 | No Dead CSS | Pass | | | See section 5 for unused tokens. |
| R11-38 | Admin Theme | N/A | | | |
| R11-39 | Admin Feature Stylesheet | N/A | | | |

### 10 JavaScript Development Rules (js = home-v1.js)

| Rule ID | Rule name | Status | Count | Locations | What to change |
|---|---|---|---|---|---|
| R10-01 | Script Location | At Razor | | | See sections 3 and 4. |
| R10-02 | Script Naming | At Razor | | | See sections 3 and 4. |
| R10-03 | Include Path Case | Pass | | | Paths match the files on disk. |
| R10-04 | File Versioning | At Razor | | | |
| R10-05 | Script Placement | Pass | | | Last in `body`. `FooterSection` applies at Razor. |
| R10-06 | Plugin Loading | At Razor | | | |
| R10-07 | Plugin Choice | N/A | | | No `plugins/README.md` register exists to check against. See Q6. |
| R10-08 | Page-Specific Logic | Fail | 1 | js:34–62 `header` (scroll state, mobile menu) | The header is on every page, so this belongs in `layoutModel` in the layout script. |
| R10-09 | No Empty Script | Pass | | | |
| R10-10 | Model Object | Fail | 1 | js:1 `const homeModel = {` | Use `const model = {`. |
| R10-11 | Layout and Global Object Naming | N/A | | | Applies once the header moves to `layoutModel`. |
| R10-12 | Model Property Declaration | Pass | | | |
| R10-13 | Feature Group | Fail | 1 | js:111–120 `homeModel.init()` wraps the init calls | Call each `model.x.init()` from the ready block. |
| R10-14 | Document Ready | Pass | | | |
| R10-15 | Step Comment | Pass | | | Will apply when R10-13 is fixed (add `//---` per step). |
| R10-16–20 | Server values | At Razor | | | See section 4. |
| R10-21 | JS Hook Class | Fail | 4 | js:44 `$('#mainNav')`, :55 `$('#mainNav a[href^="#"]')`, :56 `getElementById('mainNav')`, :105 `$('.reveal')` | Use `js-` hooks only. |
| R10-22 | Hook Class Naming | Pass | | | |
| R10-23 | Button Hook Suffix | Fail | 3 | html:34 `js-nav-toggle`, :177 `js-voices-prev`, :179 `js-voices-next` | Use `js-nav-toggle-button`, `js-voices-prev-button`, `js-voices-next-button`. |
| R10-24 | jQuery DOM Access | Fail | 4 | js:56 `document.getElementById`, :57 `el.classList.contains`, :94 `document.documentElement.classList.add`, :99 `entry.target.classList.add` | Use jQuery (`$(…).hasClass/addClass`). Pass `$(x)[0]` only where a plugin needs a native element. |
| R10-25 | No Concatenated Selector | Pass | | | |
| R10-26–34 | AJAX | N/A | | | No server calls. |
| R10-35–37 | DevExtreme | N/A | | | |
| R10-38 | Template7 | N/A | | | Data is not from AJAX. See section 5. |
| R10-39 | Variable Declaration | Pass | | | |
| R10-40 | Function Expression | Pass | | | |
| R10-41 | Quotes | Pass | | | |
| R10-42 | Semicolon | Pass | | | |
| R10-43 | Indentation | Pass | | | |
| R10-44 | Member Naming | Pass | | | |
| R10-45 | No Debug Leftovers | Pass | | | |
| R10-46 | Forbidden Constructs | Pass | | | |

## 3. Structural changes needed

Proposed order:

1. **Page shell (R12-07).** Wrap the page in `div.app`. Change `<main id="main">` to `<main class="app-page page-home" id="main">`.
2. **Header and footer (R12-02, R11-10, R11-21).** Rebuild the header and footer on the `app-header`/`app-footer` markup in `components.html`, adapted to the CLH design. Move their CSS into the `header` and `footer` blocks of section 3 in `style.css`. Put the shared header JS into `layoutModel` in `js/layout.js` (later `js/website/shared/Layout.js`) and include `layout.js` before the page script (R12-06, R10-08).
3. **Tokens (R11-12…15, R11-30).** Merge the `home-v1.css` `:root` into the `style.css` `:root` with the standard names: brand colours as `--bs-primary` and similar, each with an `-rgb` pair. Add `--app-header-height` (redefined per breakpoint) and `--fs-*`. See Q2: the brand palette differs from the current `style.css`.
4. **Components (R11-10, R11-16, R11-17).** Move `.btn-accent`/`.btn-ghost`, `.eyebrow`, `.section-title`, `.icon-btn` (voices controls and social) and the Swiper overrides into section 4 blocks, extending the existing `buttons` block. Add the new variants to `components.html`.
5. **Page CSS (R11-01, R11-08, R11-09, R11-11).** Move what is left of `home-v1.css` (hero, stats, webinar, programs, voices, partners, cta, motion) into section 5 as `/* ----------- home ----------- */ … /* ----------- /home ----------- */`, with every selector starting `.page-home`. Apply the formatting rules R11-27…R11-34 while moving. Delete `home-v1.css`.
6. **Fonts (R11-06).** Convert the Loos files to woff2/woff in `fonts/<family>/`. Add them to `fonts.css` in multi-line form, one comment per family. Reuse the Helvetica Neue LT GEO already declared there. Delete `clh-fonts.css` and fix the `<link>` order (R11-04).
7. **Icons (R12-18…20).** Replace the inline SVGs and arrow glyphs with files in `images/icons/`. Move `icon-placeholder.svg` to `images/icons/`.
8. **Script (R10-10, R10-13, R10-21…24).** Rename `homeModel` to `model`, fix the hooks and jQuery use, and call each init from the ready block. For the static template, keep the file at `js/home-v1.js`, or `js/home.js` once the old home is retired (see Q1). At Razor: `wwwroot/js/website/home/IndexWebsiteView.js`.
9. **HTML clean-up (R12-03, R12-05, R12-24, R12-28…30).** Fix the head order and title, self-close void elements, remove the hand-written `aria-expanded` and the comments that repeat the markup.

## 4. Applies at Razor conversion

- R11-02 / R10-03: paths start with `/css/`, `/plugins/`, `/js/`.
- R11-03 / R10-04: `asp-append-version="true"` on project CSS and JS, plus the cache header in `Program.cs`.
- R11-04: plugin CSS through `PluginsClientHeaderPartial`. Any page-only CSS goes in `@section HeaderSection`.
- R11-05 / R10-06: Bootstrap, Swiper and jQuery enabled through `Model.LayoutViewModel.PluginsClient.EnableX(true)`. Remove the direct `<link>`/`<script>` tags.
- R10-01 / R10-02: page script `wwwroot/js/website/home/IndexWebsiteView.js`. Layout script `js/website/shared/Layout.js`.
- R10-05: the page script goes in `@section FooterSection`.
- R10-16 / R10-17 / R10-19: webinar URL and flags in hidden inputs (`js-url-…`, `js-is-…`), read in `model.initModelProperties()`. The texts `'Open menu'`/`'Close menu'` (js:47, :51), `'Webinar'`, `'Register now'` (js:24, :27) come from the page texts block. Better: render the webinar section in Razor from the ViewModel (`if` on data) instead of building it in JS (js:3–31).
- R10-18: per-element values in `data-*`.
- R12-04: `lang` from `CurrentUICulture`.
- R12-05: title from page data or `Resources`. Meta description and OG tags (html:7–16) are written by the layout.
- R12-15: `aria-label` texts from `Resources`.
- R12-16: real URLs from the ViewModel for every `href="#…"` and `mailto:` placeholder.
- R12-19: content image `alt` from data.
- R12-27: Razor views use 4 spaces.

## 5. Not covered by rules

- html:2 `data-type="service"`, :8 `meta page-type`, :9 `meta site-kind`: nothing uses them.
- html:116 and js:21: the slot and the generated section both have `id="webinar"`. This is fine after replacement, but the menu links to `#webinar` (:69, :239) go nowhere when the banner is removed.
- js:69: `new Swiper(...)` is not stored on `model`.
- css:174: `.quote` sets `padding-left`, then `padding` overrides it in the same rule.
- css:21, :23, :25: `--clh-zodiac`, `--clh-misty`, `--clh-white` are never used.
- css:58 `:focus-visible` and css:52 `img{}` are global resets inside a page file (they belong in section 1 once merged).
- fonts:1 says "shared by home-v1/v2/v3", but only `home-v1.html` exists.
- css:224–228: animation is triggered by a `[data-enter]` attribute selector. No rule covers styling by data attribute.
- js:79, :83: trailing commas in object literals.

## 6. Open questions

- **Q1** R12-01: should the page be named `home-v1.html`, or replace `index.html` once approved? This decides the page scope name (`page-home` vs `page-index`) and the script name.
- **Q2** R11-07/R11-13: the approved brand colours (orange `#F4612F`, brown `#1A0700`, rose) differ from `style.css` (`--bs-primary: #47ACA6`). Does home-v1 replace the site theme, or is it a page theme?
- **Q3** R12-12/R12-24: the rules allow ids only for `label for`, Bootstrap targets and anchors, and list only `aria-label`, `aria-current` and `aria-hidden`. Are the `aria-labelledby` + `*Title` ids on sections, `aria-controls` on the toggler, `aria-label` on `<nav>`, and the skip link allowed?
- **Q4** R11-31: the approved motion uses longer durations and a custom easing (`.3s`–`2.4s`, `cubic-bezier(.2,.7,.2,1)`). Is that an allowed exception for the hero and reveal animations?
- **Q5** R11-30: the rule sets the body base at `14px`. The approved design uses `1.0625rem` (17px).
- **Q6** R10-07: no plugin register (`plugins/README.md`) exists in the repo, so Swiper, Bootstrap and jQuery could not be checked against it.
- **Q7** R12-15: the Bootstrap `navbar-toggler` (html:34) is icon-only. Must it also get `.icon-btn`?
- **Q8** R12-18: the hero arcs (html:84) are an animated decorative SVG (stroke-dash drawing). The rule forbids hand-written inline `<svg>`, and an `<img>` cannot be animated this way.
