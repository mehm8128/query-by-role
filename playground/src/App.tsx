import { createTargetWindow } from 'query-by-role'

export default function App() {
	const handleGetButtons = () => {
		const targetWindow = createTargetWindow(window)
		const buttonRoleElements = targetWindow.queryByRole('button')
		const buttonRoleElements1 = targetWindow.queryByRole('button', {
			name: 'Click!1'
		})
		const buttonRoleElements3 = targetWindow.queryByRole('button', {
			name: 'Click!3',
			pressed: true
		})
		console.log(buttonRoleElements)
		console.log(buttonRoleElements1)
		console.log(buttonRoleElements3)
	}

	return (
		<div>
			<h1>Playground</h1>
			<div role="button" tabIndex={0}>
				Click!1
			</div>
			<button>Click!2</button>
			<button aria-pressed="true">Click!3</button>
			<button onClick={handleGetButtons}>get buttons</button>
		</div>
	)
}
