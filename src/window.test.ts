import { createTargetWindow } from './window'

describe('window', () => {
	beforeEach(() => {
		document.body.innerHTML = `
      <button aria-pressed="true">This is a button</button>
    `
	})

	it('can get button with queryByRole', () => {
		const targetWindow = createTargetWindow(window)
		const elements = targetWindow.queryByRole('button', {
			name: 'This is a button',
			pressed: true
		})

		expect(elements.all().length).toBe(1)
		expect(elements.first()?.tagName.toLowerCase()).toBe('button')
	})
})
