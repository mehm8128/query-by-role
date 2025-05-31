import { createTargetWindow } from "query-by-role";

export default function App() {
  const handleGetButtons = () => {
    const targetWindow = createTargetWindow(window);
    const buttonRoleElements = targetWindow.queryByRole("button");
    const buttonRoleElements1 = targetWindow.queryByRole("button", {
      name: "Click!1",
    });
    console.log(buttonRoleElements);
    console.log(buttonRoleElements1);
  };

  return (
    <div>
      <h1>Playground</h1>
      <div role="button" tabIndex={0}>
        Click!1
      </div>
      <button>Click!2</button>
      <button onClick={handleGetButtons}>get buttons</button>
    </div>
  );
}
