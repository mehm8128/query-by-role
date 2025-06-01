# queryByRole

[![CI on main](https://github.com/mehm8128/query-by-role/actions/workflows/main.yml/badge.svg)](https://github.com/mehm8128/query-by-role/actions/workflows/main.yml)
[![NPM Version](https://img.shields.io/npm/v/query-by-role)](https://www.npmjs.com/package/query-by-role)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a implementation of `queryByRole()` for browser.

## Usage

You'll get the button whose accessible name is "Click!" from window with the following code.

```ts
const targetWindow = createTargetWindow(window);
const buttonRoleElements = targetWindow.queryByRole("button", {
  name: "Click!",
});
console.log(buttonRoleElements.all()); // -> [button]
```

## Features

You can create a `TargetWindow` instance with `createTargetWindow` which you'll use to query elements by role.
You can use `.queryByRole()` to get elements by their ARIA role, and you can filter them by various options such as `name`, `pressed`, `selected`, `busy`, and `expanded`.
Matched elements are returned as a `QueryResult` instance, which provides some methods to access the elements.

```ts
declare class TargetWindow {
  window: Window;
  constructor(window: Window);
  queryByRole(role: string, options?: QueryByRoleOptions): QueryResult;
}
declare const createTargetWindow: (window: Window) => TargetWindow;

interface QueryByRoleOptions {
  name?: string;
  pressed?: AriaPressedValue;
  selected?: AriaSelectedValue;
  busy?: AriaBusyValue;
  expanded?: AriaExpandedValue;
}

declare class QueryResult {
  constructor(elements: Element[]);
  get length(): number;
  all(): Element[];
  first(): Element | null;
  nth(index: number): Element | null;
  forEach(callback: (element: Element, index: number) => void): void;
}
```
