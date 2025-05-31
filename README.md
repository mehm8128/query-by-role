# queryByRole

[![CI on main](https://github.com/mehm8128/query-by-role/actions/workflows/main.yml/badge.svg)](https://github.com/mehm8128/query-by-role/actions/workflows/main.yml)
[![NPM Version](https://img.shields.io/npm/v/query-by-role)](https://www.npmjs.com/package/query-by-role)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a implementation of `queryByRole` for browser.

## Usage

You'll get the button whose accessible name is "Click!" from window with the following code.

```ts
const targetWindow = createTargetWindow(window);
const buttonRoleElements = targetWindow.queryByRole("button", {
  name: "Click!",
});
console.log(buttonRoleElements); // -> [button]
```
