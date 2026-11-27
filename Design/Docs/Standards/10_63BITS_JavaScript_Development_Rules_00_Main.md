# JavaScript Development Rules

This document defines the 63BITS standards for page JavaScript in ASP.NET Core MVC projects: where scripts live, how a page script is structured, how it receives values from the server, how it calls the server, and how it is formatted. The rules apply to **admin and website pages**.

*Candidate to move to the code standards repo.*

These rules complement **DevExtreme DataGrid Development Rules §8 JavaScript Rules**. Where that document already has a rule, it is referenced, not repeated. If a rule here seems to contradict the code standards repo, the code standards repo wins.

<br>

## Table of Contents

- [Glossary](#glossary)
- [File Standards](#file-standards)
  - [Script Location Rule (R10-01)](#script-location-rule-r10-01)
  - [Script Naming Rule (R10-02)](#script-naming-rule-r10-02)
  - [Include Path Case Rule (R10-03)](#include-path-case-rule-r10-03)
  - [File Versioning Rule (R10-04)](#file-versioning-rule-r10-04)
  - [Script Placement Rule (R10-05)](#script-placement-rule-r10-05)
  - [Plugin Loading Rule (R10-06)](#plugin-loading-rule-r10-06)
  - [Plugin Choice Rule (R10-07)](#plugin-choice-rule-r10-07)
  - [Page-Specific Logic Rule (R10-08)](#page-specific-logic-rule-r10-08)
  - [No Empty Script Rule (R10-09)](#no-empty-script-rule-r10-09)
- [Model Object Standards](#model-object-standards)
  - [Model Object Rule (R10-10)](#model-object-rule-r10-10)
  - [Layout and Global Object Naming Rule (R10-11)](#layout-and-global-object-naming-rule-r10-11)
  - [Model Property Declaration Rule (R10-12)](#model-property-declaration-rule-r10-12)
  - [Feature Group Rule (R10-13)](#feature-group-rule-r10-13)
  - [Document Ready Rule (R10-14)](#document-ready-rule-r10-14)
  - [Step Comment Rule (R10-15)](#step-comment-rule-r10-15)
- [Server Values Standards](#server-values-standards)
  - [Hidden Input Rule (R10-16)](#hidden-input-rule-r10-16)
  - [Init Model Properties Rule (R10-17)](#init-model-properties-rule-r10-17)
  - [Element Data Attribute Rule (R10-18)](#element-data-attribute-rule-r10-18)
  - [Value Encoding Rule (R10-19)](#value-encoding-rule-r10-19)
  - [No Inline Value Assignment Rule (R10-20)](#no-inline-value-assignment-rule-r10-20)
- [DOM Standards](#dom-standards)
  - [JS Hook Class Rule (R10-21)](#js-hook-class-rule-r10-21)
  - [Hook Class Naming Rule (R10-22)](#hook-class-naming-rule-r10-22)
  - [Button Hook Suffix Rule (R10-23)](#button-hook-suffix-rule-r10-23)
  - [jQuery DOM Access Rule (R10-24)](#jquery-dom-access-rule-r10-24)
  - [No Concatenated Selector Rule (R10-25)](#no-concatenated-selector-rule-r10-25)
- [AJAX Standards](#ajax-standards)
  - [Api63 Library Rule (R10-26)](#api63-library-rule-r10-26)
  - [Api63 Setup Rule (R10-27)](#api63-setup-rule-r10-27)
  - [AJAX Call Rule (R10-28)](#ajax-call-rule-r10-28)
  - [Loading Indicator Rule (R10-29)](#loading-indicator-rule-r10-29)
  - [AjaxResponse Handling Rule (R10-30)](#ajaxresponse-handling-rule-r10-30)
  - [Admin Feedback Rule (R10-31)](#admin-feedback-rule-r10-31)
  - [Confirmation Rule (R10-32)](#confirmation-rule-r10-32)
  - [No Synchronous Request Rule (R10-33)](#no-synchronous-request-rule-r10-33)
  - [Waiting for a Result Rule (R10-34)](#waiting-for-a-result-rule-r10-34)
- [DevExtreme Standards](#devextreme-standards)
  - [Grid Hooks Rule (R10-35)](#grid-hooks-rule-r10-35)
  - [Tree Hooks Rule (R10-36)](#tree-hooks-rule-r10-36)
  - [Grid Sort Rule (R10-37)](#grid-sort-rule-r10-37)
- [Client Template Standards](#client-template-standards)
  - [Template7 Rule (R10-38)](#template7-rule-r10-38)
- [Syntax Standards](#syntax-standards)
  - [Variable Declaration Rule (R10-39)](#variable-declaration-rule-r10-39)
  - [Function Expression Rule (R10-40)](#function-expression-rule-r10-40)
  - [Quotes Rule (R10-41)](#quotes-rule-r10-41)
  - [Semicolon Rule (R10-42)](#semicolon-rule-r10-42)
  - [Indentation Rule (R10-43)](#indentation-rule-r10-43)
  - [Member Naming Rule (R10-44)](#member-naming-rule-r10-44)
  - [No Debug Leftovers Rule (R10-45)](#no-debug-leftovers-rule-r10-45)
  - [Forbidden Constructs Rule (R10-46)](#forbidden-constructs-rule-r10-46)
- [Sources](#sources)

<br>

## Glossary

- **Page script:** the JavaScript file that belongs to exactly one Razor view, e.g. `UsersAdminView.js` for `UsersAdminView.cshtml`.
- **Layout script:** the JavaScript file loaded by a `_Layout.cshtml` on every page of an area.
- **Global script:** `js/Global.js`, which holds the shared `globals` object (DevExtreme helpers, constants).
- **Hook class:** a CSS class starting with `js-` that exists only so JavaScript can find the element.
- **Area:** `admin` or `website`.

<br>

## File Standards

This section defines where page scripts are stored, how they are named and how a view loads them.

<br>

### Script Location Rule (R10-01)

A page script **must** be created at **SixtyThreeBits.Web → wwwroot → js → \<area\> → \<module\> → \<ViewName\>.js**. The path **must** replicate the Razor view's path. Folder names under `js/` **must** use camelCase; this extends DX §8.1 to website pages.

```
Views/Admin/EmailTemplates/EmailTemplatesAdminView.cshtml
wwwroot/js/admin/emailTemplates/EmailTemplatesAdminView.js

Views/Website/Checkout/CheckoutWebsiteView.cshtml
wwwroot/js/website/checkout/CheckoutWebsiteView.js
```

<br>

### Script Naming Rule (R10-02)

The script file name **must** be exactly the view file name, in PascalCase, with `.js` instead of `.cshtml`. One view loads at most one page script, and a page script belongs to one view only.

```
// Wrong
js/admin/emailLogs/emailLogsView.js        (camelCase file name)
js/website/home/HomeWebsiteView.js         (view is IndexWebsiteView.cshtml)
js/admin/pages/page/PageTextAdminView.js   (shared by five views)

// Correct
js/admin/emailLogs/EmailLogsView.js
js/website/home/IndexWebsiteView.js
```

Layout scripts follow the same rule: `_Layout.cshtml` → `Layout.js`, placed in the area's `shared/` folder (`js/admin/shared/Layout.js`, `js/website/shared/Layout.js`). Existing projects that have `js/website/layout.js` rename it to `js/website/shared/Layout.js` the next time the file is changed.

<br>

### Include Path Case Rule (R10-03)

The `src` of a script include **must** match the folder and file names on disk **exactly, including case**. Windows ignores case, but Linux hosts return 404.

```cshtml
@* Wrong — the file is js/Global.js *@
<script src="/js/global.js" asp-append-version="true"></script>

@* Correct *@
<script src="/js/Global.js" asp-append-version="true"></script>
```

Always start the path with `/js/`, not `~/js/`.

<br>

### File Versioning Rule (R10-04)

Every include of a project script (`/js/...`) **must** have `asp-append-version="true"`. ASP.NET adds a hash of the file's content to the address (`?v=...`), so the browser keeps the file until a deploy changes it and then loads the new one once.

```cshtml
@* Wrong — after a deploy the browser can keep the old file *@
<script src="/js/admin/users/UsersAdminView.js"></script>

@* Wrong — a new address on every request, the file is never cached *@
<script src="/js/admin/users/UsersAdminView.js?v=@Guid.NewGuid()"></script>

@* Correct *@
<script src="/js/admin/users/UsersAdminView.js" asp-append-version="true"></script>
```

- The project **must** send a long cache header for versioned files. This is set once where the app configures static files (`Startup.cs` in the boilerplate); see **11 CSS Development Rules, File Versioning Rule**.
- Plugin files are loaded by `Model.PluginsClient` ([Plugin Loading Rule](#plugin-loading-rule-r10-06)) and are not covered here.

<br>

### Script Placement Rule (R10-05)

Follow DX §8.3: the page script **must** be included inside `@section FooterSection { ... }`. This applies to website pages too.

```cshtml
@section FooterSection {
    <script src="/js/admin/users/UsersAdminView.js" asp-append-version="true"></script>
}
```

<br>

### Plugin Loading Rule (R10-06)

Plugins (DevExtreme, Swiper, Tom Select, Fancybox, …) **must** be enabled from the controller through `Model.LayoutViewModel.PluginsClient.EnableX(true)` on admin **and** website pages. Never add a plugin `<script>` tag directly in a view.

```cshtml
@* Wrong *@
@section FooterSection {
    <script src="/plugins/swiper/swiper-bundle.min.js"></script>
    <script src="/js/website/products/ProductsWebsiteView.js" asp-append-version="true"></script>
}
```

```csharp
// Correct — in the controller action
Model.LayoutViewModel.PluginsClient.EnableSwiper(true);
```

<br>

### Plugin Choice Rule (R10-07)

A project **must** use only the plugins in the framework's plugin register (`plugins/README.md`, Approved Third-Party Plugins), and only for the job listed there. One plugin per job: a page that needs a select field uses Tom Select, not Select2; a gallery uses fancyBox, not a second gallery library.

- **63BITS plugins** (`63bits-*`) have one master copy, in the framework's `plugins/` folder or in the boilerplate. Copy them unchanged. A fix goes into the master copy first, then into the projects.
- **A new third-party plugin** is added only after the lead developer agrees. It goes into the register first, with its job, version, licence and source.
- **A paid or unclear licence** (commercial, GPL, no licence file) **must** be noted in the register before the plugin is used on a new project.
- **Versions:** new projects take the version in the register. Do not upgrade a plugin in an existing project unless the pages that use it are changed and tested.

```csharp
// Wrong — a second select library, not in the register
Model.LayoutViewModel.PluginsClient.EnableSelect2(true);

// Correct
Model.LayoutViewModel.PluginsClient.EnableTomSelect(true);
```

<br>

### Page-Specific Logic Rule (R10-08)

Follow DX §8.1: a page script contains only logic for its own page. Code used by several pages goes to:

- `globals` in `js/Global.js` — admin helpers such as `globals.devexpress.*`
- `layoutModel` in the area's layout script — website widgets such as sliders, modals and form submit

Do not copy a function from one page script into another; move it to one of the shared places.

<br>

### No Empty Script Rule (R10-09)

Do not create or include a page script that has no logic. Remove the include and the file together. The one exception is the onboarding pattern in ONB-06.2, where an empty `model` is kept for consistency while the page still has a `$(function () { ... })` block.

<br>

## Model Object Standards

This section defines how a page script is structured.

<br>

### Model Object Rule (R10-10)

Follow DX §8.2: every page script **must** begin with **one** `const model = { ... }` object that holds all page properties and functions. This applies to website pages too. Do not declare anything else at the top level.

```js
// Wrong
var model = { };
const accountProfileModel = { };
function initForm() { }

// Correct
const model = {
    urlSave: null,

    save: function () {
        ...
    }
};
```

No classes, ES modules, IIFEs or top-level function declarations.

<br>

### Layout and Global Object Naming Rule (R10-11)

Scripts that load on every page **must not** use the name `model`, because the page script owns it:

| Script | Object |
|---|---|
| `js/Global.js` | `globals` |
| website layout script | `layoutModel` |
| admin layout script | `layoutModel` |

<br>

### Model Property Declaration Rule (R10-12)

Every value the page keeps **must** be declared on `model` with an initial value, before the functions. URLs start with `url`, texts with `text`, flags with `is`/`has`. Never create a property or variable that is not declared.

```js
// Wrong
model.grid = e.component;   // grid is not declared
visibleRows = 10;           // implicit global

// Correct
const model = {
    grid: null,
    urlUpdate: null,
    textConfirmDelete: null,
    isLoggedIn: false,
    ...
};
```

<br>

### Feature Group Rule (R10-13)

When a page has several independent widgets, group each widget's code in a nested object on `model` with its own `init` function. Call the `init` functions from the ready block.

```js
const model = {
    form: {
        init: function () {
            $('.js-account-profile-form').on('submit', function (e) {
                ...
            });
        }
    },
    gallery: {
        init: function () {
            ...
        }
    }
};

$(function () {
    model.form.init();
    model.gallery.init();
});
```

<br>

### Document Ready Rule (R10-14)

Follow DX §8.2: all event bindings and `init` calls **must** be inside **one** `$(function () { ... })` block at the end of the file. Do not use `$(document).ready`, `DOMContentLoaded` or bindings outside the block.

```js
// Wrong
window.addEventListener('scroll', function () { ... });

// Correct
$(function () {
    $(window).on('scroll', function () { ... });
});
```

<br>

### Step Comment Rule (R10-15)

When the ready block has more than one step, put a `//---` comment before each step.

```js
$(function () {
    //--- main slider
    layoutModel.mainSlider.init();

    //--- categories carousel
    model.categoriesCarousel.init();
});
```

<br>

## Server Values Standards

This section defines how URLs, texts and flags travel from the C# model to the page script.

<br>

### Hidden Input Rule (R10-16)

Page-level URLs and flags **must** be rendered in the view as hidden inputs with a hook class. The hook class is `js-url-<name>` or `js-is-<name>`, in kebab-case. Texts **must not** go in hidden inputs: they come from the page texts block (**Razor Views Development Rules**, Page Texts Block Rule; decision DMT-7).

```cshtml
<input type="hidden" class="js-url-test-email-smtp" value="@Html.Raw(Model.UrlTestEmailSmtp)" />
<input type="hidden" class="js-is-smtp-configured" value="@(Model.IsSmtpConfigured ? "true" : "false")" />

@section FooterSection {
    <script type="application/json" class="js-page-texts">@Json.Serialize(Model.Texts)</script>
    <script src="/js/admin/systemProperties/SystemPropertiesAdminView.js" asp-append-version="true"></script>
}
```

<br>

### Init Model Properties Rule (R10-17)

The page script reads the hidden inputs and parses the page texts block in a `model.initModelProperties()` function. It **must** be the first call in the ready block.

```js
const model = {
    urlTestEmailSmtp: null,
    isSmtpConfigured: false,
    texts: null,

    initModelProperties: function () {
        model.urlTestEmailSmtp = $('.js-url-test-email-smtp').val();
        model.isSmtpConfigured = $('.js-is-smtp-configured').val() === 'true';
        model.texts = JSON.parse($('.js-page-texts').text());
    }
};

$(function () {
    model.initModelProperties();
    ...
});
```

<br>

### Element Data Attribute Rule (R10-18)

A value that belongs to one element (a row ID, a per-button URL, a slider range) goes in a `data-*` attribute on that element and is read when the element is used. ONB-06.2 uses this for `data-url`. A form posts to its own `action` attribute, which **must** be set.

```cshtml
<button class="btn btn-outline-light js-delete-image-button" data-url="@Html.Raw(Model.UrlDeleteImage)">...</button>
<form class="js-login-form" action="@Html.Raw(Model.UrlLogin)">...</form>
```

```js
$('.js-delete-image-button').click(function () {
    const url = $(this).attr('data-url');
    ...
});
```

<br>

### Value Encoding Rule (R10-19)

- **URLs** generated by the application are written with `@Html.Raw(...)`, as in ONB-06.2.
- **Texts** reach the script only through the page texts block, written with `@Json.Serialize(Model.Texts)` (decision DMT-7).
- Any value an admin or user can enter **must** be written with `@Model.X` (HTML-encoded) when it goes into an attribute. Never `@Html.Raw` for it.

```cshtml
@* Wrong *@
<input type="hidden" class="js-text-menu-title" value="@Html.Raw(Model.TextMenuTitle)" />
<button class="js-edit-button" data-client-name="@Html.Raw(item.ClientName)">...</button>

@* Correct *@
<script type="application/json" class="js-page-texts">@Json.Serialize(Model.Texts)</script>
<button class="js-edit-button" data-client-name="@item.ClientName">...</button>
```

<br>

### No Inline Value Assignment Rule (R10-20)

Do not assign server values to `model` in an inline `<script>` block. A `'`, `\` or line break in the value breaks the script, and an entered value can inject code.

```cshtml
@* Wrong *@
<script>
    model.urlResetPassword = '@Html.Raw(Model.UrlResetPassword)';
    model.isLoggedIn = @(Model.IsLoggedIn ? "true" : "false");
</script>

@* Correct *@
<input type="hidden" class="js-url-reset-password" value="@Html.Raw(Model.UrlResetPassword)" />
<input type="hidden" class="js-is-logged-in" value="@(Model.IsLoggedIn ? "true" : "false")" />
```

A hidden input always gives a string, so read a flag as `model.isLoggedIn = $('.js-is-logged-in').val() === 'true';`.

**Exception:** the page texts block and the two `FooterSection` scripts from ONB-06.2, `validation.init({ errorsJson: ... })` and `successErrorToast63Bits.init({ ... })`. The toast message is written with `@Json.Serialize(Model.ToastError)`, not `'@Html.Raw(...)'` (decision JS-5).

<br>

## DOM Standards

This section defines how page scripts find and change elements.

<br>

### JS Hook Class Rule (R10-21)

JavaScript **must** find elements through `js-` hook classes (ONB-06.2). A hook class is only for JavaScript; it is never used in CSS. Use `#id` only where a library needs an ID (DevExtreme widget instances, Template7 template sources).

```js
// Wrong
$('.btn-primary').click(function () { ... });
$('#saveButton').click(function () { ... });

// Correct
$('.js-save-button').click(function () { ... });
```

<br>

### Hook Class Naming Rule (R10-22)

Hook classes **must** be kebab-case: `js-` followed by lowercase words joined with `-`. No camelCase, PascalCase or underscores, and do not copy the C# property name.

```html
<!-- Wrong -->
<input class="js-urlAdd" />
<input class="js-QueryStringKeyDateStart" />
<button class="js_send_button"></button>

<!-- Correct -->
<input class="js-url-add" />
<input class="js-query-string-key-date-start" />
<button class="js-send-button"></button>
```

<br>

### Button Hook Suffix Rule (R10-23)

A button hook class **must** end with `-button`, as in the onboarding (`js-add-new-button`, `js-custom-file-upload-delete-button`). Do not use `-btn` in hook classes. Other suffixes follow the element: `-input`, `-form`, `-link`, `-modal`, `-wrap`.

```js
// Wrong
$('.js-password-visibility-toggle-btn')

// Correct
$('.js-password-visibility-toggle-button')
```

<br>

### jQuery DOM Access Rule (R10-24)

jQuery is the DOM library of the 63BITS stack (ONB-06.1). Use jQuery for selecting elements, events and DOM changes. Do not mix in `document.querySelector`, `getElementById` or `addEventListener`, except where a plugin requires a native element; then get it from the jQuery object (`$(container)[0]`).

```js
// Wrong
const card = document.querySelector('.js-order-summary-card');

// Correct
const card = $('.js-order-summary-card');
```

<br>

### No Concatenated Selector Rule (R10-25)

Do not build a selector from a variable by string concatenation. Select the group with a hook class and filter by the data value.

```js
// Wrong
$('.js-tree-node[data-id="' + id + '"]')

// Correct
$('.js-tree-node').filter(function () {
    return $(this).attr('data-id') == id;
});
```

<br>

## AJAX Standards

This section defines how page scripts call the server. The server side is DX §5.8 AjaxResponse Rule: every AJAX action returns `{ IsSuccess, Data }`.

<br>

### Api63 Library Rule (R10-26)

Every AJAX call on **admin and website pages** **must** use the `Api63` library (plugin `63bits-api63`):

- `Api63.get(url, data)`
- `Api63.post(url, data)`

Do not use `$.ajax`, `$.get`, `$.post`, `fetch` or `globals.ajax` in page scripts, layout scripts or `Global.js`.

What `Api63` does:

| Case | Result |
|---|---|
| Server answers | the Promise resolves with the server's `{ IsSuccess, Data }` |
| HTTP error (500, 404, no network) | the Promise resolves with `{ IsSuccess: false, Data: 'Sorry, something went wrong. Please contact administration.' }` |

- The Promise **never rejects**. Do not add `.catch(...)` or `try`/`catch` for the request.
- It sends `data` as form fields and reads the answer as JSON (`dataType: 'json'`).
- It does **not** show a loading indicator ([Loading Indicator Rule](#loading-indicator-rule-r10-29)).

```js
// Wrong
$.ajax({
    type: 'POST',
    url: model.urlUpdate,
    data: data,
    dataType: 'json',
    success: function (res) { ... }
});
$.post(model.urlUpdate, data);
fetch(model.urlUpdate, { method: 'POST' });

// Correct
const response = await Api63.post(model.urlUpdate, data);
```

**Existing code:** `$.ajax` and `globals.ajax` calls move to `Api63` the next time the script is changed.

**Exception:** file uploads use the `63bits-file-uploader` plugin. `Api63` cannot send files.

`Api63.js` is used as it is. Do not change it inside a project, and do not wrap it in a project helper that adds a preloader or another error text.

<br>

### Api63 Setup Rule (R10-27)

A project that does not have `Api63` yet gets it in four steps. Claude does these steps when it sets up a project or when it finds the plugin missing.

**1. Plugin files.** Copy the framework folder `plugins/63bits-api63/` into the project:

```
SixtyThreeBits.Web/wwwroot/plugins/63bits-api63/Api63.js
```

**2. `PluginsClientViewModel`** (`Domain/ViewModels/Shared/PluginsClientViewModel.cs`). Add the property and the method, in alphabetical order with the other `63Bits` members:

```csharp
public bool Is63BitsApiEnabled { get; private set; }

public PluginsClientViewModel Enable63BitsApi(bool value)
{
    Is63BitsApiEnabled = value;
    return this;
}
```

**3. Footer partial** (`Views/Shared/PluginsClientFooterPartial.cshtml`). Add the include. jQuery is loaded in `PluginsClientHeaderPartial.cshtml`, so any place in the footer partial works:

```cshtml
@if (Model.Is63BitsApiEnabled)
{
    <script src="/plugins/63bits-api63/Api63.js"></script>
}
```

**4. Enable it.**

- **Admin:** in `AdminControllerBase.initClientPlugins()`, so every admin page has it:

```csharp
Model.LayoutViewModel.PluginsClient
.Enable63BitsApi(true)
.EnableGoogleFonts(true)
...
```

- **Other areas with a base controller** (for example an employee or account area): the same line in that base controller.
- **Website:** in the controller of each page that calls the server, or in the website base controller when most pages do:

```csharp
Model.LayoutViewModel.PluginsClient.Enable63BitsApi(true);
```

<br>

### AJAX Call Rule (R10-28)

- `url` comes from `model` or a `data-*` attribute. Never write a URL in the script.
- Wait for the result with `await` inside an `async` function. Name the result `response`.
- `.then(function (response) { ... })` is allowed where the caller cannot be `async`.

```js
// Wrong — URL in the script, result not awaited
Api63.post('/admin/users/update', data);

// Correct
onSaveClick: async function () {
    const data = model.getFormData();

    preloader.show();
    const response = await Api63.post(model.urlUpdate, data);
    preloader.hide();

    if (response.IsSuccess) {
        components63Bits.dialog.success();
        model.grid.refresh();
    }
    else {
        components63Bits.dialog.error(response.Data);
    }
}
```

<br>

### Loading Indicator Rule (R10-29)

`Api63` does not show a loading indicator, so the caller does:

- **Admin:** `preloader.show()` right before the call, `preloader.hide()` right after `await`, before the result is checked.
- **Website:** the preloader, or loading on the button that started the call (for example `showButtonLoader()` / `hideButtonLoader()`).

```js
// Wrong — the preloader stays on screen when the call fails
preloader.show();
const response = await Api63.post(model.urlUpdate, data);
if (response.IsSuccess) {
    preloader.hide();
    model.grid.refresh();
}

// Correct
preloader.show();
const response = await Api63.post(model.urlUpdate, data);
preloader.hide();
if (response.IsSuccess) { ... }
```

**Exception:** grid drag-sort ([Grid Sort Rule](#grid-sort-rule-r10-37)) shows no indicator, so the screen does not flash on every drop.

<br>

### AjaxResponse Handling Rule (R10-30)

Every call **must** check `response.IsSuccess` and handle **both** branches. On failure, show `response.Data`: it holds the server's message, or the generic message on an HTTP error.

```js
// Wrong — the tree refreshes even when the save failed
await Api63.post(model.urlUpdate, data);
model.tree.refresh();

// Wrong — the failure is not shown
if (response.IsSuccess) { model.tree.refresh(); }

// Correct
if (response.IsSuccess) {
    model.tree.refresh();
}
else {
    components63Bits.dialog.error(response.Data);
}
```

On website forms, field errors come from `response.Data.ErrorsJson` and are shown with `validation` from `63bits-bsforms`. Check that `response.Data` exists before reading it.

<br>

### Admin Feedback Rule (R10-31)

Admin AJAX feedback **must** use the boilerplate dialog `components63Bits.dialog`, as the boilerplate admin pages do (for example `SystemPropertiesAdminView.js`).

- `components63Bits.dialog.success()` — no arguments
- `components63Bits.dialog.error(response.Data)` — always pass `response.Data`

```js
// Wrong — the server's message is not shown
if (!response.IsSuccess) { components63Bits.dialog.error(); }

// Correct
if (!response.IsSuccess) { components63Bits.dialog.error(response.Data); }
```

<br>

### Confirmation Rule (R10-32)

Before a destructive action, ask with `components63Bits.dialog.confirm(...)`. Use `components63Bits.dialog.prompt(...)` to ask for a value. Never use the browser's `confirm`, `alert` or `prompt`.

```js
// Wrong
if (confirm('Delete?')) { ... }

// Correct
components63Bits.dialog.confirm({
    title: '',
    textConfirm: components63Bits.textConfirmDelete,
    resolve: async function () {
        preloader.show();
        const response = await Api63.post(model.urlDelete, { UserID: userID });
        preloader.hide();
        ...
    }
});
```

<br>

### No Synchronous Request Rule (R10-33)

Never use `async: false`. It freezes the page until the server answers. `Api63` is always asynchronous. Projects created from the boilerplate fix `FileManagerView.js` upload (async, one error message).

<br>

### Waiting for a Result Rule (R10-34)

When code must wait for a server result, it `await`s the Promise `Api63` returns. Do not wrap a request in `new Promise(...)`.

A function that returns a Promise has the `Promise` suffix. It returns the `Api63` result or a value taken from it.

```js
// Wrong — a hand-made Promise around $.ajax
getEmailLogPromise: function (url) {
    return new Promise(function (resolve, reject) {
        $.ajax({ ... });
    });
}

// Correct
const model = {
    getEmailLogPromise: function (url) {
        return Api63.get(url);
    }
};

const response = await model.getEmailLogPromise(url);
if (response.IsSuccess) {
    model.showEmailLog(response.Data);
}
else {
    components63Bits.dialog.error(response.Data);
}
```

A failure **must** be shown to the user. Never only `console.error`.

<br>

## DevExtreme Standards

This section adds to DX §8.2 Model Object Rule. Everything in DX §8.2 applies unchanged.

<br>

### Grid Hooks Rule (R10-35)

Follow DX §8.2: `grid: null`, `onGridInit` assigns `model.grid = e.component` and calls `globals.devexpress.setGridFullHeight(e.component)`, it is wired with `.OnInitialized("model.onGridInit")`, and the grid API is called through `model.grid`.

When a page has more than one grid, name each one after its content: `model.warehousesGrid` and `model.onWarehousesGridInit`.

<br>

### Tree Hooks Rule (R10-36)

A DevExtreme TreeList uses the same pattern with `tree`:

```js
const model = {
    tree: null,

    onTreeInit: function (e) {
        model.tree = e.component;
        globals.devexpress.setGridFullHeight(e.component);
    }
};
```

Wire it with `.OnInitialized("model.onTreeInit")`.

<br>

### Grid Sort Rule (R10-37)

Drag-sort uses `.RowDragging(rd => rd.AllowReordering(true).OnReorder("model.onGridReorder"))`, `globals.devexpress.getGridSortIndexes(...)` and `globals.devexpress.syncSortIndexes(...)`. Do not copy a sync function into the page script.

```js
// Wrong — the sync call copied into every sortable grid script
onGridReorder: function (e) {
    const sortIndexes = globals.devexpress.getGridSortIndexes('CityID', model.grid, e);
    Api63.post(model.urlSyncSortIndexes, { SortIndexes: sortIndexes });
}

// Correct
onGridReorder: function (e) {
    const sortIndexes = globals.devexpress.getGridSortIndexes('CityID', model.grid, e);
    globals.devexpress.syncSortIndexes(model.urlSyncSortIndexes, sortIndexes, model.grid);
}
```

The shared function in `js/Global.js` has no preloader, so it does not flash on every drop. The boilerplate version still uses `$.ajax`; it moves to `Api63` ([Api63 Library Rule](#api63-library-rule-r10-26)):

```js
syncSortIndexes: async function (url, sortIndexes, grid) {
    const response = await Api63.post(url, { SortIndexes: sortIndexes });
    if (response.IsSuccess) { grid.refresh(); }
    else { components63Bits.dialog.error(response.Data); }
}
```

<br>

## Client Template Standards

<br>

### Template7 Rule (R10-38)

HTML built from AJAX data **must** be rendered with Template7, not string concatenation.

- The template is a `<script type="text/template7" id="...">` block in the view.
- It is compiled once, in an init function, into `model.templates.<name>`.
- It is rendered with `.html(model.templates.<name>(data))`.

```js
// Wrong
$('.js-basket').html('<div class="item">' + item.Name + '</div>');

// Correct
const model = {
    templates: {
        page: null
    },

    initTemplates: function () {
        model.templates.page = Template7.compile($('#BasketPageTemplate').html());
    }
};
```

<br>

## Syntax Standards

This section defines the formatting of all page, layout and global scripts.

<br>

### Variable Declaration Rule (R10-39)

Use `const`. Use `let` only when the variable is reassigned. Never use `var`.

```js
// Wrong
var gridHeight = screenHeight - offsetTop;

// Correct
const offsetTop = $(gridElement).offset().top;
let gridHeight = screenHeight - offsetTop - paddingBottom;
```

<br>

### Function Expression Rule (R10-40)

Write functions as `function () { }`, both for model members and callbacks, or `async function () { }` when the function uses `await`. Do not use arrow functions.

```js
// Wrong
.then((buffer) => { ... });

// Correct
.then(function (buffer) { ... });
```

<br>

### Quotes Rule (R10-41)

Strings use single quotes. Double quotes appear only inside strings, e.g. HTML attributes.

<br>

### Semicolon Rule (R10-42)

Every statement ends with a semicolon.

```js
// Wrong
model.grid.refresh()

// Correct
model.grid.refresh();
```

<br>

### Indentation Rule (R10-43)

Indent with 4 spaces. Never tabs.

<br>

### Member Naming Rule (R10-44)

Model properties, functions and local variables use camelCase. A name says what it holds or does.

```js
// Wrong
fileManagerModel.FileManager = e.component;
roleIDRocused: null,

// Correct
model.fileManager = e.component;
roleIDFocused: null,
```

<br>

### No Debug Leftovers Rule (R10-45)

Committed code **must not** contain `console.log`, `debugger` or commented-out code.

<br>

### Forbidden Constructs Rule (R10-46)

Never use `eval`, `document.write` or `with`. To call a function by name, look it up on the object: `window.parent[callbackName](url)`.

<br>

## Sources

Rules are taken from the page scripts of MusicHouse (62 files) and Peani (45 files), which share the 63BITS boilerplate and one frontend developer's practice. Where the developer's code and the 63BITS standards differ, the standards win (e.g. `-button`, not `-btn`). The `Api63` library comes from CreativeLeadershipPlatform, where admin, employee and website pages already use it; making it the one way to call the server is a 63BITS decision of 2026-11-20.

Full evidence with `file:line` references is kept in the framework repo under `evidences/javascript/`. Open questions for the lead developer are in `Questions_For_Mike.md`, in the framework repo.
