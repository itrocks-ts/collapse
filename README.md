[![npm version](https://img.shields.io/npm/v/@itrocks/collapse?logo=npm)](https://www.npmjs.org/package/@itrocks/collapse)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/collapse)](https://www.npmjs.org/package/@itrocks/collapse)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/collapse?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/collapse)
[![issues](https://img.shields.io/github/issues/itrocks-ts/collapse)](https://github.com/itrocks-ts/collapse/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# collapse

Handles adding and removing the 'collapse' class on a .app.menu.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/collapse
```

## Usage

`@itrocks/collapse` helps you implement a responsive navigation menu that
collapses on small screens. It wires a *toggle element* (often a burger
button) to a menu container so that clicking the toggle adds or removes
the `collapse` CSS class.

On narrow viewports (≤ 600px), the menu is collapsed by default and any
click on a `.app.menu a` link will automatically trigger a collapse.

### Minimal example

```ts
import { collapse } from '@itrocks/collapse'

// The element that will toggle the menu (for example a burger button)
const toggle = document.querySelector<HTMLButtonElement>('header .menu-toggle')

if (toggle) {
  // Attach collapse behaviour to the toggle button
  collapse(toggle)
}
```

With a matching HTML structure and CSS such as:

```html
<header>
  <button class="menu-toggle" aria-label="Open menu">☰</button>
  <nav class="app menu collapse">
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

```scss
.app.menu {
  // default desktop behaviour
}

@media (max-width: 600px) {
  .app.menu.collapse {
    display: none;
  }
}
```

When the viewport width is 600px or less, `collapse(toggle)` will
automatically trigger an initial click on the toggle, so the menu starts
in a collapsed state.

### Using a custom container selector

By default, the menu container is resolved as the parent element of the
toggle. If your layout requires a different element (for example the
toggle is inside a header and the menu is elsewhere), you can provide a
`closestSelector`.

```ts
import { collapse } from '@itrocks/collapse'

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')

if (toggle) {
  // Look for the closest ancestor that matches 'nav.app.menu'
  collapse(toggle, 'nav.app.menu')
}
```

In this case, the `collapse` class will be added to / removed from the
closest ancestor of `toggle` that matches the `nav.app.menu` selector.

## API

### `collapse(element: HTMLElement, closestSelector?: string): void`

Attach responsive collapse behaviour to a toggle element.

#### Parameters

- `element` – The clickable element that will toggle the menu. In most
  cases this is a `<button>` or an `<a>` used as a burger icon or menu
  trigger.
- `closestSelector` *(optional)* – A CSS selector used to locate the
  menu container relative to the toggle element. The function will look
  for the closest ancestor of `element` matching this selector. If not
  provided or if no matching ancestor is found, the parent element of
  `element` is used as the container. As a last resort, `element`
  itself becomes the container.

#### Behaviour

Once `collapse` is called:

- A click listener is attached to `element`. Each click:
  - Finds the target container (using `closestSelector` or the parent
    element).
  - Toggles the `collapse` class on this container.
- All links matching `.app.menu a` in `document.body` receive a click
  listener that, on small screens, programmatically clicks the toggle
  element after navigation.
- On initialisation, if `window.innerWidth <= 600`, a synthetic click on
  `element` is triggered so that the menu starts in a collapsed state on
  mobile.

#### Environment

This helper is designed for browser environments. It relies on:

- `document.body.querySelectorAll` to locate menu links,
- `window.innerWidth` to detect small screens,
- DOM events (`addEventListener`, `.click()`),
- `Element.closest` when a `closestSelector` is provided.

It should not be used on the server side.

## Typical use cases

- Implement a mobile‑friendly burger menu that collapses the navigation
  when toggled.
- Ensure that navigation links in a responsive `.app.menu` automatically
  close the menu after the user clicks a link on small screens.
- Share a consistent collapse behaviour across several projects by
  reusing the same helper instead of rewriting custom menu toggling
  logic.
