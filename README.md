# queryByRole
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
