[![npm version](https://img.shields.io/npm/v/@itrocks/collapse?logo=npm)](https://www.npmjs.org/package/@itrocks/collapse)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/collapse)](https://www.npmjs.org/package/@itrocks/collapse)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/collapse?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/collapse)
[![issues](https://img.shields.io/github/issues/itrocks-ts/collapse)](https://github.com/itrocks-ts/collapse/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# collapse

Toggles responsive collapsed and expanded state classes in the browser.

*This documentation was written by an artificial intelligence and may contain errors or approximations.
It has not yet been fully reviewed by a human. If anything seems unclear or incomplete,
please feel free to contact the author of this package.*

## Installation

```bash
npm i @itrocks/collapse
```

## Usage

`@itrocks/collapse` wires a toggle element to a responsive container. The state
names describe the container rather than a particular navigation component:

- above 600 pixels, the container is expanded by default and `collapse` marks
  the reduced state;
- at 600 pixels or below, the container is reduced by default and `expand`
  marks the extended state.

Activating a link contained in the component removes `expand` on a small
viewport. The matching CSS can therefore restore the default reduced state
after partial navigation without depending on menu-specific class names.

### Minimal example

```ts
import { collapse } from '@itrocks/collapse'

const toggle = document.querySelector<HTMLButtonElement>('.panel-toggle')

if (toggle) {
  collapse(toggle, '.panel')
}
```

With a matching HTML structure and CSS such as:

```html
<section class="panel">
  <button class="panel-toggle" type="button">Toggle</button>
  <div class="panel-content">
    <a href="/next">Next</a>
  </div>
</section>
```

```scss
@media (max-width: 600px) {
  .panel:not(.expand) .panel-content {
    display: none;
  }
}

@media (min-width: 601px) {
  .panel.collapse .panel-content {
    display: none;
  }
}
```

The same component is therefore expanded by default on a large viewport and
reduced by default on a small viewport.

### Using a custom container selector

By default, the container is resolved as the parent element of the toggle. If
your layout requires another ancestor, provide a `closestSelector`.

```ts
import { collapse } from '@itrocks/collapse'

const toggle = document.querySelector<HTMLButtonElement>('.panel-toggle')

if (toggle) {
  collapse(toggle, '.panel')
}
```

The closest matching ancestor receives the responsive state class.

## API

### `collapse(element: HTMLElement, closestSelector?: string): void`

Attach responsive collapse behaviour to a toggle element.

#### Parameters

- `element` – The element that toggles the responsive state.
- `closestSelector` *(optional)* – A CSS selector used to locate the container
  relative to the toggle. If it does not match, the parent element is used;
  as a last resort, the toggle itself becomes the container.

#### Behaviour

Once `collapse` is called:

- A click on `element` toggles `collapse` above 600 pixels.
- A click on `element` toggles `expand` at 600 pixels or below.
- A click on a contained link removes `expand` on a small viewport.
- Initialisation does not trigger a synthetic click or change the default state.

#### Environment

This helper is designed for browser environments. It relies on:

- `container.querySelectorAll` to locate contained links,
- `window.innerWidth` to detect small screens,
- DOM events (`addEventListener`, `.click()`),
- `Element.closest` when a `closestSelector` is provided.

It should not be used on the server side.

## Typical use cases

- Responsive panels, navigation areas, inspectors or tool palettes.
- Containers expanded by default on large screens and reduced by default on
  small screens.
- Shared collapse behaviour without coupling the package to a particular
  component vocabulary.
